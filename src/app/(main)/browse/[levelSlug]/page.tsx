
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/lib/types';
import { getLevelBySlug, getClassYearsByLevel } from '@/lib/firestore-data';

export default async function BrowseYearsPage({ params }: { params: Promise<{ levelSlug: string }> }) {
  const { levelSlug } = await params;
  const level = await getLevelBySlug(levelSlug);
  
  if (!level) {
    notFound();
  }

  const years = await getClassYearsByLevel(levelSlug);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Parcourir', href: '/browse' },
    { label: level.name, href: `/browse/${level.slug}` },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold font-headline mb-2">Niveau {level.name}</h1>
      <p className="text-muted-foreground mb-8">
        Sélectionnez une année pour voir les matières disponibles.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {years.map((year) => (
          <Link key={year.id} href={`/browse/${level.slug}/${year.slug}`}>
            <Card className="h-full transition-transform hover:scale-105 hover:shadow-md">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="font-headline text-lg">{year.name}</CardTitle>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
