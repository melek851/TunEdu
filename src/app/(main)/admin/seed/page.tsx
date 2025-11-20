'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { seedDatabase } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin mr-2" /> : null}
      {pending ? 'Seeding...' : 'Seed Database'}
    </Button>
  );
}

export default function SeedPage() {
  const [state, dispatch] = useActionState(seedDatabase, undefined);

  useEffect(() => {
    if (state?.success === true) {
      toast({
        title: "Success!",
        description: state.message,
      });
    } else if (state?.success === false) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <div className="container py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Database Seeding</CardTitle>
          <CardDescription>
            Click the button to populate your Firestore database with the initial curriculum data. This will overwrite any existing data in the collections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch}>
            <SubmitButton />
          </form>
           {state?.message && (
             <p className={`mt-4 text-sm ${state.success ? 'text-green-600' : 'text-destructive'}`}>
               {state.message}
             </p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
