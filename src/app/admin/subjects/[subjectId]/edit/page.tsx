
import { getSubjectById, getClassYearsByLevel, getLevels } from '@/lib/firestore-data';
import { notFound } from 'next/navigation';
import { SubjectForm } from '../../_components/subject-form';

export default async function EditSubjectPage({ params }: { params: { subjectId: string } }) {
    const subject = await getSubjectById(params.subjectId);
    if (!subject) {
        notFound();
    }
    const levels = await getLevels();
    // This is not perfectly efficient, but for a small number of years it's fine.
    const allYears = (await Promise.all(levels.map(l => getClassYearsByLevel(l.slug))))
        .flat()
        .sort((a,b) => a.levelSlug.localeCompare(b.levelSlug) || a.order - b.order);


    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Modifier la matière</h1>
            <SubjectForm subject={subject} classYears={allYears} />
        </div>
    );
}
