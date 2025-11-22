
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { saveExercise, type ExerciseFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Lesson, Exercise } from '@/lib/types';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Enregistrer les modifications' : 'Créer l\'exercice'}
        </Button>
    );
}

type ExerciseFormProps = {
    lesson: Lesson;
    subjectId: string;
    exercise?: Exercise;
};

export function ExerciseForm({ lesson, exercise, subjectId }: ExerciseFormProps) {
    const router = useRouter();
    const initialState: ExerciseFormState = { success: false, message: '' };
    const saveExerciseWithId = saveExercise.bind(null, exercise?.id || null);
    const [state, dispatch] = useActionState(saveExerciseWithId, initialState);
    
    useEffect(() => {
        if (state.success) {
            toast({ title: 'Succès!', description: state.message });
            router.push(`/admin/subjects/${subjectId}/lessons`);
        } else if (state.message && !state.success) {
            toast({ title: 'Erreur', description: state.message, variant: 'destructive' });
        }
    }, [state, router, subjectId]);

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{exercise ? `Modifier l'exercice` : 'Nouvel Exercice'}</CardTitle>
                <CardDescription>Pour la leçon: {lesson.title}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-6">
                    <input type="hidden" name="lessonSlug" value={lesson.slug} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de l'exercice</Label>
                        <Input id="title" name="title" defaultValue={exercise?.title} required />
                        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={exercise?.description} required />
                        {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fileUrl">URL du fichier (PDF)</Label>
                        <Input id="fileUrl" name="fileUrl" type="url" defaultValue={exercise?.fileUrl} required />
                        {state.errors?.fileUrl && <p className="text-sm text-destructive">{state.errors.fileUrl[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulté</Label>
                        <Select name="difficulty" required defaultValue={exercise?.difficulty || 'EASY'}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une difficulté..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EASY">Facile</SelectItem>
                                <SelectItem value="MEDIUM">Moyen</SelectItem>
                                <SelectItem value="HARD">Difficile</SelectItem>
                            </SelectContent>
                        </Select>
                         {state.errors?.difficulty && <p className="text-sm text-destructive">{state.errors.difficulty[0]}</p>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={`/admin/subjects/${subjectId}/lessons`}>Annuler</Link>
                        </Button>
                        <SubmitButton isEditing={!!exercise} />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
