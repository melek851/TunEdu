'use server';

import { aiSubjectAssistant } from '@/ai/flows/ai-subject-assistant';
import { z } from 'zod';

const AskQuestionSchema = z.object({
  question: z.string().min(10, { message: 'La question doit comporter au moins 10 caractères.' }),
  subjectSlug: z.string(),
});

export type AIAssistantFormState = {
  message: string;
  answer?: string;
  errors?: {
    question?: string[];
  };
};

export async function askQuestion(
  prevState: AIAssistantFormState,
  formData: FormData
): Promise<AIAssistantFormState> {
  const validatedFields = AskQuestionSchema.safeParse({
    question: formData.get('question'),
    subjectSlug: formData.get('subjectSlug'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await aiSubjectAssistant(validatedFields.data);
    return { message: 'Success', answer: result.answer };
  } catch (error) {
    return { message: 'Une erreur est survenue lors de la communication avec l\'assistant.' };
  }
}
