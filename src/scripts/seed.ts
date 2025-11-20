
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch } from 'firebase/firestore';
import { levels, classYears, subjects, lessons, recordedSessions, exercises } from '../lib/data';
import 'dotenv/config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCollection<T extends { id: string }>(collectionName: string, data: T[]) {
  if (data.length === 0) {
    console.log(`No data to seed for ${collectionName}.`);
    return;
  }
  
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionName);
  
  console.log(`Seeding ${collectionName}...`);
  
  data.forEach((item) => {
    const docRef = doc(collectionRef, item.id);
    batch.set(docRef, item);
  });
  
  await batch.commit();
  console.log(`✅ ${collectionName} seeded successfully! (${data.length} documents)`);
}

async function seedDatabase() {
  console.log('Starting database seed process...');
  
  try {
    await seedCollection('levels', levels);
    await seedCollection('classYears', classYears);
    await seedCollection('subjects', subjects);
    await seedCollection('lessons', lessons);
    await seedCollection('recordedSessions', recordedSessions);
    await seedCollection('exercises', exercises);
    
    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // In a real script, you might want to properly close the Firebase connection if the script doesn't exit automatically.
    // For a simple script like this, Node.js will exit when the async operations are done.
    process.exit(0);
  }
}

seedDatabase();
