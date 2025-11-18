
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { seedDatabase } from '@/firebase/seeder';
import { Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type SeedResult = {
    collectionName: string;
    status: 'SUCCESS' | 'ERROR' | 'SKIPPED';
    count?: number;
    error?: string;
}

export default function SeedDbPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<SeedResult[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSeed = async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);
        try {
            const seedResults = await seedDatabase();
            setResults(seedResults);
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'An unexpected error occurred during seeding.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const getStatusIcon = (status: SeedResult['status']) => {
        switch(status) {
            case 'SUCCESS': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'SKIPPED': return <Info className="h-5 w-5 text-yellow-500" />;
            case 'ERROR': return <AlertTriangle className="h-5 w-5 text-red-500" />;
        }
    }

    return (
        <div className="container py-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Seed Firestore Database</CardTitle>
                    <CardDescription>
                        Click the button to upload all the curriculum data from your local `data.ts` file into your Firestore database. This is a one-time operation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4">
                        <Button onClick={handleSeed} disabled={isLoading} size="lg">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Seeding...
                                </>
                            ) : 'Start Seeding'}
                        </Button>

                        {error && (
                            <div className="mt-4 w-full rounded-md border border-destructive/50 bg-destructive/10 p-4 text-center text-destructive">
                                <p className="font-bold">Seeding Failed</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {results && (
                             <div className="mt-6 w-full space-y-2">
                                <h3 className="font-semibold text-center">Seeding Results</h3>
                                <ul className="divide-y rounded-md border">
                                    {results.map(res => (
                                        <li key={res.collectionName} className="flex items-center justify-between p-3">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(res.status)}
                                                <span className="font-medium">{res.collectionName}</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {res.status === 'SUCCESS' && `Seeded ${res.count} documents`}
                                                {res.status === 'SKIPPED' && `Already has data`}
                                                {res.status === 'ERROR' && `Error: ${res.error}`}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
