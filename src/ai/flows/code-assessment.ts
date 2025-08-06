'use server';
/**
 * @fileOverview Implements the code assessment flow using AI to provide feedback on code quality, security, and performance.
 * Previously implemented, this file is being updated to include environment analysis.
 *
 * - codeAssessment - A function that handles the code assessment process.
 * - CodeAssessmentInput - The input type for the codeAssessment function.
 * - CodeAssessmentOutput - The return type for the codeAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeAssessmentInputSchema = z.object({
  code: z.string().describe('The code to be assessed.'),
  missionDescription: z.string().describe('The description of the mission the code is for.'),
  environmentState: z
    .string()
    .optional()
    .describe('The state of the deployed environment, if available.'),
});
export type CodeAssessmentInput = z.infer<typeof CodeAssessmentInputSchema>;

const CodeAssessmentOutputSchema = z.object({
  codeQuality: z.string().describe('Feedback on the code quality.'),
  securityAnalysis: z.string().describe('Feedback on potential security vulnerabilities.'),
  performanceAnalysis: z.string().describe('Feedback on the code performance and efficiency.'),
  environmentAnalysis: z
    .string()
    .optional()
    .describe('Feedback on the deployed environment, including potential issues.'),
  recommendations: z.string().describe('Recommendations for improving the code and environment.'),
  overallScore: z.number().describe('An overall score for the code and environment.'),
});
export type CodeAssessmentOutput = z.infer<typeof CodeAssessmentOutputSchema>;

export async function codeAssessment(input: CodeAssessmentInput): Promise<CodeAssessmentOutput> {
  return codeAssessmentFlow(input);
}

const codeAssessmentPrompt = ai.definePrompt({
  name: 'codeAssessmentPrompt',
  input: {schema: CodeAssessmentInputSchema},
  output: {schema: CodeAssessmentOutputSchema},
  prompt: `You are an AI code and environment assessment tool. You will receive code, a mission description, and optionally, the current state of the deployed environment.

You will analyze the code for code quality, security vulnerabilities, and performance issues.
If environment state is provided, analyze it for potential issues and inefficiencies.

Provide detailed feedback on each of these areas, along with recommendations for improvement.

Finally, provide an overall score for the code and environment.

Mission Description: {{{missionDescription}}}

Code:
\`\`\`
{{{code}}}
\`\`\`

{{#if environmentState}}
Environment State:
\`\`\`
{{{environmentState}}}
\`\`\`
{{/if}}`,
});

const codeAssessmentFlow = ai.defineFlow(
  {
    name: 'codeAssessmentFlow',
    inputSchema: CodeAssessmentInputSchema,
    outputSchema: CodeAssessmentOutputSchema,
  },
  async input => {
    const {output} = await codeAssessmentPrompt(input);
    return output!;
  }
);
