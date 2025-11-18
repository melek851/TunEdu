
'use client';

import { writeBatch, doc, DocumentData, getDocs, collection, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { levels, classYears, subjects, lessons, recordedSessions, exercises, mockUser as user, comments } from '@/lib/data';
import type { User, Comment } from '@/lib/types';


async function seedCollection(db: any, collectionName: string, data: DocumentData[]) {
    try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        if (!querySnapshot.empty) {
            console.log(`Collection "${collectionName}" already contains data. Skipping seeding.`);
            return { collectionName, status: 'SKIPPED', count: 0 };
        }

        const batch = writeBatch(db);
        data.forEach((item) => {
            // Convert date strings to Timestamps for comments
            if (collectionName === 'comments' && typeof item.createdAt === 'string') {
                item.createdAt = Timestamp.now();
            }
            const docRef = doc(collectionRef, item.id);
            batch.set(docRef, item);
        });
        await batch.commit();
        console.log(`Seeded ${data.length} documents into ${collectionName}`);
        return { collectionName, status: 'SUCCESS', count: data.length };
    } catch (error: any) {
        console.error(`Error seeding ${collectionName}:`, error);
        return { collectionName, status: 'ERROR', error: error.message };
    }
}

async function seedUser(db: any, user: User) {
    try {
        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
            console.log(`Collection "users" already contains data. Skipping seeding.`);
            return { collectionName: 'users', status: 'SKIPPED', count: 0 };
        }

        const batch = writeBatch(db);
        const docRef = doc(collectionRef, user.id);
        batch.set(docRef, user);
        await batch.commit();
        console.log(`Seeded 1 document into users`);
        return { collectionName: 'users', status: 'SUCCESS', count: 1 };
    } catch (error: any)
        {
        console.error(`Error seeding users:`, error);
        return { collectionName: 'users', status: 'ERROR', error: error.message };
    }
}


export async function seedDatabase() {
    console.log('Starting database seed...');
    if (!db) {
        throw new Error("Firestore database is not available.");
    }
    
    const results = [];
    results.push(await seedCollection(db, 'levels', levels));
    results.push(await seedCollection(db, 'classYears', classYears));
    results.push(await seedCollection(db, 'subjects', subjects));
    results.push(await seedCollection(db, 'lessons', lessons));
    results.push(await seedCollection(db, 'recordedSessions', recordedSessions));
    results.push(await seedCollection(db, 'exercises', exercises));
    results.push(await seedUser(db, user));
    // Modify comments to add lessonId for querying
    const commentsWithLessonId = comments.map(c => ({...c, lessonId: 'fonctions-log'}));
    results.push(await seedCollection(db, 'comments', commentsWithLessonId));
    
    console.log('Database seeding finished.');
    return results;
}
