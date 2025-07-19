'use server';

/**
 * @fileOverview A Genkit flow to suggest relevant keywords for job postings.
 *
 * - suggestJobKeywords - A function that suggests keywords for a job posting.
 * - SuggestJobKeywordsInput - The input type for the suggestJobKeywords function.
 * - SuggestJobKeywordsOutput - The return type for the suggestJobKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestJobKeywordsInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job posting.'),
  jobDescription: z.string().describe('The description of the job posting.'),
});
export type SuggestJobKeywordsInput = z.infer<typeof SuggestJobKeywordsInputSchema>;

const SuggestJobKeywordsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('An array of suggested keywords for the job posting.'),
});
export type SuggestJobKeywordsOutput = z.infer<typeof SuggestJobKeywordsOutputSchema>;

export async function suggestJobKeywords(input: SuggestJobKeywordsInput): Promise<SuggestJobKeywordsOutput> {
  return suggestJobKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestJobKeywordsPrompt',
  input: {schema: SuggestJobKeywordsInputSchema},
  output: {schema: SuggestJobKeywordsOutputSchema},
  prompt: `You are an AI job keyword suggestion tool. Given a job title and description, you will suggest a list of keywords that can be used to attract a wider pool of qualified candidates.

Job Title: {{{jobTitle}}}
Job Description: {{{jobDescription}}}

Suggest keywords:`,
});

const suggestJobKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestJobKeywordsFlow',
    inputSchema: SuggestJobKeywordsInputSchema,
    outputSchema: SuggestJobKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
