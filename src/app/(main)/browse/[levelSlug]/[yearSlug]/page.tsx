
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/lib/types';
import { getLevelBySlug, getClassYearBySlug, getSubjectsByYear } from '@/lib/firestore-data';

export default async function BrowseSubjectsPage({ params }: { params: { levelSlug: string, yearSlug: string } }) {
  const { levelSlug, yearSlug } = params;
  const level = await getLevelBySlug(levelSlug);
  const year = await getClassYearBySlug(yearSlug);

  if (!level || !year) {
    notFound();
  }

  const availableSubjects = await getSubjectsByYear(year.slug);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Parcourir', href: '/browse' },
    { label: level.name, href: `/browse/${level.slug}` },
    { label: year.name, href: `/browse/${level.slug}/${year.slug}` },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold font-headline mb-2">{year.name}</h1>
      <p className="text-muted-foreground mb-8">
        Explorez les matières pour l'année {year.name}.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableSubjects.map((subject) => (
          <Link key={subject.id} href={`/subjects/${subject.slug}`} className="group block">
            <Card className="h-full overflow-hidden transition-all border-2 border-transparent group-hover:border-primary group-hover:shadow-lg">
              <Image
                src={subject.thumbnailUrl}
                alt={subject.name}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                data-ai-hint={subject.thumbnailHint}
              />
              <CardHeader>
                <CardTitle className="font-headline text-xl">{subject.name}</CardTitle>
                <CardDescription className="line-clamp-2">{subject.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
         {availableSubjects.length === 0 && (
            <p className="text-muted-foreground col-span-full">Aucune matière disponible pour cette année pour le moment.</p>
        )}
      </div>
    </div>
  );
}
