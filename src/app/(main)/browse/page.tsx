import Link from 'next/link';
import { School, GraduationCap, Building } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { levels } from '@/lib/data';
import { Breadcrumbs } from '@/components/breadcrumbs';

const levelIcons = {
  Primaire: School,
  Collège: Building,
  Lycée: GraduationCap,
};

export default function BrowseLevelsPage() {
  const breadcrumbItems = [{ label: 'Parcourir', href: '/browse' }];

  return (
    <div className="container py-8">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold font-headline mb-2">Parcourir le cursus</h1>
      <p className="text-muted-foreground mb-8">
        Sélectionnez un niveau pour commencer votre apprentissage.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => {
          const Icon = levelIcons[level.name as keyof typeof levelIcons] || School;
          return (
            <Link key={level.id} href={`/browse/${level.slug}`}>
              <Card className="h-full transition-all border-2 border-transparent hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="w-10 h-10 text-primary" />
                    <div>
                      <CardTitle className="font-headline text-2xl">{level.name}</CardTitle>
                      <CardDescription>{level.yearCount} années à explorer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
