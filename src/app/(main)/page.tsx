
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
import { getAllSubjects } from '@/lib/firestore-data';
import Image from 'next/image';

export default async function DashboardPage() {
  const subjects = await getAllSubjects();
  
  // Placeholder data for dashboard stats
  const dashboardStats = {
    timeTodaySeconds: 0,
    lessonsViewed: 0,
    exercisesOpened: 0,
  };

  const stats = [
    {
      title: "Temps passé aujourd'hui",
      value: `${Math.floor(dashboardStats.timeTodaySeconds / 60)} min`,
      icon: Clock,
    },
    {
      title: "Leçons vues",
      value: dashboardStats.lessonsViewed,
      icon: BookOpen,
    },
    {
      title: "Exercices ouverts",
      value: dashboardStats.exercisesOpened,
      icon: FileText,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">Tableau de bord</h1>
      <p className="text-muted-foreground mb-8">Bienvenue ! Voici un résumé de votre activité.</p>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Continuer à apprendre</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.slice(0, 3).map((subject) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
