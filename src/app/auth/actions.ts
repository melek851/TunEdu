
'use server';

import { z } from 'zod';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { redirect } from 'next/navigation';

const SignUpSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit comporter au moins 2 caractères.' }),
  lastName: z.string().min(2, { message: 'Le nom doit comporter au moins 2 caractères.' }),
  email: z.string().email({ message: 'Adresse email invalide.' }),
  password: z.string().min(6, { message: 'Le mot de passe doit comporter au moins 6 caractères.' }),
});

const SignInSchema = z.object({
    email: z.string().email({ message: 'Adresse email invalide.' }),
    password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
});


export type AuthFormState = {
  message: string;
  success: boolean;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
};

function getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            return "Cette adresse email est déjà utilisée.";
        case AuthErrorCodes.INVALID_EMAIL:
            return "L'adresse email est invalide.";
        case AuthErrorCodes.WEAK_PASSWORD:
            return "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères.";
        case AuthErrorCodes.INVALID_PASSWORD:
        case 'auth/invalid-credential':
             return "L'email ou le mot de passe est incorrect.";
        case AuthErrorCodes.USER_NOT_FOUND:
            return "Aucun utilisateur trouvé avec cette adresse email.";
        default:
            return "Une erreur inconnue est survenue. Veuillez réessayer.";
    }
}


export async function initiateEmailSignUp(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validatedFields = SignUpSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, firstName, lastName } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      email: user.email,
      firstName,
      lastName,
      role: 'STUDENT',
    });

    return { message: 'User created successfully.', success: true };

  } catch (error: any) {
    return { message: getFirebaseErrorMessage(error), success: false };
  }
}

export async function initiateEmailSignIn(
  prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { message: 'Login successful.', success: true };
    } catch (error: any) {
        return { message: getFirebaseErrorMessage(error), success: false };
    }
}
