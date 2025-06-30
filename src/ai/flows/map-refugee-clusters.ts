// src/ai/flows/map-refugee-clusters.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for mapping refugee clusters and aid delivery points using real-time data and AI.
 *
 * - mapRefugeeClusters - A function that initiates the refugee cluster mapping process.
 * - MapRefugeeClustersInput - The input type for the mapRefugeeClusters function.
 * - MapRefugeeClustersOutput - The return type for the mapRefugeeClusters function, providing a GeoJSON FeatureCollection.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define Zod schema for GeoJSON Point
const GeoJSONPointSchema = z.object({
  type: z.enum(['Point']),
  coordinates: z.array(z.number()).min(2).max(2).describe('An array containing longitude and latitude coordinates.'),
});

const GeoJSONFeaturePropertiesSchema = z.object({
    name: z.string().describe('A descriptive name for the location (e.g., "Camp Alpha", "Central Hospital").'),
    type: z.enum(['refugee_cluster', 'aid_delivery_point', 'critical_incident', 'aid_hub']).describe('The type of location.'),
    description: z.string().describe('A brief description of the location or what is happening there.'),
    population: z.number().optional().describe('Estimated number of people for refugee clusters.'),
});

// Define Zod schema for GeoJSON Feature
const GeoJSONFeatureSchema = z.object({
  type: z.enum(['Feature']),
  geometry: GeoJSONPointSchema,
  properties: GeoJSONFeaturePropertiesSchema,
});

// Define Zod schema for GeoJSON FeatureCollection
const GeoJSONFeatureCollectionSchema = z.object({
  type: z.enum(['FeatureCollection']),
  features: z.array(GeoJSONFeatureSchema),
});

export type GeoJSONFeatureCollection = z.infer<typeof GeoJSONFeatureCollectionSchema>;

const MapRefugeeClustersInputSchema = z.object({
  realTimeData: z.string().describe('Real-time data from social media, news, and on-the-ground reports.'),
});
export type MapRefugeeClustersInput = z.infer<typeof MapRefugeeClustersInputSchema>;

const MapRefugeeClustersOutputSchema = GeoJSONFeatureCollectionSchema.describe(
  'A GeoJSON FeatureCollection representing refugee clusters and aid delivery points.'
);

export type MapRefugeeClustersOutput = z.infer<typeof MapRefugeeClustersOutputSchema>;

export async function mapRefugeeClusters(input: MapRefugeeClustersInput): Promise<MapRefugeeClustersOutput> {
  return mapRefugeeClustersFlow(input);
}

const mapRefugeeClustersPrompt = ai.definePrompt({
  name: 'mapRefugeeClustersPrompt',
  input: {schema: MapRefugeeClustersInputSchema},
  output: {schema: MapRefugeeClustersOutputSchema},
  prompt: `You are an expert mapping specialist. Given the real-time data, identify and map refugee clusters, aid delivery points, aid hubs, and critical incidents.

  Real-time Data: {{{realTimeData}}}

  Return a GeoJSON FeatureCollection. For each feature, you must provide these properties:
  - name: A descriptive name for the location (e.g., "Camp Alpha", "Central Hospital").
  - type: One of 'refugee_cluster', 'aid_delivery_point', 'critical_incident', or 'aid_hub'.
  - description: A brief description of the location or what is happening there.
  - population: (Optional) An estimated number of people, especially for 'refugee_cluster' type.

  Ensure that the outputted GeoJSON is valid, has the specified properties for each feature, and the features are of type Feature. Use a point geometry type for each feature.
`,
});

const mapRefugeeClustersFlow = ai.defineFlow(
  {
    name: 'mapRefugeeClustersFlow',
    inputSchema: MapRefugeeClustersInputSchema,
    outputSchema: MapRefugeeClustersOutputSchema,
  },
  async input => {
    const {output} = await mapRefugeeClustersPrompt(input);
    return output!;
  }
);
