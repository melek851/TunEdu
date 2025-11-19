
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise } from './types';

export const levels: Level[] = [
  { id: 'primaire', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'college', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'lycee', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: '1ere-annee-p', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee', order: 1 },
  { id: '2eme-annee-p', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee', order: 2 },
  { id: '3eme-annee-p', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee', order: 3 },
  { id: '4eme-annee-p', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee', order: 4 },
  { id: '5eme-annee-p', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee', order: 5 },
  { id: '6eme-annee-p', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee', order: 6 },
  // Collège
  { id: '7eme-annee', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 7 },
  { id: '8eme-annee', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 8 },
  { id: '9eme-annee', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 9 },
  // Lycée
  { id: '1ere-annee-s', levelSlug: 'lycee', name: '1ère Année', slug: '1ere-annee-secondaire', order: 10 },
  { id: '2eme-annee-s', levelSlug: 'lycee', name: '2ème Année', slug: '2eme-annee-secondaire', order: 11 },
  { id: '3eme-annee-s', levelSlug: 'lycee', name: '3ème Année', slug: '3eme-annee-secondaire', order: 12 },
  { id: '4eme-annee-s', levelSlug: 'lycee', name: '4ème Année (BAC)', slug: '4eme-annee-secondaire', order: 13 },
];

export const subjects: Subject[] = [
  // Bac
  {
    id: 'math-bac',
    classYearSlug: '4eme-annee-secondaire',
    name: 'Mathématiques',
    slug: 'math-bac',
    description: "Analyse, algèbre, probabilités et géométrie pour préparer le baccalauréat.",
    manualUrl: '/manuals/manual_math_bac.pdf',
    thumbnailUrl: '/images/math.jpeg',
    thumbnailHint: 'abstract math'
  },
  {
    id: 'physique-chimie-bac',
    classYearSlug: '4eme-annee-secondaire',
    name: 'Physique-Chimie',
    slug: 'physique-chimie-bac',
    description: "Mécanique, électricité, chimie organique et inorganique pour le niveau terminal.",
    manualUrl: '/manuals/manual_physique_bac.pdf',
    thumbnailUrl: '/images/physics.jpeg',
    thumbnailHint: 'science lab'
  },
  {
    id: 'info-bac',
    classYearSlug: '4eme-annee-secondaire',
    name: 'Informatique',
    slug: 'informatique-bac',
    description: "Algorithmique, structures de données, bases de données et programmation.",
    manualUrl: '/manuals/manual_info_bac.pdf',
    thumbnailUrl: '/images/cs.jpeg',
    thumbnailHint: 'circuit board'
  },
  {
    id: 'francais-bac',
    classYearSlug: '4eme-annee-secondaire',
    name: 'Français',
    slug: 'francais-bac',
    description: "Étude d'œuvres littéraires, argumentation et techniques d'écriture.",
    manualUrl: '/manuals/manual_francais_bac.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/11/600/400',
    thumbnailHint: 'eiffel tower'
  },
];

export const lessons: Lesson[] = [
    // Math Bac
    {
        id: 'fonctions-log',
        subjectSlug: 'math-bac',
        title: 'Fonctions Logarithmes',
        slug: 'fonctions-logarithmes',
        summary: 'Étude complète de la fonction logarithme népérien et de ses propriétés.',
        order: 1,
        score: 125,
    },
    {
        id: 'fonctions-exp',
        subjectSlug: 'math-bac',
        title: 'Fonctions Exponentielles',
        slug: 'fonctions-exponentielles',
        summary: "Approfondissement de la fonction exponentielle, équations et inéquations.",
        order: 2,
        score: 98,
    },
    {
        id: 'suites-reelles',
        subjectSlug: 'math-bac',
        title: 'Suites Réelles',
        slug: 'suites-reelles',
        summary: "Convergence, divergence et étude des suites arithmétiques et géométriques.",
        order: 3,
        score: 110,
    },
    // Physique-Chimie Bac
    {
        id: 'dipole-rc',
        subjectSlug: 'physique-chimie-bac',
        title: 'Dipôle RC',
        slug: 'dipole-rc',
        summary: "Analyse du circuit RC, charge et décharge d'un condensateur.",
        order: 1,
        score: 150,
    },
    {
        id: 'cinetique-chimique',
        subjectSlug: 'physique-chimie-bac',
        title: 'Cinétique Chimique',
        slug: 'cinetique-chimique',
        summary: "Vitesse de réaction, facteurs cinétiques et suivi temporel.",
        order: 2,
        score: 130,
    },
];

export const recordedSessions: RecordedSession[] = [
    // Fonctions Log
    {
        id: 'log-session-1',
        lessonSlug: 'fonctions-logarithmes',
        title: 'Partie 1: Introduction et Propriétés',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        durationSeconds: 900
    },
    {
        id: 'log-session-2',
        lessonSlug: 'fonctions-logarithmes',
        title: 'Partie 2: Étude de la fonction et Limites',
        videoUrl: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU',
        durationSeconds: 1200
    },
    // Dipôle RC
    {
        id: 'rc-session-1',
        lessonSlug: 'dipole-rc',
        title: 'Charge du condensateur',
        videoUrl: 'https://www.youtube.com/watch?v=C-y70Z0v_sY',
        durationSeconds: 1100
    },
];

export const exercises: Exercise[] = [
    // Fonctions Log
    {
        id: 'ex-log-1',
        lessonSlug: 'fonctions-logarithmes',
        title: 'Exercices de base',
        description: 'Série d\'exercices sur les propriétés algébriques du logarithme.',
        fileUrl: '/exercises/log-ex1.pdf',
        difficulty: 'EASY'
    },
    {
        id: 'ex-log-2',
        lessonSlug: 'fonctions-logarithmes',
        title: 'Problèmes d\'analyse',
        description: 'Études de fonctions complètes et problèmes de synthèse.',
        fileUrl: '/exercises/log-ex2.pdf',
        difficulty: 'HARD'
    },
    // Dipôle RC
    {
        id: 'ex-rc-1',
        lessonSlug: 'dipole-rc',
        title: 'Circuit RC - Série 1',
        description: 'Exercices sur la charge et la décharge.',
        fileUrl: '/exercises/rc-ex1.pdf',
        difficulty: 'MEDIUM'
    },
];
