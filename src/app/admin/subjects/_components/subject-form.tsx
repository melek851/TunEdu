
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { saveSubject, type SubjectFormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { ClassYear, Subject } from '@/lib/types';
import Link from 'next/link';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Enregistrer les modifications' : 'Créer la matière'}
        </Button>
    );
}

type SubjectFormProps = {
    subject?: Subject;
    classYears: ClassYear[];
    defaultYearSlug?: string;
};

export function SubjectForm({ subject, classYears, defaultYearSlug }: SubjectFormProps) {
    const router = useRouter();
    const initialState: SubjectFormState = { success: false, message: '' };
    const saveSubjectWithId = saveSubject.bind(null, subject?.id || null);
    const [state, dispatch] = useActionState(saveSubjectWithId, initialState);
    
    useEffect(() => {
        if (state.success) {
            toast({ title: 'Succès!', description: state.message });
            router.push('/admin');
        } else if (state.message) {
            toast({ title: 'Erreur', description: state.message, variant: 'destructive' });
        }
    }, [state, router]);

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{subject ? `Modifier "${subject.name}"` : 'Nouvelle matière'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={dispatch} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="classYearSlug">Année</Label>
                        <Select name="classYearSlug" required defaultValue={subject?.classYearSlug || defaultYearSlug}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une année..." />
                            </SelectTrigger>
                            <SelectContent>
                                {classYears.map((year) => (
                                    <SelectItem key={year.slug} value={year.slug}>
                                        {year.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {state.errors?.classYearSlug && <p className="text-sm text-destructive">{state.errors.classYearSlug[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Nom de la matière</Label>
                        <Input id="name" name="name" defaultValue={subject?.name} required />
                        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" name="slug" defaultValue={subject?.slug} required placeholder="ex: maths-bac-info" />
                        {state.errors?.slug && <p className="text-sm text-destructive">{state.errors.slug[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={subject?.description} required />
                        {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="manualUrl">URL du manuel (PDF)</Label>
                        <Input id="manualUrl" name="manualUrl" type="url" defaultValue={subject?.manualUrl} required />
                        {state.errors?.manualUrl && <p className="text-sm text-destructive">{state.errors.manualUrl[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="thumbnailUrl">URL de la miniature</Label>
                        <Input id="thumbnailUrl" name="thumbnailUrl" type="url" defaultValue={subject?.thumbnailUrl} required />
                        {state.errors?.thumbnailUrl && <p className="text-sm text-destructive">{state.errors.thumbnailUrl[0]}</p>}
                    </div>

                     <div className="space-y-2">
                        <Label htmlFor="thumbnailHint">Indice pour la miniature (AI Hint)</Label>
                        <Input id="thumbnailHint" name="thumbnailHint" defaultValue={subject?.thumbnailHint} required />
                        {state.errors?.thumbnailHint && <p className="text-sm text-destructive">{state.errors.thumbnailHint[0]}</p>}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" asChild>
                            <Link href="/admin">Annuler</Link>
                        </Button>
                        <SubmitButton isEditing={!!subject} />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
