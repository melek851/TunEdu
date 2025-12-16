
import { getSubjectById, getLessonsBySubject, getRecordedSessionsByLesson, getExercisesByLesson } from '@/lib/firestore-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, Video, FileText, ArrowLeft } from 'lucide-react';
import { DeleteDialog } from '@/app/admin/_components/delete-dialog';
import { deleteLesson, deleteRecordedSession, deleteExercise } from '@/app/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';


export default async function AdminLessonsPage({ params }: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = await params;
    const subject = await getSubjectById(subjectId);
    if (!subject) {
        notFound();
    }
    const lessons = await getLessonsBySubject(subject.slug);

    return (
        <div className="container py-8">
            <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href="/admin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à toutes les matières
                </Link>
            </Button>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Gérer les leçons pour "{subject.name}"</h1>
                    <p className="text-muted-foreground">Ajouter, modifier ou supprimer des leçons pour cette matière.</p>
                </div>
                 <Button asChild>
                    <Link href={`/admin/subjects/${subject.id}/lessons/new`}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Ajouter une Leçon
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Accordion type="multiple" className="w-full">
                        {lessons.map(async (lesson) => {
                             const sessions = await getRecordedSessionsByLesson(lesson.slug);
                             const exercises = await getExercisesByLesson(lesson.slug);
                            return (
                                <AccordionItem value={lesson.id} key={lesson.id}>
                                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 text-left">
                                        <div className="flex-1">
                                            <p className="font-semibold text-lg">Leçon {lesson.order}: {lesson.title}</p>
                                            <p className="text-sm text-muted-foreground">{lesson.summary}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 bg-muted/20">
                                        <div className="flex justify-end gap-2 mb-4">
                                            <Button asChild size="sm" variant="ghost">
                                                <Link href={`/admin/subjects/${subject.id}/lessons/${lesson.id}/edit`}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Modifier la Leçon
                                                </Link>
                                            </Button>
                                            <DeleteDialog 
                                                id={lesson.id} 
                                                action={deleteLesson} 
                                                itemName={lesson.title}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Card>
                                                <CardHeader className="flex-row items-center justify-between p-4">
                                                    <CardTitle className="text-base font-medium">Sessions Vidéo</CardTitle>
                                                    <Button asChild variant="outline" size="sm">
                                                         <Link href={`/admin/subjects/${subject.id}/lessons/${lesson.id}/sessions/new`}>
                                                            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter
                                                         </Link>
                                                    </Button>
                                                </CardHeader>
                                                <CardContent className="space-y-2 p-4 pt-0">
                                                    {sessions.map(s => (
                                                        <div key={s.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-background">
                                                            <span>{s.title}</span>
                                                             <div className="flex gap-1">
                                                                <Button asChild size="icon" variant="ghost" className="h-7 w-7">
                                                                    <Link href={`/admin/subjects/${subject.id}/lessons/${lesson.id}/sessions/${s.id}/edit`}><Pencil className="h-4 w-4"/></Link>
                                                                </Button>
                                                                <DeleteDialog id={s.id} action={deleteRecordedSession} itemName={s.title} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {sessions.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucune session.</p>}
                                                </CardContent>
                                            </Card>
                                             <Card>
                                                <CardHeader className="flex-row items-center justify-between p-4">
                                                    <CardTitle className="text-base font-medium">Exercices</CardTitle>
                                                    <Button asChild variant="outline" size="sm">
                                                         <Link href={`/admin/subjects/${subject.id}/lessons/${lesson.id}/exercises/new`}>
                                                            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter
                                                         </Link>
                                                    </Button>
                                                </CardHeader>
                                                <CardContent className="space-y-2 p-4 pt-0">
                                                    {exercises.map(ex => (
                                                        <div key={ex.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-background">
                                                            <div className="flex items-center gap-2">
                                                                <span>{ex.title}</span>
                                                                <Badge variant="outline">{ex.difficulty}</Badge>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <Button asChild size="icon" variant="ghost" className="h-7 w-7">
                                                                    <Link href={`/admin/subjects/${subject.id}/lessons/${lesson.id}/exercises/${ex.id}/edit`}><Pencil className="h-4 w-4"/></Link>
                                                                </Button>
                                                                <DeleteDialog id={ex.id} action={deleteExercise} itemName={ex.title} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                     {exercises.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Aucun exercice.</p>}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                     {lessons.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center p-8">Aucune leçon pour cette matière.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
