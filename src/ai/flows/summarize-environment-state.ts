'use server';
/**
 * @fileOverview Summarizes the running state of the Kubernetes environment for debugging.
 *
 * - summarizeEnvironmentState - A function that summarizes the environment state.
 * - SummarizeEnvironmentStateInput - The input type for the summarizeEnvironmentState function.
 * - SummarizeEnvironmentStateOutput - The return type for the summarizeEnvironmentState function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEnvironmentStateInputSchema = z.object({
  environmentDescription: z
    .string()
    .describe('A detailed description of the current Kubernetes environment state, including pod statuses, service configurations, and recent events.'),
});
export type SummarizeEnvironmentStateInput = z.infer<typeof SummarizeEnvironmentStateInputSchema>;

const SummarizeEnvironmentStateOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the Kubernetes environment state.'),
});
export type SummarizeEnvironmentStateOutput = z.infer<typeof SummarizeEnvironmentStateOutputSchema>;

export async function summarizeEnvironmentState(input: SummarizeEnvironmentStateInput): Promise<SummarizeEnvironmentStateOutput> {
  return summarizeEnvironmentStateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEnvironmentStatePrompt',
  input: {schema: SummarizeEnvironmentStateInputSchema},
  output: {schema: SummarizeEnvironmentStateOutputSchema},
  prompt: `You are a DevOps engineer summarizing the state of a Kubernetes environment to assist a user in debugging their application.

  Please provide a concise summary of the following environment description:

  {{environmentDescription}}
  `,
});

const summarizeEnvironmentStateFlow = ai.defineFlow(
  {
    name: 'summarizeEnvironmentStateFlow',
    inputSchema: SummarizeEnvironmentStateInputSchema,
    outputSchema: SummarizeEnvironmentStateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
