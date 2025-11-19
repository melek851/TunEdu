'use client';

import { useActionState, useState } from 'react';
import { seedDatabase } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface SeedState {
  message: string;
  success: boolean;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Seeding...' : 'Seed Database'}
    </Button>
  );
}

export default function SeedPage() {
  const initialState: SeedState = { message: '', success: false };
  const [state, dispatch] = useActionState(seedDatabase, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Database Seeder</CardTitle>
          <CardDescription>
            Click the button to populate your Firestore database with the initial data from{' '}
            <code>src/lib/data.ts</code>. This will overwrite existing data in the collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch}>
            <SubmitButton />
          </form>

          {state.message && (
            <div className="mt-4 flex items-center gap-3 rounded-lg border p-3 text-sm">
              {state.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <p className={state.success ? 'text-muted-foreground' : 'text-destructive'}>
                {state.message}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
