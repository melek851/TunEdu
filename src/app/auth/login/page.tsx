
'use client';

import Link from "next/link";
import { BookOpenCheck, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, type AuthFormState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Se connecter"}
    </Button>
  );
}

export default function LoginPage() {
  const initialState: AuthFormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(signIn, initialState);

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <BookOpenCheck className="h-10 w-10 text-primary mb-2" />
        <CardTitle className="text-2xl font-headline">Se connecter</CardTitle>
        <CardDescription>
          Entrez votre email ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          <div className="grid gap-4">
             {state.errors?._form && (
              <div className="p-2 bg-destructive/10 text-destructive text-sm rounded-md">
                {state.errors._form[0]}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ahmed@example.com"
                required
              />
               {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
               {state.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password[0]}</p>
              )}
            </div>
            <SubmitButton />
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous n'avez pas de compte?{" "}
          <Link href="/auth/signup" className="underline">
            S'inscrire
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
