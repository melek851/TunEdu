
'use client'

import { ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { getAllSubjects, getUserDashboardStats } from '@/lib/firestore-data';
import Image from 'next/image';
import { useUser } from '@/firebase/auth/use-user';
import { useEffect, useState } from 'react';
import type { Subject, DashboardStats } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function StatCard({ title, value, icon: Icon, loading }: { title: string, value: string | number, icon: React.ElementType, loading: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetchedSubjects = await getAllSubjects();
      setSubjects(fetchedSubjects);
      if (user) {
        const userStats = await getUserDashboardStats(user.uid);
        setStats(userStats);
      }
      setLoading(false);
    }
    
    if (!userLoading) {
      fetchData();
    }
  }, [user, userLoading]);

  const statItems = [
    {
      title: "Temps passé aujourd'hui",
      getValue: (stats: DashboardStats | null) => `${Math.floor((stats?.timeTodaySeconds || 0) / 60)} min`,
      icon: Clock,
    },
    {
      title: "Leçons vues",
      getValue: (stats: DashboardStats | null) => stats?.lessonsViewed ?? 0,
      icon: BookOpen,
    },
    {
      title: "Exercices ouverts",
      getValue: (stats: DashboardStats | null) => stats?.exercisesOpened ?? 0,
      icon: FileText,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">Tableau de bord</h1>
      <p className="text-muted-foreground mb-8">Bienvenue ! Voici un résumé de votre activité.</p>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {statItems.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.getValue(stats)}
            icon={stat.icon}
            loading={userLoading || loading}
          />
        ))}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Continuer à apprendre</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(loading ? Array.from({ length: 3 }) : subjects.slice(0, 3)).map((subject, index) => (
            subject ? (
              <Card key={subject.id} className="overflow-hidden group">
                <Link href={`/subjects/${subject.slug}`} className="block">
                  <Image
                    src={subject.thumbnailUrl}
                    alt={subject.name}
                    width={600}
                    height={400}
                    className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                    data-ai-hint={subject.thumbnailHint}
                  />
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{subject.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Commencer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ) : (
               <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-40" />
                <CardHeader>
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                   <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardContent>
                   <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
