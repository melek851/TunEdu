
'use server';

import { z } from 'zod';
import { createUserWithEmailAndPassword, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc, writeBatch, deleteDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { redirect } from 'next/navigation';
import { aiSubjectAssistant } from '@/ai/flows/ai-subject-assistant';
import { revalidatePath } from 'next/cache';
import type { Lesson } from '@/lib/types';


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
    revalidatePath('/profile');
    revalidatePath('/');


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

// --- Admin Actions ---

const SubjectSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  slug: z.string().min(1, { message: "Le slug est requis" }).regex(/^[a-z0-9-]+$/, { message: "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets." }),
  description: z.string().min(1, { message: "La description est requise" }),
  classYearSlug: z.string().min(1, { message: "L'année est requise" }),
  manualUrl: z.string().url({ message: "L'URL du manuel n'est pas valide" }),
  thumbnailUrl: z.string().url({ message: "L'URL de la miniature n'est pas valide" }),
  thumbnailHint: z.string().min(1, { message: "L'indice de la miniature est requis" }),
});

export interface SubjectFormState {
  success: boolean;
  message: string;
  errors?: z.ZodError<z.infer<typeof SubjectSchema>>['formErrors']['fieldErrors'];
}

export async function saveSubject(
  subjectId: string | null,
  prevState: SubjectFormState,
  formData: FormData
): Promise<SubjectFormState> {
  
  const validatedFields = SubjectSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'La validation a échoué.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    let id = subjectId;
    if (subjectId) {
      const subjectRef = doc(db, 'subjects', subjectId);
      await updateDoc(subjectRef, data);
    } else {
      id = doc(collection(db, 'subjects')).id;
      const subjectRef = doc(db, 'subjects', id);
      await setDoc(subjectRef, { ...data, id });
    }

    revalidatePath('/admin');
    revalidatePath(`/browse/${data.classYearSlug.split('-')[0]}/${data.classYearSlug}`);

    return { success: true, message: `Matière ${subjectId ? 'mise à jour' : 'créée'} avec succès!` };
  } catch (error) {
    return { success: false, message: `Une erreur est survenue: ${error}` };
  }
}

export async function deleteSubject(subjectId: string): Promise<{ success: boolean; message: string }> {
  try {
    const batch = writeBatch(db);

    const subjectRef = doc(db, 'subjects', subjectId);
    const subjectDoc = await getDoc(subjectRef);
    const subject = subjectDoc.data();

    if (!subject) {
      return { success: false, message: 'Matière non trouvée.' };
    }

    // 1. Find all lessons for the subject
    const lessonsQuery = query(collection(db, 'lessons'), where('subjectSlug', '==', subject.slug));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    
    // 2. For each lesson, find and delete its sessions and exercises
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data() as Lesson;

      // Delete recorded sessions
      const sessionsQuery = query(collection(db, 'recordedSessions'), where('lessonSlug', '==', lesson.slug));
      const sessionsSnapshot = await getDocs(sessionsQuery);
      sessionsSnapshot.forEach(doc => batch.delete(doc.ref));

      // Delete exercises
      const exercisesQuery = query(collection(db, 'exercises'), where('lessonSlug', '==', lesson.slug));
      const exercisesSnapshot = await getDocs(exercisesQuery);
      exercisesSnapshot.forEach(doc => batch.delete(doc.ref));
      
      // Finally, delete the lesson itself
      batch.delete(lessonDoc.ref);
    }

    // 3. Delete the subject itself
    batch.delete(subjectRef);

    await batch.commit();
    revalidatePath('/admin');
    return { success: true, message: 'Matière et tout son contenu supprimés avec succès.' };
  } catch (error: any) {
    return { success: false, message: `Une erreur est survenue lors de la suppression: ${error.message}` };
  }
}

const LessonSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z.string().min(1, "Le slug est requis").regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets."),
  subjectSlug: z.string(),
  summary: z.string().min(1, "Le résumé est requis"),
  order: z.coerce.number().min(1, "L'ordre doit être un nombre positif"),
  score: z.coerce.number().min(0, "Le score ne peut pas être négatif"),
});

export interface LessonFormState {
  success: boolean;
  message: string;
  errors?: z.ZodError<z.infer<typeof LessonSchema>>['formErrors']['fieldErrors'];
}

export async function saveLesson(
    lessonId: string | null,
    prevState: LessonFormState,
    formData: FormData
): Promise<LessonFormState> {

    const validatedFields = LessonSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'La validation a échoué.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const data = validatedFields.data;

    try {
        let id = lessonId;
        if (lessonId) {
            const lessonRef = doc(db, 'lessons', lessonId);
            await updateDoc(lessonRef, data);
        } else {
            id = doc(collection(db, 'lessons')).id;
            const lessonRef = doc(db, 'lessons', id);
            await setDoc(lessonRef, { ...data, id });
        }
        revalidatePath(`/admin/subjects/${data.subjectSlug}/lessons`);
        revalidatePath(`/subjects/${data.subjectSlug}`);
        return { success: true, message: `Leçon ${lessonId ? 'mise à jour' : 'créée'} avec succès!` };
    } catch (error) {
        return { success: false, message: `Une erreur est survenue: ${error}` };
    }
}

