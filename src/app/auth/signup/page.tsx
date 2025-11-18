
'use client';

import Link from "next/link";
import { BookOpenCheck, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

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
import { signUp, type AuthFormState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Créer un compte"}
    </Button>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const initialState: AuthFormState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(signUp, initialState);

  useEffect(() => {
    // This effect will run when the component mounts and whenever `state.message` changes.
    // However, the `redirect` in the server action will trigger a full page navigation,
    // so this component will unmount and the toast might not be visible.
    // For a better UX, we could handle redirection on the client after showing the toast.
    if (state.message === 'Success') {
      toast({
        title: "Compte créé avec succès!",
        description: "Vous pouvez maintenant vous connecter.",
      });
      // The redirect in the action will handle navigation.
    }
  }, [state.message, router]);

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <BookOpenCheck className="h-10 w-10 text-primary mb-2" />
        <CardTitle className="text-2xl font-headline">Créer un compte</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer un compte
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" placeholder="Ahmed" required />
                {state.errors?.firstName && (
                  <p className="text-sm text-destructive">{state.errors.firstName[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" placeholder="Cherif" required />
                 {state.errors?.lastName && (
                  <p className="text-sm text-destructive">{state.errors.lastName[0]}</p>
                )}
              </div>
            </div>
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
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
               {state.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password[0]}</p>
              )}
            </div>
            <SubmitButton />
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <Link href="/auth/login" className="underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
