
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { saveLesson, type LessonFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Subject, Lesson } from '@/lib/types';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Enregistrer les modifications' : 'Créer la leçon'}
        </Button>
    );
}

type LessonFormProps = {
    subject: Subject;
    lesson?: Lesson;
};

export function LessonForm({ subject, lesson }: LessonFormProps) {
    const router = useRouter();
    const initialState: LessonFormState = { success: false, message: '' };
    const saveLessonWithId = saveLesson.bind(null, lesson?.id || null);
    const [state, dispatch] = useActionState(saveLessonWithId, initialState);
    
    useEffect(() => {
        if (state.success) {
            toast({ title: 'Succès!', description: state.message });
            router.push(`/admin/subjects/${subject.id}/lessons`);
        } else if (state.message && !state.success) {
            toast({ title: 'Erreur', description: state.message, variant: 'destructive' });
        }
    }, [state, router, subject.id]);

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{lesson ? `Modifier la leçon` : 'Nouvelle Leçon'}</CardTitle>
                <CardDescription>Pour la matière: {subject.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-6">
                    <input type="hidden" name="subjectSlug" value={subject.slug} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de la leçon</Label>
                        <Input id="title" name="title" defaultValue={lesson?.title} required />
                        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" name="slug" defaultValue={lesson?.slug} required placeholder="ex: la-lettre-alif" />
                        {state.errors?.slug && <p className="text-sm text-destructive">{state.errors.slug[0]}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="summary">Résumé</Label>
                        <Textarea id="summary" name="summary" defaultValue={lesson?.summary} required />
                        {state.errors?.summary && <p className="text-sm text-destructive">{state.errors.summary[0]}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="order">Ordre</Label>
                            <Input id="order" name="order" type="number" defaultValue={lesson?.order || 1} required />
                            {state.errors?.order && <p className="text-sm text-destructive">{state.errors.order[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="score">Score</Label>
                            <Input id="score" name="score" type="number" defaultValue={lesson?.score || 0} required />
                            {state.errors?.score && <p className="text-sm text-destructive">{state.errors.score[0]}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={`/admin/subjects/${subject.id}/lessons`}>Annuler</Link>
                        </Button>
                        <SubmitButton isEditing={!!lesson} />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
