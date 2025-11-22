
import { getClassYearsByLevel, getLevels } from '@/lib/firestore-data';
import { SubjectForm } from '../_components/subject-form';

export default async function NewSubjectPage({ searchParams }: { searchParams: { yearSlug?: string } }) {
    const levels = await getLevels();
    const allYears = (await Promise.all(levels.map(l => getClassYearsByLevel(l.slug))))
        .flat()
        .sort((a,b) => a.levelSlug.localeCompare(b.levelSlug) || a.order - b.order);

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Ajouter une nouvelle matière</h1>
            <SubjectForm classYears={allYears} defaultYearSlug={searchParams.yearSlug} />
        </div>
    );
}
