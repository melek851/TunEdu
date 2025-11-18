
'use client';

import Link from "next/link"
import { BookOpenCheck, Loader2 } from "lucide-react"
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { initiateEmailSignUp, type AuthFormState } from "../actions";

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
  const { toast } = useToast();
  const initialState: AuthFormState = { message: '', success: false };
  const [state, formAction] = useActionState(initiateEmailSignUp, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Succès",
        description: "Compte créé. Redirection...",
      });
      router.push('/');
    } else if (state.message && state.message !== 'Validation failed.') {
      toast({
        title: "Erreur d'inscription",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, router, toast]);

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
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" placeholder="Ahmed" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" placeholder="Cherif" required />
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
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
  )
}
