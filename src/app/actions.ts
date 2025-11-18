'use server';

import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { redirect } from 'next/navigation';

const SignUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Le prénom est requis' }),
    lastName: z.string().min(1, { message: 'Le nom est requis' }),
    email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  });

export interface AuthFormState {
  message: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function signUp(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      role: 'STUDENT',
    });

  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') {
      return {
        message: "This email is already in use.",
        errors: {
          _form: ['Cette adresse e-mail est déjà utilisée.'],
        },
      };
    }
    return {
      message: 'An unexpected error occurred.',
      errors: {
        _form: ['Une erreur inattendue s\'est produite. Veuillez réessayer.'],
      },
    };
  }

  redirect('/auth/login');
}
