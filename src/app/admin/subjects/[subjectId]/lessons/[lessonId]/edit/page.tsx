
import { getSubjectById, getLessonById } from '@/lib/firestore-data';
import { notFound } from 'next/navigation';
import { LessonForm } from '../../../../_components/lesson-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function EditLessonPage({ params }: { params: { subjectId: string, lessonId: string } }) {
    const subject = await getSubjectById(params.subjectId);
    if (!subject) notFound();

    const lesson = await getLessonById(params.lessonId);
    if (!lesson) notFound();

    return (
        <div className="container py-8">
            <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href={`/admin/subjects/${subject.id}/lessons`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux leçons
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline mb-8">Modifier la Leçon</h1>
            <LessonForm subject={subject} lesson={lesson} />
        </div>
    );
}
