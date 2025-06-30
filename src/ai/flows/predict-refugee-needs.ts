'use server';
/**
 * @fileOverview Refugee needs prediction flow using GenAI.
 *
 * - predictRefugeeNeeds - Predicts refugee needs based on social media and news data.
 * - PredictRefugeeNeedsInput - The input type for the predictRefugeeNeeds function.
 * - PredictRefugeeNeedsOutput - The return type for the predictRefugeeNeeds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRefugeeNeedsInputSchema = z.object({
  socialMediaData: z
    .string()
    .describe('Social media data (e.g., Twitter/X) related to refugee situations.'),
  newsData: z.string().describe('News articles and reports about refugee situations.'),
});
export type PredictRefugeeNeedsInput = z.infer<typeof PredictRefugeeNeedsInputSchema>;

const PredictRefugeeNeedsOutputSchema = z.object({
  predictedNeeds: z.object({
    food: z.string().describe('Predicted food requirements.'),
    shelter: z.string().describe('Predicted shelter requirements.'),
    medical: z.string().describe('Predicted medical supply and assistance requirements.'),
    overall: z.string().describe('Overall assessment of refugee needs and situation.'),
  }).describe('Predicted refugee needs including food, shelter and medical requirements.'),
  confidenceLevel: z.number().describe('Confidence level of the prediction (0-1).'),
});
export type PredictRefugeeNeedsOutput = z.infer<typeof PredictRefugeeNeedsOutputSchema>;

export async function predictRefugeeNeeds(input: PredictRefugeeNeedsInput): Promise<PredictRefugeeNeedsOutput> {
  return predictRefugeeNeedsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRefugeeNeedsPrompt',
  input: {schema: PredictRefugeeNeedsInputSchema},
  output: {schema: PredictRefugeeNeedsOutputSchema},
  prompt: `You are an expert in predicting refugee needs based on analysis of social media and news data.

  Analyze the following data to predict the needs of refugees in terms of food, shelter, and medical assistance. Provide an overall assessment of the situation.

  Social Media Data: {{{socialMediaData}}}
  News Data: {{{newsData}}}

  Format your response as a JSON object matching the PredictRefugeeNeedsOutputSchema. Include a confidenceLevel (0-1) to indicate how certain you are about the prediction.
  `,
});

const predictRefugeeNeedsFlow = ai.defineFlow(
  {
    name: 'predictRefugeeNeedsFlow',
    inputSchema: PredictRefugeeNeedsInputSchema,
    outputSchema: PredictRefugeeNeedsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
