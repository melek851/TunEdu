'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Send, Loader2 } from 'lucide-react';
import { askQuestion, type AIAssistantFormState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" aria-label="Envoyer" disabled={pending}>
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
    </Button>
  );
}

export function AiAssistant({ subjectSlug }: { subjectSlug: string }) {
  const initialState: AIAssistantFormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(askQuestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Success') {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Assistant IA</CardTitle>
            <CardDescription>Posez une question sur cette matière.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={dispatch} className="space-y-4">
          <input type="hidden" name="subjectSlug" value={subjectSlug} />
          <div className="flex gap-2">
            <Input
              name="question"
              placeholder="Ex: Expliquez la notion de limite..."
              required
              className="flex-grow"
            />
            <SubmitButton />
          </div>
          {state.errors?.question && (
            <p className="text-sm text-destructive">{state.errors.question[0]}</p>
          )}
        </form>

        {state.answer && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <p className="text-sm">{state.answer}</p>
          </div>
        )}
        {state.message && state.message !== 'Success' && state.message !== 'Validation failed.' && (
          <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
            <p className="text-sm text-destructive">{state.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
