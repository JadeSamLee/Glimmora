// Ensure Fair Aid Distribution
//
// As a fairness auditor, I need the system to use adversarial AI to continuously monitor and ensure that aid distribution is equitable and GDPR-compliant, so that I can identify and address potential biases or violations.

'use server';
/**
 * @fileOverview This file defines a Genkit flow for ensuring fair and GDPR-compliant aid distribution using adversarial AI.
 *
 * - ensureFairAidDistribution - A function that initiates the fairness monitoring process.
 * - EnsureFairAidDistributionInput - The input type for the ensureFairAidDistribution function.
 * - EnsureFairAidDistributionOutput - The return type for the ensureFairAidDistribution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnsureFairAidDistributionInputSchema = z.object({
  aidData: z.string().describe('A JSON string containing the aid distribution data, including recipient demographics, aid type, and location.'),
  gdprPolicies: z.string().describe('A JSON string containing the GDPR compliance policies to be enforced.'),
});
export type EnsureFairAidDistributionInput = z.infer<typeof EnsureFairAidDistributionInputSchema>;

const EnsureFairAidDistributionOutputSchema = z.object({
  fairnessAssessment: z.string().describe('A detailed report on the fairness of the aid distribution, highlighting any potential biases or violations.'),
  recommendations: z.string().describe('Actionable recommendations to address identified biases and ensure GDPR compliance.'),
});
export type EnsureFairAidDistributionOutput = z.infer<typeof EnsureFairAidDistributionOutputSchema>;

export async function ensureFairAidDistribution(input: EnsureFairAidDistributionInput): Promise<EnsureFairAidDistributionOutput> {
  return ensureFairAidDistributionFlow(input);
}

const fairnessAuditorPrompt = ai.definePrompt({
  name: 'fairnessAuditorPrompt',
  input: {schema: EnsureFairAidDistributionInputSchema},
  output: {schema: EnsureFairAidDistributionOutputSchema},
  prompt: `You are an adversarial AI designed to audit aid distribution for fairness and GDPR compliance.

  Analyze the provided aid distribution data and GDPR policies to identify potential biases, violations, or inequities.

  Aid Distribution Data: {{{aidData}}}
  GDPR Policies: {{{gdprPolicies}}}

  Provide a detailed fairness assessment report and actionable recommendations to mitigate identified issues.
  Ensure that the assessment covers demographic biases, equitable access to aid, and compliance with GDPR principles.
  The "fairnessAssessment" should be a detailed report on the fairness of the aid distribution, highlighting any potential biases or violations.
  The "recommendations" should contain actionable recommendations to address identified biases and ensure GDPR compliance.
  Ensure the output is detailed and clear.
  `,
});

const ensureFairAidDistributionFlow = ai.defineFlow(
  {
    name: 'ensureFairAidDistributionFlow',
    inputSchema: EnsureFairAidDistributionInputSchema,
    outputSchema: EnsureFairAidDistributionOutputSchema,
  },
  async input => {
    const {output} = await fairnessAuditorPrompt(input);
    return output!;
  }
);
