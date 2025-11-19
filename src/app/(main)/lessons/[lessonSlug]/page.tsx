'use client'

import { notFound, useParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem, Exercise, Lesson, RecordedSession, Subject as SubjectType, ClassYear as ClassYearType, Level as LevelType } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, MessageSquare, Download } from 'lucide-react';
import { VoteWidget } from '@/components/vote-widget';
import { Comments } from '@/components/comments';
import { Separator } from '@/components/ui/separator';
import { AiAssistant } from '@/components/ai-assistant';
import { getLessonBySlug, getRecordedSessionsByLesson, getExercisesByLesson, getSubjectBySlug, getClassYearBySlug, getLevelBySlug, trackUserLessonView, trackUserExerciseOpen } from '@/lib/firestore-data';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { TimeTracker } from '@/components/time-tracker';


const convertToEmbedUrl = (url: string) => {
    if (!url) return '';
    // Check for standard watch URL
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    // Check if it's already an embed URL
    if (url.includes('youtube.com/embed/')) {
        return url;
    }
    // Check for short URL
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
};

function ExercisesTab({ exercises, onExerciseOpen }: { exercises: Exercise[], onExerciseOpen: (exerciseId: string) => void }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Séries d'exercices</CardTitle>
                <CardDescription>Téléchargez les séries d'exercices pour cette leçon.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {exercises.length > 0 ? exercises.map(ex => (
                    <Card key={ex.id} className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">{ex.title}</h3>
                            <p className="text-sm text-muted-foreground">{ex.description}</p>
                        </div>
                        <a href={ex.fileUrl} download onClick={() => onExerciseOpen(ex.id)}>
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
    );
}

export default function LessonPage() {
  const params = useParams();
  const lessonSlug = params.lessonSlug as string;
  const { user } = useUser();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessonSessions, setLessonSessions] = useState<RecordedSession[]>([]);
  const [lessonExercises, setLessonExercises] = useState<Exercise[]>([]);
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [year, setYear] = useState<ClassYearType | null>(null);
  const [level, setLevel] = useState<LevelType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        if (!lessonSlug) return;

        setLoading(true);

        const lessonData = await getLessonBySlug(lessonSlug);
        
        if (lessonData) {
            setLesson(lessonData);
            const [sessionsData, exercisesData, subjectData] = await Promise.all([
                getRecordedSessionsByLesson(lessonSlug),
                getExercisesByLesson(lessonSlug),
                getSubjectBySlug(lessonData.subjectSlug),
            ]);

            setLessonSessions(sessionsData);
            setLessonExercises(exercisesData);
            
            if (subjectData) {
                setSubject(subjectData);
                const yearData = await getClassYearBySlug(subjectData.classYearSlug);
                if (yearData) {
                    setYear(yearData);
                    const levelData = await getLevelBySlug(yearData.levelSlug);
                    setLevel(levelData);
                }
            }
        }
        setLoading(false);
    }
    fetchData();
  }, [lessonSlug]);

  useEffect(() => {
    if (user && lesson) {
        trackUserLessonView(user.uid, lesson.slug);
    }
  }, [user, lesson]);

  const handleExerciseOpen = (exerciseId: string) => {
    if (user) {
      trackUserExerciseOpen(user.uid, exerciseId);
    }
  };
  
  if (loading) {
      // You can return a skeleton loader here
      return <div className="container py-8">Loading...</div>
  }

  if (!lesson) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Parcourir', href: '/browse' },
  ];
  if(level) breadcrumbItems.push({ label: level.name, href: `/browse/${level.slug}` });
  if(year && level) breadcrumbItems.push({ label: year.name, href: `/browse/${level.slug}/${year.slug}` });
  if(subject) breadcrumbItems.push({ label: subject.name, href: `/subjects/${subject.slug}` });
  breadcrumbItems.push({ label: lesson.title, href: `/lessons/${lesson.slug}` });

  return (
    <div className="container py-8">
      {user && <TimeTracker userId={user.uid} context={`lesson:${lesson.slug}`} />}
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
                          src={convertToEmbedUrl(session.videoUrl)}
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
                <ExercisesTab exercises={lessonExercises} onExerciseOpen={handleExerciseOpen} />
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
