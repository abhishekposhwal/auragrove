// This is an autogenerated file from Firebase Studio.
'use server';

/**
 * @fileOverview An AI agent that suggests more sustainable alternatives to a given product.
 *
 * - suggestSustainableAlternatives - A function that suggests sustainable alternatives.
 * - SuggestSustainableAlternativesInput - The input type for the suggestSustainableAlternatives function.
 * - SuggestSustainableAlternativesOutput - The return type for the suggestSustainableAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSustainableAlternativesInputSchema = z.object({
  productDescription: z.string().describe('The description of the product for which to find sustainable alternatives.'),
  productCategory: z.string().describe('The category of the product.'),
});
export type SuggestSustainableAlternativesInput = z.infer<typeof SuggestSustainableAlternativesInputSchema>;

const SuggestSustainableAlternativesOutputSchema = z.object({
  alternatives: z.array(
    z.object({
      name: z.string().describe('The name of the sustainable alternative product.'),
      description: z.string().describe('A short description of the sustainable alternative.'),
      greenScore: z.number().describe('A score (1-10) indicating the sustainability of the product.'),
      carbonFootprint: z.string().describe('The estimated carbon footprint of the product (e.g., kg CO₂e).'),
    })
  ).describe('A list of sustainable alternative products.'),
});
export type SuggestSustainableAlternativesOutput = z.infer<typeof SuggestSustainableAlternativesOutputSchema>;

export async function suggestSustainableAlternatives(input: SuggestSustainableAlternativesInput): Promise<SuggestSustainableAlternativesOutput> {
  return suggestSustainableAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSustainableAlternativesPrompt',
  input: {schema: SuggestSustainableAlternativesInputSchema},
  output: {schema: SuggestSustainableAlternativesOutputSchema},
  prompt: `You are an AI assistant helping users find sustainable alternatives to products they are considering.

  Given the following product description and category, suggest three sustainable alternatives.
  Each alternative should have a name, a short description, a green score (1-10), and an estimated carbon footprint.

  Product Description: {{{productDescription}}}
  Product Category: {{{productCategory}}}

  Format your response as a JSON array of alternatives.
  `,
});

const suggestSustainableAlternativesFlow = ai.defineFlow(
  {
    name: 'suggestSustainableAlternativesFlow',
    inputSchema: SuggestSustainableAlternativesInputSchema,
    outputSchema: SuggestSustainableAlternativesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
