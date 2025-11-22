
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { getUserProfile } from '@/lib/firestore-data';
import type { User } from '@/lib/types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUserProfile, changePassword, type UserProfileFormState, type ChangePasswordFormState } from '@/app/actions';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton({ text, loadingText }: { text: string, loadingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin mr-2" /> : null}
      {pending ? loadingText : text}
    </Button>
  );
}

function UserProfileForm({ user, profile }: { user: any, profile: User }) {
  const initialState: UserProfileFormState = { success: false, message: '' };
  const updateUserWithId = updateUserProfile.bind(null, user.uid);
  const [state, dispatch] = useActionState(updateUserWithId, initialState);
  
  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Succès!" : "Erreur",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="avatarUrl">URL de l'avatar</Label>
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback>
                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                </AvatarFallback>
            </Avatar>
            <Input id="avatarUrl" name="avatarUrl" defaultValue={profile.avatarUrl || ''} />
        </div>
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" name="firstName" defaultValue={profile.firstName} required />
          {state.errors?.firstName && <p className="text-sm text-destructive">{state.errors.firstName[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" name="lastName" defaultValue={profile.lastName} required />
          {state.errors?.lastName && <p className="text-sm text-destructive">{state.errors.lastName[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profile.email} disabled />
      </div>
      <SubmitButton text="Mettre à jour le profil" loadingText="Mise à jour..." />
    </form>
  );
}

function ChangePasswordForm() {
    const initialState: ChangePasswordFormState = { success: false, message: '' };
    const [state, dispatch] = useActionState(changePassword, initialState);

    useEffect(() => {
        if (state.message) {
        toast({
            title: state.success ? "Succès!" : "Erreur",
            description: state.message,
            variant: state.success ? "default" : "destructive",
        });
        }
    }, [state]);

    return (
        <form action={dispatch} className="space-y-4">
             {state.errors?._form && (
              <div className="p-2 bg-destructive/10 text-destructive text-sm rounded-md">
                {state.errors._form[0]}
              </div>
            )}
            <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
                {state.errors?.currentPassword && <p className="text-sm text-destructive">{state.errors.currentPassword[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input id="newPassword" name="newPassword" type="password" required />
                {state.errors?.newPassword && <p className="text-sm text-destructive">{state.errors.newPassword[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" required />
                {state.errors?.confirmPassword && <p className="text-sm text-destructive">{state.errors.confirmPassword[0]}</p>}
            </div>
            <SubmitButton text="Changer le mot de passe" loadingText="Changement..." />
        </form>
    );
}

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        setProfileLoading(true);
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  if (userLoading || profileLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="container py-8 text-center">
        <p>Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <UserIcon className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl font-bold font-headline">Mon Profil</h1>
            <p className="text-muted-foreground">Gérez les informations de votre compte.</p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
            <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileForm user={user} profile={profile} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Changer le mot de passe</CardTitle>
            <CardDescription>Mettez à jour votre mot de passe. Assurez-vous qu'il est sécurisé.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
