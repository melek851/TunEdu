import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment, User, DashboardStats } from './types';
import { PlaceHolderImages } from './placeholder-images';

function getImage(id: string) {
    return PlaceHolderImages.find(p => p.id === id)?.imageUrl || 'https://placehold.co/600x400';
}
function getHint(id: string) {
    return PlaceHolderImages.find(p => p.id === id)?.imageHint || '';
}


// Mock Data
export const levels: Level[] = [
  { id: 'level-1', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'level-2', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'level-3', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: 'year-1', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee-p', order: 1 },
  { id: 'year-2', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee-p', order: 2 },
  { id: 'year-3', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee-p', order: 3 },
  { id: 'year-4', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee-p', order: 4 },
  { id: 'year-5', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee-p', order: 5 },
  { id: 'year-6', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee-p', order: 6 },
  // Collège
  { id: 'year-7', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 1 },
  { id: 'year-8', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 2 },
  { id: 'year-9', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 3 },
  // Lycée
  { id: 'year-10', levelSlug: 'lycee', name: '1ère Année', slug: '1ere-annee-s', order: 1 },
  { id: 'year-11', levelSlug: 'lycee', name: '2ème Année', slug: '2eme-annee-s', order: 2 },
  { id: 'year-12', levelSlug: 'lycee', name: '3ème Année', slug: '3eme-annee-s', order: 3 },
  { id: 'year-13', levelSlug: 'lycee', name: '4ème Année (Bac)', slug: 'bac', order: 4 },
];

export const subjects: Subject[] = [
    { 
        id: 'subj-math-bac', 
        classYearSlug: 'bac', 
        name: 'Mathématiques', 
        slug: 'math-bac',
        description: "Explorez les fonctions, les limites, les dérivés et les intégrales. Préparez-vous à l'épreuve de mathématiques du baccalauréat.",
        manualUrl: '/manuals/math-bac.pdf',
        thumbnailUrl: getImage('math-thumb'),
        thumbnailHint: getHint('math-thumb'),
    },
    { 
        id: 'subj-fr-9', 
        classYearSlug: '9eme-annee', 
        name: 'Français', 
        slug: 'fr-9',
        description: "Améliorez votre grammaire, conjugaison et compréhension de textes. Découvrez la littérature francophone.",
        manualUrl: '/manuals/fr-9.pdf',
        thumbnailUrl: getImage('french-thumb'),
        thumbnailHint: getHint('french-thumb'),
    },
    {
        id: 'subj-ar-1-p',
        classYearSlug: '1ere-annee-p',
        name: 'Arabe',
        slug: 'arabe-1-p',
        description: "Apprenez les bases de la lecture et de l'écriture en arabe.",
        manualUrl: '/manuals/ar-1-p.pdf',
        thumbnailUrl: getImage('arabic-thumb'),
        thumbnailHint: getHint('arabic-thumb'),
    },
    {
        id: 'subj-svt-bac',
        classYearSlug: 'bac',
        name: 'Sciences de la Vie et de la Terre',
        slug: 'svt-bac',
        description: "Plongez dans la biologie cellulaire, la génétique et la géologie pour le bac.",
        manualUrl: '/manuals/svt-bac.pdf',
        thumbnailUrl: getImage('science-thumb'),
        thumbnailHint: getHint('science-thumb'),
    },
    {
        id: 'subj-hist-8',
        classYearSlug: '8eme-annee',
        name: 'Histoire',
        slug: 'hist-8',
        description: "Découvrez l'histoire de la Tunisie et du monde à travers les âges.",
        manualUrl: '/manuals/hist-8.pdf',
        thumbnailUrl: getImage('history-thumb'),
        thumbnailHint: getHint('history-thumb'),
    },
    {
        id: 'subj-phy-bac',
        classYearSlug: 'bac',
        name: 'Physique-Chimie',
        slug: 'phy-chimie-bac',
        description: "Maîtrisez la mécanique, l'électricité et la chimie organique pour le bac.",
        manualUrl: '/manuals/phy-chimie-bac.pdf',
        thumbnailUrl: getImage('physics-thumb'),
        thumbnailHint: getHint('physics-thumb'),
    },
    {
        id: 'subj-info-bac',
        classYearSlug: 'bac',
        name: 'Informatique',
        slug: 'info-bac',
        description: "Apprenez l'algorithmique et la programmation Pascal pour l'épreuve du baccalauréat.",
        manualUrl: '/manuals/info-bac.pdf',
        thumbnailUrl: getImage('info-thumb'),
        thumbnailHint: getHint('info-thumb'),
    }
];

export const lessons: Lesson[] = [
    {
        id: 'lesson-1',
        subjectSlug: 'math-bac',
        title: 'Fonctions Logarithmiques',
        slug: 'fonctions-log',
        summary: 'Étude complète des fonctions logarithmiques, y compris les limites, les dérivés et les graphes.',
        order: 1,
        score: 125,
    },
    {
        id: 'lesson-2',
        subjectSlug: 'math-bac',
        title: 'Fonctions Exponentielles',
        slug: 'fonctions-exp',
        summary: 'Propriétés et applications des fonctions exponentielles.',
        order: 2,
        score: 98,
    },
    {
        id: 'lesson-3',
        subjectSlug: 'math-bac',
        title: 'Nombres Complexes',
        slug: 'complexes',
        summary: 'Introduction aux nombres complexes, forme algébrique, trigonométrique et exponentielle.',
        order: 3,
        score: 210,
    },
    {
        id: 'lesson-4',
        subjectSlug: 'fr-9',
        title: 'Le Schéma Narratif',
        slug: 'schema-narratif',
        summary: 'Comprendre les 5 étapes du schéma narratif pour analyser un récit.',
        order: 1,
        score: 45,
    }
];

export const recordedSessions: RecordedSession[] = [
    {
        id: 'session-1',
        lessonSlug: 'fonctions-log',
        title: 'Introduction aux Logarithmes',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
        durationSeconds: 15 * 60 + 32,
    },
    {
        id: 'session-2',
        lessonSlug: 'fonctions-log',
        title: 'Propriétés et Calculs',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        durationSeconds: 22 * 60 + 1,
    }
];

export const exercises: Exercise[] = [
    {
        id: 'ex-1',
        lessonSlug: 'fonctions-log',
        title: 'Série d\'exercices 1: Calculs de base',
        description: 'Exercices sur les propriétés fondamentales du logarithme népérien.',
        fileUrl: '/exercises/serie1-log.pdf',
        difficulty: 'EASY',
    },
     {
        id: 'ex-2',
        lessonSlug: 'fonctions-log',
        title: 'Série d\'exercices 2: Études de fonctions',
        description: 'Problèmes complets sur l\'étude de fonctions logarithmiques.',
        fileUrl: '/exercises/serie2-log.pdf',
        difficulty: 'MEDIUM',
    }
];

export const mockUser: User = {
  id: 'user-1',
  firstName: 'Med Alaa',
  lastName: 'Elabed',
  email: 'med.alaa.elabed@tuned.tn',
  role: 'STUDENT',
  avatarUrl: 'https://images.unsplash.com/photo-1707563050179-4ad36928a7e0?w=100&h=100&fit=crop',
};

export const comments: Comment[] = [
  {
    id: 'comment-1',
    lessonId: 'fonctions-log',
    user: {
      id: 'user-2',
      firstName: 'Fatma',
      lastName: 'Ben Ali',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    },
    body: "Merci beaucoup pour cette explication claire ! J'ai enfin compris la différence entre log et ln.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: 'comment-2',
    lessonId: 'fonctions-log',
    user: {
      id: 'user-3',
      firstName: 'Karim',
      lastName: 'Mansour',
    },
    body: "Est-ce qu'on pourrait avoir plus d'exercices sur les limites avec les fonctions log ?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    parentId: undefined,
  }
];

export const dashboardStats: DashboardStats = {
  timeTodaySeconds: 45 * 60, // 45 minutes
  lessonsViewed: 3,
  exercisesOpened: 2,
};
