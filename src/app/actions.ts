
'use server';

import { z } from 'zod';
import { createUserWithEmailAndPassword, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { redirect } from 'next/navigation';
import { aiSubjectAssistant } from '@/ai/flows/ai-subject-assistant';

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

const AskQuestionSchema = z.object({
  question: z.string().min(10, { message: 'Votre question doit comporter au moins 10 caractères.' }),
  subjectSlug: z.string(),
});

export interface AIAssistantFormState {
    message: string;
    answer?: string;
    errors?: {
        question?: string[];
    };
}


export async function askQuestion(prevState: AIAssistantFormState, formData: FormData): Promise<AIAssistantFormState> {
    const validatedFields = AskQuestionSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { question, subjectSlug } = validatedFields.data;

    try {
        const result = await aiSubjectAssistant({ question, subjectSlug });
        return {
            message: 'Success',
            answer: result.answer,
        };
    } catch (e: any) {
        return {
            message: 'An error occurred with the AI Assistant.',
        };
    }
}

// --- Profile Update Actions ---

const UserProfileSchema = z.object({
  firstName: z.string().min(1, { message: "Le prénom est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  avatarUrl: z.string().url({ message: "L'URL de l'avatar n'est pas valide" }).optional().or(z.literal('')),
});

export interface UserProfileFormState {
  success: boolean;
  message: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    avatarUrl?: string[];
    _form?: string[];
  };
}


export async function updateUserProfile(userId: string, prevState: UserProfileFormState, formData: FormData): Promise<UserProfileFormState> {
  if (!userId) {
    return { success: false, message: "Utilisateur non authentifié." };
  }

  const validatedFields = UserProfileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'La validation a échoué.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { firstName, lastName, avatarUrl } = validatedFields.data;

  try {
    const userDocRef = doc(db, 'users', userId);
    const updateData: any = { firstName, lastName };
    if (avatarUrl) {
      updateData.avatarUrl = avatarUrl;
    }
    
    await updateDoc(userDocRef, updateData);

    return { success: true, message: 'Profil mis à jour avec succès!' };
  } catch (error) {
    return { success: false, message: `Une erreur est survenue: ${error}` };
  }
}

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Le mot de passe actuel est requis' }),
    newPassword: z.string().min(6, { message: 'Le nouveau mot de passe doit contenir au moins 6 caractères' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les nouveaux mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export interface ChangePasswordFormState {
    success: boolean;
    message: string;
    errors?: {
        currentPassword?: string[];
        newPassword?: string[];
        confirmPassword?: string[];
        _form?: string[];
    };
}

export async function changePassword(prevState: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> {
  const user = auth.currentUser;
  if (!user || !user.email) {
    return { success: false, message: "Utilisateur non authentifié." };
  }

  const validatedFields = ChangePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'La validation a échoué.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { currentPassword, newPassword } = validatedFields.data;
  
  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    
    return { success: true, message: 'Mot de passe changé avec succès!' };
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
        return { 
            success: false, 
            message: "Le mot de passe actuel est incorrect.",
            errors: { _form: ["Le mot de passe actuel est incorrect."] }
        };
    }
    return { success: false, message: `Une erreur est survenue: ${error}` };
  }
}
