
import { getLessonById, getRecordedSessionById } from '@/lib/firestore-data';
import { notFound } from 'next/navigation';
import { RecordedSessionForm } from '@/app/admin/subjects/_components/recorded-session-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function EditRecordedSessionPage({ params }: { params: { subjectId: string, lessonId: string, sessionId: string } }) {
    const lesson = await getLessonById(params.lessonId);
    if (!lesson) notFound();

    const session = await getRecordedSessionById(params.sessionId);
    if (!session) notFound();

    return (
        <div className="container py-8">
            <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href={`/admin/subjects/${params.subjectId}/lessons`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux leçons
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline mb-8">Modifier la Session Vidéo</h1>
            <RecordedSessionForm lesson={lesson} session={session} subjectId={params.subjectId} />
        </div>
    );
}
