
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { saveRecordedSession, type RecordedSessionFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { Lesson, RecordedSession } from '@/lib/types';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Enregistrer les modifications' : 'Créer la session'}
        </Button>
    );
}

type RecordedSessionFormProps = {
    lesson: Lesson;
    subjectId: string;
    session?: RecordedSession;
};

export function RecordedSessionForm({ lesson, session, subjectId }: RecordedSessionFormProps) {
    const router = useRouter();
    const initialState: RecordedSessionFormState = { success: false, message: '' };
    const saveSessionWithId = saveRecordedSession.bind(null, session?.id || null);
    const [state, dispatch] = useActionState(saveSessionWithId, initialState);
    
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
                <CardTitle>{session ? `Modifier la session` : 'Nouvelle Session Vidéo'}</CardTitle>
                <CardDescription>Pour la leçon: {lesson.title}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-6">
                    <input type="hidden" name="lessonSlug" value={lesson.slug} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de la session</Label>
                        <Input id="title" name="title" defaultValue={session?.title} required />
                        {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="videoUrl">URL de la vidéo (YouTube)</Label>
                        <Input id="videoUrl" name="videoUrl" defaultValue={session?.videoUrl} required placeholder="https://www.youtube.com/watch?v=..." />
                        {state.errors?.videoUrl && <p className="text-sm text-destructive">{state.errors.videoUrl[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="durationSeconds">Durée (en secondes)</Label>
                        <Input id="durationSeconds" name="durationSeconds" type="number" defaultValue={session?.durationSeconds || 1800} required />
                        {state.errors?.durationSeconds && <p className="text-sm text-destructive">{state.errors.durationSeconds[0]}</p>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href={`/admin/subjects/${subjectId}/lessons`}>Annuler</Link>
                        </Button>
                        <SubmitButton isEditing={!!session} />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
