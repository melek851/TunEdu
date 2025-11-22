
import { collection, getDocs, doc, getDoc, query, where, orderBy, Timestamp, collectionGroup, getCountFromServer, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment, User, DashboardStats } from './types';
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
    // Sort client-side to avoid needing a composite index in Firestore
    return classYears.sort((a, b) => a.order - b.order);
  } catch (error)
 {
    console.error(`Error fetching class years for level ${levelSlug}: `, error);
    return [];
  }
}

export async function getClassYearBySlug(yearSlug: string): Promise<ClassYear | null> {
    noStore();
    if (!yearSlug) return null;
    try {
        const q = query(collection(db, 'classYears'), where('slug', '==', yearSlug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.warn(`No class year found with slug: ${yearSlug}`);
            return null;
        }
        // Assuming slugs are unique across all levels
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
    if (!slug) return null;
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

export async function getSubjectById(id: string): Promise<Subject | null> {
    noStore();
    if (!id) return null;
    try {
        const docRef = doc(db, 'subjects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Subject;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching subject by id ${id}: `, error);
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
        const q = query(collection(db, 'lessons'), where('subjectSlug', '==', subjectSlug));
        const querySnapshot = await getDocs(q);
        const lessons = querySnapshot.docs.map(doc => doc.data() as Lesson);
        // Sort client-side to avoid needing a composite index in Firestore
        return lessons.sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error(`Error fetching lessons for subject ${subjectSlug}: `, error);
        return [];
    }
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
    noStore();
    if (!slug) return null;
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

export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    if (!id) return null;
    try {
        const docRef = doc(db, 'lessons', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Lesson;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching lesson by id ${id}: `, error);
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
        const q = query(collection(db, 'comments'), where('lessonId', '==', lessonId));
        const querySnapshot = await getDocs(q);

        const comments = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt;
            return {
                ...data,
                id: doc.id,
                createdAt,
            } as Comment;
        });
        
        // Sort comments by date in descending order (newest first)
        return comments.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
    } catch (error) {
        console.error(`Error fetching comments for lesson ${lessonId}: `, error);
        return [];
    }
}

export async function getUserProfile(userId: string): Promise<User | null> {
    noStore();
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data() as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching user profile for user ${userId}: `, error);
        return null;
    }
}

export async function trackUserLessonView(userId: string, lessonSlug: string): Promise<void> {
    noStore();
    try {
        const viewsCollection = collection(db, 'userLessonViews');
        // Check if a view for this user and lesson already exists
        const q = query(viewsCollection, where('userId', '==', userId), where('lessonSlug', '==', lessonSlug));
        const existingView = await getDocs(q);

        if (existingView.empty) {
            await addDoc(viewsCollection, {
                userId,
                lessonSlug,
                viewedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error(`Error tracking lesson view for user ${userId} and lesson ${lessonSlug}: `, error);
    }
}

export async function trackUserExerciseOpen(userId: string, exerciseId: string): Promise<void> {
    noStore();
    try {
        const opensCollection = collection(db, 'userExerciseOpens');
        // Check if this exercise has been opened by the user before
        const q = query(opensCollection, where('userId', '==', userId), where('exerciseId', '==', exerciseId));
        const existingOpen = await getDocs(q);

        if (existingOpen.empty) {
            await addDoc(opensCollection, {
                userId,
                exerciseId,
                openedAt: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error(`Error tracking exercise open for user ${userId} and exercise ${exerciseId}: `, error);
    }
}

export async function getUserDashboardStats(userId: string): Promise<DashboardStats> {
    noStore();
    const defaultStats: DashboardStats = {
        lessonsViewed: 0,
        exercisesOpened: 0,
        timeTodaySeconds: 0,
    };
    if (!userId) return defaultStats;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lessonsQuery = query(collection(db, 'userLessonViews'), where('userId', '==', userId));
        const exercisesQuery = query(collection(db, 'userExerciseOpens'), where('userId', '==', userId));
        // Query only by userId to avoid needing a composite index. We'll filter by date in the code.
        const timeQuery = query(
            collection(db, 'userTimeSpents'), 
            where('userId', '==', userId)
        );

        const [lessonsSnapshot, exercisesSnapshot, timeSnapshot] = await Promise.all([
            getDocs(lessonsQuery),
            getDocs(exercisesQuery),
            getDocs(timeQuery)
        ]);

        const totalTimeToday = timeSnapshot.docs
            .map(doc => doc.data())
            .filter(data => {
                if (!data.loggedAt) return false;
                const loggedAtDate = (data.loggedAt as Timestamp).toDate();
                return loggedAtDate >= today;
            })
            .reduce((sum, data) => sum + data.durationSeconds, 0);

        return {
            lessonsViewed: lessonsSnapshot.size,
            exercisesOpened: exercisesSnapshot.size,
            timeTodaySeconds: totalTimeToday,
        };

    } catch (error) {
        console.error(`Error fetching dashboard stats for user ${userId}: `, error);
        return defaultStats;
    }
}

export async function getRecentSubjects(userId: string, count: number): Promise<Subject[]> {
    noStore();
    if (!userId) return [];
  
    try {
      // 1. Get all lesson views for the user.
      const viewsQuery = query(collection(db, 'userLessonViews'), where('userId', '==', userId));
      const viewsSnapshot = await getDocs(viewsQuery);

      if (viewsSnapshot.empty) return [];

      // 2. Sort the views by date in memory (most recent first).
      const sortedViews = viewsSnapshot.docs
        .map(doc => doc.data() as { lessonSlug: string; viewedAt: Timestamp })
        .sort((a, b) => b.viewedAt.toMillis() - a.viewedAt.toMillis());

      const recentLessonSlugs = sortedViews.map(view => view.lessonSlug);

      if (recentLessonSlugs.length === 0) return [];
  
      // 3. Get the lessons for those slugs
      const lessonsQuery = query(collection(db, 'lessons'), where('slug', 'in', recentLessonSlugs.slice(0, 20))); // Limit to avoid large 'in' queries
      const lessonsSnapshot = await getDocs(lessonsQuery);
      const lessons = lessonsSnapshot.docs.map(doc => doc.data() as Lesson);
  
      // Create a map for quick lookup
      const lessonMap = new Map(lessons.map(l => [l.slug, l]));
  
      // 4. Get the unique subject slugs from the lessons, maintaining recent order
      const uniqueSubjectSlugs = recentLessonSlugs
        .map(lessonSlug => lessonMap.get(lessonSlug)?.subjectSlug)
        .filter((slug, index, self) => slug && self.indexOf(slug) === index) as string[];
      
      const finalSubjectSlugs = uniqueSubjectSlugs.slice(0, count);

      if (finalSubjectSlugs.length === 0) return [];

      // 5. Fetch the actual subject documents
      const subjectsQuery = query(collection(db, 'subjects'), where('slug', 'in', finalSubjectSlugs));
      const subjectsSnapshot = await getDocs(subjectsQuery);
      const subjectMap = new Map(subjectsSnapshot.docs.map(doc => [doc.data().slug, doc.data() as Subject]));
        
      // 6. Return subjects in the correct recent order
      return finalSubjectSlugs.map(slug => subjectMap.get(slug)).filter(Boolean) as Subject[];
  
    } catch (error) {
      console.error(`Error fetching recent subjects for user ${userId}: `, error);
      return [];
    }
}
