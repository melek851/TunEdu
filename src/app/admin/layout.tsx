
'use client';

import { useUser } from '@/firebase/auth/use-user';
import { getUserProfile } from '@/lib/firestore-data';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';
import { Loader2, ShieldBan } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
      } else if (!userLoading) {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, [user, userLoading]);

  const isLoading = userLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Vérification de l'accès...</p>
      </div>
    );
  }

  if (profile?.role !== 'ADMIN') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <ShieldBan className="h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold font-headline">Accès Refusé</h1>
        <p className="max-w-md text-muted-foreground">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page. Veuillez contacter un administrateur si vous pensez qu'il s'agit d'une erreur.
        </p>
        <Button asChild>
            <Link href="/">Retourner au tableau de bord</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
