
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise } from './types';

export const levels: Level[] = [
  { id: 'primaire', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'college', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'lycee', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: 'p-1', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee', order: 1 },
  { id: 'p-2', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee', order: 2 },
  { id: 'p-3', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee', order: 3 },
  { id: 'p-4', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee', order: 4 },
  { id: 'p-5', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee', order: 5 },
  { id: 'p-6', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee', order: 6 },
  // Collège
  { id: 'c-7', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 7 },
  { id: 'c-8', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 8 },
  { id: 'c-9', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 9 },
  // Lycée
  { id: 'l-1', levelSlug: 'lycee', name: '1ère Année', slug: '1ere-annee-secondaire', order: 10 },
  { id: 'l-2', levelSlug: 'lycee', name: '2ème Année', slug: '2eme-annee-secondaire', order: 11 },
  { id: 'l-3', levelSlug: 'lycee', name: '3ème Année', slug: '3eme-annee-secondaire', order: 12 },
  { id: 'l-4', levelSlug: 'lycee', name: '4ème Année (BAC)', slug: '4eme-annee-bac', order: 13 },
];

export const subjects: Subject[] = [
    {
        id: 'math-bac',
        classYearSlug: '4eme-annee-bac',
        name: 'Mathématiques',
        slug: 'math-bac',
        description: 'Analyse, algèbre, géométrie et probabilités pour le baccalauréat.',
        manualUrl: '/manuals/math-bac.pdf',
        thumbnailUrl: 'https://picsum.photos/seed/math-bac/600/400',
        thumbnailHint: 'abstract math'
    },
    {
        id: 'physique-bac',
        classYearSlug: '4eme-annee-bac',
        name: 'Physique-Chimie',
        slug: 'physique-bac',
        description: 'Mécanique, électricité, chimie organique et inorganique.',
        manualUrl: '/manuals/physique-bac.pdf',
        thumbnailUrl: 'https://picsum.photos/seed/physique-bac/600/400',
        thumbnailHint: 'science lab'
    },
    {
        id: 'svt-bac',
        classYearSlug: '4eme-annee-bac',
        name: 'Sciences de la Vie et de la Terre',
        slug: 'svt-bac',
        description: 'Biologie cellulaire, génétique, géologie et écologie.',
        manualUrl: '/manuals/svt-bac.pdf',
        thumbnailUrl: 'https://picsum.photos/seed/svt-bac/600/400',
        thumbnailHint: 'nature dna'
    },
    {
        id: 'fr-bac',
        classYearSlug: '4eme-annee-bac',
        name: 'Français',
        slug: 'fr-bac',
        description: 'Étude de textes, argumentation et préparation à l\'épreuve de français.',
        manualUrl: '/manuals/fr-bac.pdf',
        thumbnailUrl: 'https://picsum.photos/seed/fr-bac/600/400',
        thumbnailHint: 'eiffel tower'
    },
    {
        id: 'info-bac',
        classYearSlug: '4eme-annee-bac',
        name: 'Informatique',
        slug: 'info-bac',
        description: 'Algorithmique, structures de données et bases de la programmation.',
        manualUrl: '/manuals/info-bac.pdf',
        thumbnailUrl: 'https://picsum.photos/seed/info-bac/600/400',
        thumbnailHint: 'circuit board'
    }
];

export const lessons: Lesson[] = [
    { 
        id: 'lesson-1', 
        subjectSlug: 'math-bac', 
        title: 'Fonctions Logarithmiques', 
        slug: 'fonctions-log', 
        summary: 'Étude complète des fonctions logarithmiques, propriétés et applications.', 
        order: 1,
        score: 42,
    },
    { 
        id: 'lesson-2', 
        subjectSlug: 'math-bac', 
        title: 'Nombres Complexes', 
        slug: 'nombres-complexes', 
        summary: 'Introduction aux nombres complexes, formes et opérations.', 
        order: 2,
        score: 35,
    },
    {
        id: 'lesson-3',
        subjectSlug: 'physique-bac',
        title: 'Dipôle RC',
        slug: 'dipole-rc',
        summary: 'Étude du circuit RC en régime transitoire et permanent.',
        order: 1,
        score: 58
    },
    {
        id: 'lesson-4',
        subjectSlug: 'svt-bac',
        title: 'La Mitose',
        slug: 'la-mitose',
        summary: 'Les étapes et l\'importance de la division cellulaire mitotique.',
        order: 1,
        score: 29
    },
    {
        id: 'lesson-5',
        subjectSlug: 'info-bac',
        title: 'Algorithmes Récursifs',
        slug: 'algo-recursifs',
        summary: 'Comprendre et appliquer la récursivité dans les algorithmes.',
        order: 1,
        score: 61
    }
];

export const recordedSessions: RecordedSession[] = [
    { 
        id: 'session-1',
        lessonSlug: 'fonctions-log',
        title: 'Session 1: Introduction et Propriétés',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 1800
    },
    {
        id: 'session-2',
        lessonSlug: 'nombres-complexes',
        title: 'Session 1: Forme algébrique et trigonométrique',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 2100
    },
    {
        id: 'session-3',
        lessonSlug: 'dipole-rc',
        title: 'Session 1: Charge et décharge d\'un condensateur',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 2400
    },
    {
        id: 'session-4',
        lessonSlug: 'la-mitose',
        title: 'Session 1: Les phases de la mitose',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 1600
    },
    {
        id: 'session-5',
        lessonSlug: 'algo-recursifs',
        title: 'Session 1: Penser récursif',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 1900
    },
    { 
        id: 'session-6',
        lessonSlug: 'fonctions-log',
        title: 'Session 2: Limites et Dérivées',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 2200
    },
    { 
        id: 'session-7',
        lessonSlug: 'nombres-complexes',
        title: 'Session 2: Module et Argument',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 1950
    },
    { 
        id: 'session-8',
        lessonSlug: 'dipole-rc',
        title: 'Session 2: Équations Différentielles',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 2500
    },
    { 
        id: 'session-9',
        lessonSlug: 'la-mitose',
        title: 'Session 2: Régulation du Cycle Cellulaire',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 1750
    },
    { 
        id: 'session-10',
        lessonSlug: 'algo-recursifs',
        title: 'Session 2: Exemples Pratiques',
        videoUrl: 'https://www.youtube.com/embed/kM8K0a0KxIw?si=Y8wRceBtFxzGBJpr',
        durationSeconds: 2050
    }
];

export const exercises: Exercise[] = [
    {
        id: 'ex-1',
        lessonSlug: 'fonctions-log',
        title: 'Série d\'exercices 1: Logarithme Népérien',
        description: 'Exercices de base sur les propriétés du ln.',
        fileUrl: '/exercises/serie-1-log.pdf',
        difficulty: 'EASY'
    },
    {
        id: 'ex-2',
        lessonSlug: 'fonctions-log',
        title: 'Série d\'exercices 2: Études de fonctions',
        description: 'Problèmes complets sur l\'étude de fonctions logarithmiques.',
        fileUrl: '/exercises/serie-2-log.pdf',
        difficulty: 'MEDIUM'
    }
];
