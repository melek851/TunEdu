import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment, User, DashboardStats } from './types';

export const mockUser: User = {
  id: 'user-1',
  firstName: 'Ahmed',
  lastName: 'Cherif',
  email: 'ahmed.cherif@tuned.tn',
  role: 'STUDENT',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
};

export const levels: Level[] = [
  { id: 'level-1', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'level-2', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'level-3', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: 'year-1', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee-primaire', order: 1 },
  { id: 'year-2', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee-primaire', order: 2 },
  { id: 'year-6', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee-primaire', order: 6 },
  // Collège
  { id: 'year-7', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 1 },
  { id: 'year-8', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 2 },
  { id: 'year-9', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 3 },
  // Lycée
  { id: 'year-10', levelSlug: 'lycee', name: '1ère Année Secondaire', slug: '1ere-annee-secondaire', order: 1 },
  { id: 'year-11', levelSlug: 'lycee', name: '2ème Année Secondaire', slug: '2eme-annee-secondaire', order: 2 },
  { id: 'year-12', levelSlug: 'lycee', name: '3ème Année Secondaire', slug: '3eme-annee-secondaire', order: 3 },
  { id: 'year-13', levelSlug: 'lycee', name: '4ème Année (Bac)', slug: 'bac', order: 4 },
];

export const subjects: Subject[] = [
  { 
    id: 'subj-1', 
    classYearSlug: 'bac', 
    name: 'Mathématiques', 
    slug: 'maths-bac', 
    description: 'Programme complet de mathématiques pour la section Bac Sciences Expérimentales.', 
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&h=400&fit=crop',
    thumbnailHint: 'abstract math'
  },
  { 
    id: 'subj-2', 
    classYearSlug: 'bac', 
    name: 'Physique-Chimie', 
    slug: 'physique-chimie-bac', 
    description: 'Physique et Chimie pour la section Bac Sciences.', 
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574170623305-76d87a783241?q=80&w=600&h=400&fit=crop',
    thumbnailHint: 'atom model'
  },
  { 
    id: 'subj-3', 
    classYearSlug: 'bac', 
    name: 'Informatique', 
    slug: 'info-bac', 
    description: 'Algorithmique et programmation pour le Bac.', 
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&fit=crop',
    thumbnailHint: 'circuit board'
  },
  { 
    id: 'subj-4', 
    classYearSlug: '9eme-annee', 
    name: 'Français', 
    slug: 'francais-9eme', 
    description: 'Langue et littérature française pour la 9ème année.', 
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600&h=400&fit=crop',
    thumbnailHint: 'eiffel tower'
  },
  { 
    id: 'subj-5', 
    classYearSlug: '9eme-annee', 
    name: 'Arabe', 
    slug: 'arabe-9eme', 
    description: 'Langue et littérature Arabe pour la 9ème année.', 
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627490079334-135b9a702a4a?q=80&w=600&h=400&fit=crop',
    thumbnailHint: 'arabic calligraphy'
  },
];

export const lessons: Lesson[] = [
  { id: 'lesson-1', subjectSlug: 'maths-bac', title: 'Fonctions Logarithmiques', slug: 'fonctions-log', summary: 'Étude complète des fonctions logarithmiques.', order: 1, score: 125 },
  { id: 'lesson-2', subjectSlug: 'maths-bac', title: 'Nombres Complexes', slug: 'nombres-complexes', summary: 'Introduction aux nombres complexes et à leurs applications.', order: 2, score: 98 },
  { id: 'lesson-3', subjectSlug: 'physique-chimie-bac', title: 'La Dipôle RC', slug: 'dipole-rc', summary: 'Analyse du comportement d\'un dipôle RC.', order: 1, score: 210 },
  { id: 'lesson-4', subjectSlug: 'francais-9eme', title: 'Le Discours Direct et Indirect', slug: 'discours-rapporte', summary: 'Maîtriser la transformation du discours.', order: 1, score: 55 },
];

export const recordedSessions: RecordedSession[] = [
  { id: 'session-1', lessonSlug: 'fonctions-log', title: 'Session 1: Introduction et Propriétés', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-2', lessonSlug: 'fonctions-log', title: 'Session 2: Exercices Corrigés', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2400 },
  { id: 'session-3', lessonSlug: 'dipole-rc', title: 'Session Vidéo Complète', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 3600 },
];

export const exercises: Exercise[] = [
  { id: 'ex-1', lessonSlug: 'fonctions-log', title: 'Série d\'exercices 1', description: 'Exercices de base sur les logarithmes.', fileUrl: '/sample.pdf', difficulty: 'EASY' },
  { id: 'ex-2', lessonSlug: 'fonctions-log', title: 'Problème de synthèse', description: 'Problème type bac.', fileUrl: '/sample.pdf', difficulty: 'HARD' },
  { id: 'ex-3', lessonSlug: 'dipole-rc', title: 'Série d\'exercices', description: 'Exercices sur la charge et décharge.', fileUrl: '/sample.pdf', difficulty: 'MEDIUM' },
];

export const comments: Comment[] = [
  { id: 'comment-1', user: mockUser, body: 'Merci beaucoup pour cette explication claire !', createdAt: 'Il y a 2 heures' },
  { id: 'comment-2', user: { ...mockUser, id: 'user-2', firstName: 'Sarah', lastName: 'Ben Ali', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' }, body: 'Est-ce qu\'on pourrait avoir plus d\'exercices sur les limites ?', createdAt: 'Il y a 1 jour' },
];

export const dashboardStats: DashboardStats = {
  timeTodaySeconds: 45 * 60, // 45 minutes
  lessonsViewed: 3,
  exercisesOpened: 2,
};