export async function deleteLesson(lessonId: string): Promise<{ success: boolean; message: string }> {
  try {
    const batch = writeBatch(db);

    const lessonRef = doc(db, 'lessons', lessonId);
    const lessonDoc = await getDoc(lessonRef);
    const lesson = lessonDoc.data();

    if (!lesson) {
      return { success: false, message: 'Leçon non trouvée.' };
    }

    // 1. Find and delete all related recorded sessions
    const sessionsQuery = query(collection(db, 'recordedSessions'), where('lessonSlug', '==', lesson.slug));
    const sessionsSnapshot = await getDocs(sessionsQuery);
    sessionsSnapshot.forEach(doc => batch.delete(doc.ref));

    // 2. Find and delete all related exercises
    const exercisesQuery = query(collection(db, 'exercises'), where('lessonSlug', '==', lesson.slug));
    const exercisesSnapshot = await getDocs(exercisesQuery);
    exercisesSnapshot.forEach(doc => batch.delete(doc.ref));

    // 3. Delete the lesson itself
    batch.delete(lessonRef);

    await batch.commit();

    revalidatePath('/admin');
    return { success: true, message: 'Leçon, sessions et exercices supprimés avec succès.' };
  } catch (error: any) {
    return { success: false, message: `Une erreur est survenue lors de la suppression: ${error.message}` };
  }
}

// --- Recorded Session Actions ---
const RecordedSessionSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    videoUrl: z.string().url("L'URL de la vidéo n'est pas valide"),
    durationSeconds: z.coerce.number().min(1, "La durée doit être d'au moins 1 seconde"),
    lessonSlug: z.string(),
});

export interface RecordedSessionFormState {
  success: boolean;
  message: string;
  errors?: z.ZodError<z.infer<typeof RecordedSessionSchema>>['formErrors']['fieldErrors'];
}

export async function saveRecordedSession(
    sessionId: string | null,
    prevState: RecordedSessionFormState,
    formData: FormData
): Promise<RecordedSessionFormState> {
    const validatedFields = RecordedSessionSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'La validation a échoué.', errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const data = validatedFields.data;
    try {
        let id = sessionId;
        if (sessionId) {
            await updateDoc(doc(db, 'recordedSessions', sessionId), data);
        } else {
            id = doc(collection(db, 'recordedSessions')).id;
            await setDoc(doc(db, 'recordedSessions', id), { ...data, id });
        }
        revalidatePath(`/admin/subjects/.*/lessons`);
        revalidatePath(`/lessons/${data.lessonSlug}`);
        return { success: true, message: `Session ${sessionId ? 'mise à jour' : 'créée'} avec succès!` };
    } catch (error) {
        return { success: false, message: `Une erreur est survenue: ${error}` };
    }
}

export async function deleteRecordedSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    try {
        await deleteDoc(doc(db, 'recordedSessions', sessionId));
        revalidatePath('/admin/.*', 'layout');
        return { success: true, message: 'Session supprimée avec succès.' };
    } catch (error) {
        return { success: false, message: `Une erreur est survenue: ${error}` };
    }
}


// --- Exercise Actions ---
const ExerciseSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    fileUrl: z.string().url("L'URL du fichier n'est pas valide"),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    lessonSlug: z.string(),
});

export interface ExerciseFormState {
  success: boolean;
  message: string;
  errors?: z.ZodError<z.infer<typeof ExerciseSchema>>['formErrors']['fieldErrors'];
}

export async function saveExercise(
    exerciseId: string | null,
    prevState: ExerciseFormState,
    formData: FormData
): Promise<ExerciseFormState> {
    const validatedFields = ExerciseSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'La validation a échoué.', errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const data = validatedFields.data;
    try {
        let id = exerciseId;
        if (exerciseId) {
            await updateDoc(doc(db, 'exercises', exerciseId), data);
        } else {
            id = doc(collection(db, 'exercises')).id;
            await setDoc(doc(db, 'exercises', id), { ...data, id });
        }
        revalidatePath(`/admin/subjects/.*/lessons`);
        revalidatePath(`/lessons/${data.lessonSlug}`);
        return { success: true, message: `Exercice ${exerciseId ? 'mis à jour' : 'créé'} avec succès!` };
    } catch (error) {
        return { success: false, message: `Une erreur est survenue: ${error}` };
    }
}

export async function deleteExercise(exerciseId: string): Promise<{ success: boolean; message: string }> {
    try {
        await deleteDoc(doc(db, 'exercises', exerciseId));
        revalidatePath('/admin/.*', 'layout');
        return { success: true, message: 'Exercice supprimé avec succès.' };
    } catch (error) {
        return { success: false, message: `Une erreur est survenue: ${error}` };
    }
}
