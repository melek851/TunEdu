import { NextRequest, NextResponse } from 'next/server';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const durationSeconds = Number(formData.get('durationSeconds'));
    const context = formData.get('context') as string;

    if (!userId || !durationSeconds || !context) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await addDoc(collection(db, 'userTimeSpents'), {
      userId,
      durationSeconds,
      context,
      loggedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Time logged successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/log-time:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
