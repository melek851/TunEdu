
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Book, Download, ListVideo, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AiAssistant } from '@/components/ai-assistant';
import type { BreadcrumbItem } from '@/lib/types';
import { getSubjectBySlug, getLessonsBySubject, getClassYearBySlug, getLevelBySlug } from '@/lib/firestore-data';

export default async function SubjectPage({ params }: { params: Promise<{ subjectSlug: string }> }) {
  const { subjectSlug } = await params;
  const subject = await getSubjectBySlug(subjectSlug);

  if (!subject) {
    notFound();
  }

  const subjectLessons = await getLessonsBySubject(subjectSlug);
  const year = await getClassYearBySlug(subject.classYearSlug);
  const level = year ? await getLevelBySlug(year.levelSlug) : null;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Parcourir', href: '/browse' },
  ];
  if(level) breadcrumbItems.push({ label: level.name, href: `/browse/${level.slug}` });
  if(year && level) breadcrumbItems.push({ label: year.name, href: `/browse/${level.slug}/${year.slug}` });
  breadcrumbItems.push({ label: subject.name, href: `/subjects/${subject.slug}` });


  return (
    <div className="container py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline">{subject.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">{subject.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="lessons">
            <TabsList className="mb-4">
              <TabsTrigger value="lessons"><ListVideo className="w-4 h-4 mr-2" />Leçons</TabsTrigger>
              <TabsTrigger value="manual"><Book className="w-4 h-4 mr-2" />Manuel</TabsTrigger>
            </TabsList>
            <TabsContent value="lessons">
              <div className="space-y-4">
                {subjectLessons.map((lesson) => (
                  <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                    <Card className="transition-all hover:shadow-md hover:border-primary">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="font-headline text-lg">Leçon {lesson.order}: {lesson.title}</CardTitle>
                          <CardDescription>{lesson.summary}</CardDescription>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
                 {subjectLessons.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">Aucune leçon disponible pour le moment.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="manual">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Manuel Scolaire</CardTitle>
                        <CardDescription>Prévisualisez le manuel ou téléchargez-le.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="mb-4">
                            <a href={subject.manualUrl} download>
                                <Button>
                                    <Download className="mr-2 h-4 w-4" />
                                    Télécharger le manuel (PDF)
                                </Button>
                            </a>
                        </div>
                        <div className="aspect-[3/4] w-full rounded-md border bg-muted">
                           <object data={subject.manualUrl} type="application/pdf" width="100%" height="100%">
                             <p className="p-4 text-center">Votre navigateur ne supporte pas la prévisualisation des PDF. <a href={subject.manualUrl} className="underline">Téléchargez-le</a> pour le voir.</p>
                           </object>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <AiAssistant subjectSlug={subject.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
