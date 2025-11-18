
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, MessageSquare, Download } from 'lucide-react';
import { VoteWidget } from '@/components/vote-widget';
import { Comments } from '@/components/comments';
import { Separator } from '@/components/ui/separator';
import { AiAssistant } from '@/components/ai-assistant';
import { getLessonBySlug, getRecordedSessionsByLesson, getExercisesByLesson, getSubjectBySlug, getClassYearBySlug, getLevelBySlug } from '@/lib/firestore-data';

export default async function LessonPage({ params }: { params: { lessonSlug: string } }) {
  const { lessonSlug } = params;
  const lesson = await getLessonBySlug(lessonSlug);

  if (!lesson) {
    notFound();
  }

  const [lessonSessions, lessonExercises, subject] = await Promise.all([
    getRecordedSessionsByLesson(lessonSlug),
    getExercisesByLesson(lessonSlug),
    getSubjectBySlug(lesson.subjectSlug),
  ]);

  const year = subject ? await getClassYearBySlug(subject.classYearSlug, subject.classYearSlug) : null;
  const level = year ? await getLevelBySlug(year.levelSlug) : null;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Parcourir', href: '/browse' },
  ];
  if(level) breadcrumbItems.push({ label: level.name, href: `/browse/${level.slug}` });
  if(year) breadcrumbItems.push({ label: year.name, href: `/browse/${level?.slug}/${year.slug}` });
  if(subject) breadcrumbItems.push({ label: subject.name, href: `/subjects/${subject.slug}` });
  breadcrumbItems.push({ label: lesson.title, href: `/lessons/${lesson.slug}` });

  return (
    <div className="container py-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold font-headline">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{lesson.summary}</p>
          </div>
          <div className="flex-shrink-0">
            <VoteWidget initialScore={lesson.score} />
          </div>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="session" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="session"><Video className="w-4 h-4 mr-2" />Session Vidéo</TabsTrigger>
              <TabsTrigger value="exercises"><FileText className="w-4 h-4 mr-2" />Exercices</TabsTrigger>
              <TabsTrigger value="discussion"><MessageSquare className="w-4 h-4 mr-2" />Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="session" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Vidéos de la leçon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lessonSessions.length > 0 ? lessonSessions.map((session, index) => (
                    <div key={session.id}>
                      <h3 className="font-semibold mb-2">{session.title}</h3>
                      <div className="aspect-video w-full rounded-lg overflow-hidden border">
                        <iframe
                          src={session.videoUrl}
                          title={session.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      {index < lessonSessions.length - 1 && <Separator className="mt-6"/>}
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">Aucune session vidéo disponible.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="exercises" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Séries d'exercices</CardTitle>
                  <CardDescription>Téléchargez les séries d'exercices pour cette leçon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lessonExercises.length > 0 ? lessonExercises.map(ex => (
                    <Card key={ex.id} className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{ex.title}</h3>
                        <p className="text-sm text-muted-foreground">{ex.description}</p>
                      </div>
                      <a href={ex.fileUrl} download>
                        <Button variant="outline" size="icon">
                          <Download className="h-5 w-5" />
                        </Button>
                      </a>
                    </Card>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">Aucun exercice disponible.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussion" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Espace de discussion</CardTitle>
                  <CardDescription>Posez vos questions et échangez avec d'autres étudiants.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Comments lessonId={lesson.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            {subject && <AiAssistant subjectSlug={subject.slug} />}
          </div>
        </div>
      </div>
    </div>
  );
}
