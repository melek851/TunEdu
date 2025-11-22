
import { getLevels, getSubjectsByYear, getClassYearsByLevel } from '@/lib/firestore-data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2, ArrowLeft, BookOpen } from 'lucide-react';
import { DeleteDialog } from './_components/delete-dialog';
import { deleteSubject } from '../actions';

export default async function AdminDashboardPage() {
    const levels = await getLevels();

    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Admin Studio</h1>
                    <p className="text-muted-foreground">Gérez le contenu de la plateforme TunEdu.</p>
                </div>
                 <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retourner au site principal
                    </Link>
                </Button>
            </div>

            <div className="space-y-8">
                {levels.map(async (level) => {
                    const years = await getClassYearsByLevel(level.slug);
                    return (
                        <Card key={level.id}>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{level.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {years.map(async (year) => {
                                    const subjects = await getSubjectsByYear(year.slug);
                                    return (
                                        <div key={year.id} className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-semibold text-lg">{year.name}</h3>
                                                <Button asChild size="sm" variant="outline">
                                                    <Link href={`/admin/subjects/new?yearSlug=${year.slug}`}>
                                                        <PlusCircle className="mr-2 h-4 w-4" />
                                                        Ajouter Matière
                                                    </Link>
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                {subjects.map((subject) => (
                                                    <Card key={subject.id} className="flex items-center justify-between p-4">
                                                        <p className="font-medium">{subject.name}</p>
                                                        <div className="flex gap-2">
                                                            <Button asChild size="sm" variant="secondary">
                                                                <Link href={`/admin/subjects/${subject.id}/lessons`}>
                                                                    <BookOpen className="mr-2 h-4 w-4" /> Gérer les leçons
                                                                </Link>
                                                            </Button>
                                                            <Button asChild size="sm" variant="ghost">
                                                                <Link href={`/admin/subjects/${subject.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" /> Modifier
                                                                </Link>
                                                            </Button>
                                                            <DeleteDialog 
                                                                id={subject.id} 
                                                                action={deleteSubject} 
                                                                itemName={subject.name}
                                                            />
                                                        </div>
                                                    </Card>
                                                ))}
                                                {subjects.length === 0 && (
                                                    <p className="text-sm text-muted-foreground text-center py-4">Aucune matière pour cette année.</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
