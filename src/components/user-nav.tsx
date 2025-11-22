
'use client'

import Link from "next/link"
import {
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react"
import { useUser } from "@/firebase/auth/use-user"
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/config'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { getUserProfile } from "@/lib/firestore-data"
import { useEffect, useState } from "react"
import type { User } from "@/lib/types"


export function UserNav() {
  const { user, loading } = useUser();
  const [profile, setProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if(user) {
        setProfileLoading(true);
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
        setProfileLoading(false);
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  const handleSignOut = () => {
    signOut(auth);
  };

  if (loading || profileLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  if (!user || !profile) {
    return (
      <Button asChild>
        <Link href="/auth/login">Se connecter</Link>
      </Button>
    )
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`;
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
            <AvatarFallback>{getInitials(profile.firstName, profile.lastName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.firstName} {profile.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
          </Link>
          {profile.role === 'ADMIN' && (
            <Link href="/admin">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Admin Studio</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
