
import { collection, getDocs, doc, getDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment, User } from './types';
import { unstable_noStore as noStore } from 'next/cache';

// Using unstable_noStore to prevent caching of fetched data.
// This is a temporary measure to ensure data is always fresh.
// In a production environment, you would want to implement a more robust caching strategy.

export async function getLevels(): Promise<Level[]> {
  noStore();
  try {
    const levelsCollection = collection(db, 'levels');
    const levelSnapshot = await getDocs(query(levelsCollection, orderBy('order')));
    return levelSnapshot.docs.map(doc => doc.data() as Level);
  } catch (error) {
    console.error("Error fetching levels: ", error);
    return [];
  }
}

export async function getLevelBySlug(slug: string): Promise<Level | null> {
  noStore();
   try {
    const q = query(collection(db, 'levels'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs[0].data() as Level;
  } catch (error) {
    console.error(`Error fetching level by slug ${slug}: `, error);
    return null;
  }
}

export async function getClassYearsByLevel(levelSlug: string): Promise<ClassYear[]> {
  noStore();
  try {
    const q = query(collection(db, 'classYears'), where('levelSlug', '==', levelSlug));
    const querySnapshot = await getDocs(q);
    const classYears = querySnapshot.docs.map(doc => doc.data() as ClassYear);
    return classYears.sort((a, b) => a.order - b.order);
  } catch (error)
 {
    console.error(`Error fetching class years for level ${levelSlug}: `, error);
    return [];
  }
}

export async function getClassYearBySlug(levelSlug: string, yearSlug: string): Promise<ClassYear | null> {
  noStore();
  try {
    // Note: The original query had levelSlug as a filter, but class year slugs are unique.
    // Kept for consistency, but `where('slug', '==', yearSlug)` is likely sufficient.
    const q = query(collection(db, 'classYears'), where('slug', '==', yearSlug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs[0].data() as ClassYear;
  } catch (error) {
    console.error(`Error fetching class year by slug ${yearSlug}: `, error);
    return null;
  }
}

export async function getSubjectsByYear(classYearSlug: string): Promise<Subject[]> {
  noStore();
  try {
    const q = query(collection(db, 'subjects'), where('classYearSlug', '==', classYearSlug));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Subject);
  } catch (error) {
    console.error(`Error fetching subjects for year ${classYearSlug}: `, error);
    return [];
  }
}

export async function getSubjectBySlug(slug: string): Promise<Subject | null> {
    noStore();
    try {
        const q = query(collection(db, 'subjects'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        return querySnapshot.docs[0].data() as Subject;
    } catch (error) {
        console.error(`Error fetching subject by slug ${slug}: `, error);
        return null;
    }
}

export async function getAllSubjects(): Promise<Subject[]> {
  noStore();
  try {
    const subjectsCollection = collection(db, 'subjects');
    const subjectSnapshot = await getDocs(subjectsCollection);
    return subjectSnapshot.docs.map(doc => doc.data() as Subject);
  } catch (error) {
    console.error("Error fetching all subjects: ", error);
    return [];
  }
}


export async function getLessonsBySubject(subjectSlug: string): Promise<Lesson[]> {
    noStore();
    try {
        const q = query(collection(db, 'lessons'), where('subjectSlug', '==', subjectSlug), orderBy('order'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Lesson);
    } catch (error) {
        console.error(`Error fetching lessons for subject ${subjectSlug}: `, error);
        return [];
    }
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
    noStore();
    try {
        const q = query(collection(db, 'lessons'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        return querySnapshot.docs[0].data() as Lesson;
    } catch (error) {
        console.error(`Error fetching lesson by slug ${slug}: `, error);
        return null;
    }
}


export async function getRecordedSessionsByLesson(lessonSlug: string): Promise<RecordedSession[]> {
    noStore();
    try {
        const q = query(collection(db, 'recordedSessions'), where('lessonSlug', '==', lessonSlug));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as RecordedSession);
    } catch (error) {
        console.error(`Error fetching sessions for lesson ${lessonSlug}: `, error);
        return [];
    }
}

export async function getExercisesByLesson(lessonSlug: string): Promise<Exercise[]> {
    noStore();
    try {
        const q = query(collection(db, 'exercises'), where('lessonSlug', '==', lessonSlug));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as Exercise);
    } catch (error) {
        console.error(`Error fetching exercises for lesson ${lessonSlug}: `, error);
        return [];
    }
}

export async function getCommentsByLesson(lessonId: string): Promise<Comment[]> {
  noStore();
  try {
    const q = query(collection(db, 'comments'), where('lessonId', '==', lessonId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore Timestamps need to be converted to a serializable format for client components.
      const createdAt = data.createdAt as Timestamp;
      return {
        ...data,
        createdAt: createdAt.toDate().toISOString(),
      } as Comment;
    });
    return comments;
  } catch (error) {
    console.error(`Error fetching comments for lesson ${lessonId}: `, error);
    return [];
  }
}

export async function getUserProfile(userId: string): Promise<User | null> {
  noStore();
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      return null;
    }
    return userSnap.data() as User;
  } catch (error) {
    console.error(`Error fetching user profile ${userId}: `, error);
    return null;
  }
}
