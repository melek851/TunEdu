
import { getSubjectById } from '@/lib/firestore-data';
import { notFound } from 'next/navigation';
import { LessonForm } from '@/app/admin/subjects/_components/lesson-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function NewLessonPage({ params }: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = await params;
    const subject = await getSubjectById(subjectId);
    if (!subject) {
        notFound();
    }

    return (
        <div className="container py-8">
             <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href={`/admin/subjects/${subject.id}/lessons`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour aux leçons
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline mb-8">Ajouter une Leçon à "{subject.name}"</h1>
            <LessonForm subject={subject} />
        </div>
    );
}
