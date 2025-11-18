
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment, User, DashboardStats } from './types';

export const mockUser: User = {
  id: 'user-1',
  firstName: 'Med Alaa',
  lastName: 'Elabed',
  email: 'med.alaa.elabed@tuned.tn',
  role: 'STUDENT',
  avatarUrl: 'https://images.unsplash.com/photo-1707563050179-4ad36928a7e0?w=100&h=100&fit=crop',
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
  { id: 'year-3', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee-primaire', order: 3 },
  { id: 'year-4', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee-primaire', order: 4 },
  { id: 'year-5', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee-primaire', order: 5 },
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
  // --- 1ère Année Primaire ---
  {
    id: 'subj-p1-1',
    classYearSlug: '1ere-annee-primaire',
    name: 'Lecture (Arabe)',
    slug: 'lecture-ar-1ere',
    description: 'Apprentissage des lettres et des sons en Arabe.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/arabic-calligraphy/600/400',
    thumbnailHint: 'arabic calligraphy'
  },
  {
    id: 'subj-p1-2',
    classYearSlug: '1ere-annee-primaire',
    name: 'Écriture et Graphisme',
    slug: 'ecriture-1ere',
    description: 'Tenue du crayon et formation des lettres.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/pencil-writing/600/400',
    thumbnailHint: 'pencil writing'
  },
  {
    id: 'subj-p1-3',
    classYearSlug: '1ere-annee-primaire',
    name: 'Calcul',
    slug: 'calcul-1ere',
    description: 'Introduction aux nombres et aux opérations de base.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/abacus-counting/600/400',
    thumbnailHint: 'abacus numbers'
  },
  // --- 2ème Année Primaire ---
  {
    id: 'subj-p2-1',
    classYearSlug: '2eme-annee-primaire',
    name: 'Lecture (Arabe)',
    slug: 'lecture-ar-2eme',
    description: 'Lecture de phrases simples et de textes courts.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/child-reading-book/600/400',
    thumbnailHint: 'child reading'
  },
  {
    id: 'subj-p2-2',
    classYearSlug: '2eme-annee-primaire',
    name: 'Calcul',
    slug: 'calcul-2eme',
    description: 'Addition, soustraction et résolution de petits problèmes.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/math-blocks-kids/600/400',
    thumbnailHint: 'math blocks'
  },
  {
    id: 'subj-p2-3',
    classYearSlug: '2eme-annee-primaire',
    name: 'Éveil scientifique',
    slug: 'eveil-scientifique-2eme',
    description: 'Découverte du monde vivant et de la matière.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/plant-science-experiment/600/400',
    thumbnailHint: 'plant science'
  },
  // --- 3ème Année Primaire ---
  {
    id: 'subj-p3-1',
    classYearSlug: '3eme-annee-primaire',
    name: 'Français',
    slug: 'francais-3eme',
    description: 'Introduction à la langue française, lecture et écriture.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/eiffel-tower/600/400',
    thumbnailHint: 'eiffel tower'
  },
  {
    id: 'subj-p3-2',
    classYearSlug: '3eme-annee-primaire',
    name: 'Arabe',
    slug: 'arabe-3eme',
    description: 'Grammaire, conjugaison et lecture de textes variés.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/arabic-art/600/400',
    thumbnailHint: 'arabic calligraphy'
  },
  {
    id: 'subj-p3-3',
    classYearSlug: '3eme-annee-primaire',
    name: 'Mathématiques',
    slug: 'maths-3eme',
    description: 'Multiplication, division et introduction aux fractions.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/math-blackboard/600/400',
    thumbnailHint: 'abstract math'
  },
  // --- 4ème Année Primaire ---
  {
    id: 'subj-p4-1',
    classYearSlug: '4eme-annee-primaire',
    name: 'Français',
    slug: 'francais-4eme',
    description: 'Compréhension de textes, production écrite et grammaire.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/french-cafe/600/400',
    thumbnailHint: 'book cafe'
  },
  {
    id: 'subj-p4-2',
    classYearSlug: '4eme-annee-primaire',
    name: 'Mathématiques',
    slug: 'maths-4eme',
    description: 'Les nombres décimaux, la géométrie et les mesures.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/geometry-set/600/400',
    thumbnailHint: 'geometry compass'
  },
  {
    id: 'subj-p4-3',
    classYearSlug: '4eme-annee-primaire',
    name: 'Histoire-Géographie',
    slug: 'hist-geo-4eme',
    description: 'L\'histoire de la Tunisie et la géographie locale.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/old-tunisia-map/600/400',
    thumbnailHint: 'ancient map'
  },
  // --- 5ème Année Primaire ---
  {
    id: 'subj-p5-1',
    classYearSlug: '5eme-annee-primaire',
    name: 'Arabe',
    slug: 'arabe-5eme',
    description: 'Analyse de textes et notions de grammaire avancées.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/old-arabic-book/600/400',
    thumbnailHint: 'arabic script'
  },
  {
    id: 'subj-p5-2',
    classYearSlug: '5eme-annee-primaire',
    name: 'Français',
    slug: 'francais-5eme',
    description: 'Enrichissement du vocabulaire et structures complexes.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/old-french-book/600/400',
    thumbnailHint: 'dictionary book'
  },
  {
    id: 'subj-p5-3',
    classYearSlug: '5eme-annee-primaire',
    name: 'Sciences de la Vie',
    slug: 'svt-5eme',
    description: 'Le corps humain, la nutrition et l\'environnement.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/human-body-anatomy/600/400',
    thumbnailHint: 'human body'
  },
  // --- 6ème Année Primaire ---
  {
    id: 'subj-p6-1',
    classYearSlug: '6eme-annee-primaire',
    name: 'Éducation Civique',
    slug: 'civique-6eme',
    description: 'Droits, devoirs et institutions pour la préparation au concours.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/tunisian-parliament/600/400',
    thumbnailHint: 'public building'
  },
  {
    id: 'subj-p6-2',
    classYearSlug: '6eme-annee-primaire',
    name: 'Calcul',
    slug: 'calcul-6eme',
    description: 'Opérations et résolution de problèmes pour la 6ème année.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/math-problem-solving/600/400',
    thumbnailHint: 'math problems'
  },
  {
    id: 'subj-p6-3',
    classYearSlug: '6eme-annee-primaire',
    name: 'Français',
    slug: 'francais-6eme',
    description: 'Préparation à l\'examen de fin d\'études primaires.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/exam-stress/600/400',
    thumbnailHint: 'exam preparation'
  },
  // --- 7ème Année ---
  {
    id: 'subj-c7-1',
    classYearSlug: '7eme-annee',
    name: 'Anglais',
    slug: 'anglais-7eme',
    description: 'Introduction à la langue anglaise et à la culture anglophone.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/london-eye/600/400',
    thumbnailHint: 'london bridge'
  },
  {
    id: 'subj-c7-2',
    classYearSlug: '7eme-annee',
    name: 'Mathématiques',
    slug: 'maths-7eme',
    description: 'Algèbre, géométrie et introduction aux ensembles.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/algebra-formulas/600/400',
    thumbnailHint: 'abstract math'
  },
  {
    id: 'subj-c7-3',
    classYearSlug: '7eme-annee',
    name: 'Sciences Physiques',
    slug: 'physique-7eme',
    description: 'Introduction à la physique et la chimie.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/science-beakers/600/400',
    thumbnailHint: 'abstract physics'
  },
   // --- 8ème Année ---
  {
    id: 'subj-c8-1',
    classYearSlug: '8eme-annee',
    name: 'Français',
    slug: 'francais-8eme',
    description: 'Littérature, grammaire et expression écrite.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/victor-hugo/600/400',
    thumbnailHint: 'classic books'
  },
  {
    id: 'subj-c8-2',
    classYearSlug: '8eme-annee',
    name: 'Histoire',
    slug: 'histoire-8eme',
    description: 'Les civilisations anciennes et le Moyen Âge.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/roman-colosseum/600/400',
    thumbnailHint: 'ancient castle'
  },
  {
    id: 'subj-c8-3',
    classYearSlug: '8eme-annee',
    name: 'Informatique',
    slug: 'info-8eme',
    description: 'Initiation à l\'algorithmique et à la bureautique.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/computer-flowchart/600/400',
    thumbnailHint: 'circuit board'
  },
  // --- 9ème Année ---
  {
    id: 'subj-c9-1',
    classYearSlug: '9eme-annee',
    name: 'Français',
    slug: 'francais-9eme',
    description: 'Préparation au diplôme de fin d\'études de l\'enseignement de base.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/graduation-scroll/600/400',
    thumbnailHint: 'graduation diploma'
  },
  {
    id: 'subj-c9-2',
    classYearSlug: '9eme-annee',
    name: 'Mathématiques',
    slug: 'maths-9eme',
    description: 'Programme de mathématiques pour le concours de la 9ème année.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/math-competition/600/400',
    thumbnailHint: 'abstract math'
  },
  {
    id: 'subj-c9-3',
    classYearSlug: '9eme-annee',
    name: 'Sciences de la Vie et de la Terre',
    slug: 'svt-9eme',
    description: 'Biologie et géologie pour la préparation au diplôme.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/dna-helix/600/400',
    thumbnailHint: 'geology layers'
  },
  // --- 1ère Année Secondaire ---
  {
    id: 'subj-l1-1',
    classYearSlug: '1ere-annee-secondaire',
    name: 'Histoire',
    slug: 'histoire-1ere',
    description: 'Histoire du monde de l\'antiquité à l\'époque moderne.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/ancient-greece/600/400',
    thumbnailHint: 'ancient map'
  },
  {
    id: 'subj-l1-2',
    classYearSlug: '1ere-annee-secondaire',
    name: 'Géographie',
    slug: 'geo-1ere',
    description: 'Les grands ensembles géographiques mondiaux.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/satellite-view-earth/600/400',
    thumbnailHint: 'globe map'
  },
  {
    id: 'subj-l1-3',
    classYearSlug: '1ere-annee-secondaire',
    name: 'Physique-Chimie',
    slug: 'physique-chimie-1ere',
    description: 'Notions fondamentales en physique et chimie.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/atom-model/600/400',
    thumbnailHint: 'abstract physics'
  },
  // --- 2ème Année Secondaire ---
  {
    id: 'subj-l2-1',
    classYearSlug: '2eme-annee-secondaire',
    name: 'Économie',
    slug: 'economie-2eme',
    description: 'Principes fondamentaux de la microéconomie et de la macroéconomie.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/wall-street/600/400',
    thumbnailHint: 'stock market'
  },
  {
    id: 'subj-l2-2',
    classYearSlug: '2eme-annee-secondaire',
    name: 'Gestion',
    slug: 'gestion-2eme',
    description: 'Introduction aux principes de la gestion d\'entreprise.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/startup-meeting/600/400',
    thumbnailHint: 'business meeting'
  },
  {
    id: 'subj-l2-3',
    classYearSlug: '2eme-annee-secondaire',
    name: 'Technologie',
    slug: 'techno-2eme',
    description: 'Conception et fabrication assistées par ordinateur (CFAO).',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/industrial-robot/600/400',
    thumbnailHint: 'robot arm'
  },
  // --- 3ème Année Secondaire ---
  {
    id: 'subj-l3-1',
    classYearSlug: '3eme-annee-secondaire',
    name: 'Mathématiques (Sciences)',
    slug: 'maths-3eme-sciences',
    description: 'Analyse, algèbre et géométrie pour les sections scientifiques.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/calculus-formulas/600/400',
    thumbnailHint: 'abstract math'
  },
  {
    id: 'subj-l3-2',
    classYearSlug: '3eme-annee-secondaire',
    name: 'Algorithmique et Programmation',
    slug: 'algo-3eme',
    description: 'Structures de données et algorithmes avancés.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/python-code/600/400',
    thumbnailHint: 'programming code'
  },
  {
    id: 'subj-l3-3',
    classYearSlug: '3eme-annee-secondaire',
    name: 'Philosophie',
    slug: 'philo-3eme',
    description: 'Les grandes questions philosophiques et les auteurs majeurs.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/the-thinker-statue/600/400',
    thumbnailHint: 'greek statue'
  },
  // --- BAC (4ème Année) ---
  {
    id: 'subj-bac-1',
    classYearSlug: 'bac',
    name: 'Mathématiques',
    slug: 'maths-bac',
    description: 'Programme complet pour le Baccalauréat (toutes sections).',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/fractal-math/600/400',
    thumbnailHint: 'complex math'
  },
  {
    id: 'subj-bac-2',
    classYearSlug: 'bac',
    name: 'Physique-Chimie',
    slug: 'physique-chimie-bac',
    description: 'Programme de Physique et Chimie pour le Baccalauréat.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/particle-accelerator/600/400',
    thumbnailHint: 'science experiment'
  },
  {
    id: 'subj-bac-3',
    classYearSlug: 'bac',
    name: 'Informatique (Section Info)',
    slug: 'info-bac',
    description: 'Algorithmique et programmation pour le Bac Informatique.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/data-center/600/400',
    thumbnailHint: 'server room'
  },
  {
    id: 'subj-bac-4',
    classYearSlug: 'bac',
    name: 'Philosophie',
    slug: 'philo-bac',
    description: 'Les grands courants de la pensée philosophique pour le Bac.',
    manualUrl: '/sample.pdf',
    thumbnailUrl: 'https://picsum.photos/seed/library-of-alexandria/600/400',
    thumbnailHint: 'thinking statue'
  },
];


export const lessons: Lesson[] = [
  // Maths BAC
  { id: 'lesson-1', subjectSlug: 'maths-bac', title: 'Fonctions Logarithmiques', slug: 'fonctions-log', summary: 'Étude complète des fonctions logarithmiques.', order: 1, score: 125 },
  { id: 'lesson-2', subjectSlug: 'maths-bac', title: 'Nombres Complexes', slug: 'nombres-complexes', summary: 'Introduction aux nombres complexes et à leurs applications.', order: 2, score: 98 },
  { id: 'lesson-3', subjectSlug: 'maths-bac', title: 'Probabilités', slug: 'probabilites', summary: 'Probabilités conditionnelles et lois de probabilité.', order: 3, score: 150 },
  
  // Physique-Chimie BAC
  { id: 'lesson-4', subjectSlug: 'physique-chimie-bac', title: 'La Dipôle RC', slug: 'dipole-rc', summary: 'Analyse du comportement d\'un dipôle RC.', order: 1, score: 210 },
  { id: 'lesson-5', subjectSlug: 'physique-chimie-bac', title: 'Modulation et Démodulation', slug: 'modulation', summary: 'Principes de la modulation d\'amplitude.', order: 2, score: 180 },

  // Français 9ème
  { id: 'lesson-6', subjectSlug: 'francais-9eme', title: 'Le Discours Direct et Indirect', slug: 'discours-rapporte', summary: 'Maîtriser la transformation du discours.', order: 1, score: 55 },
  { id: 'lesson-7', subjectSlug: 'francais-9eme', title: 'Les figures de style', slug: 'figures-de-style', summary: 'Identifier et analyser les figures de style.', order: 2, score: 72 },

  // SVT 9ème
  { id: 'lesson-8', subjectSlug: 'svt-9eme', title: 'La transmission des caractères héréditaires', slug: 'genetique-9eme', summary: 'Introduction à la génétique et aux lois de Mendel.', order: 1, score: 110 },
  { id: 'lesson-9', subjectSlug: 'svt-9eme', title: 'Le système nerveux', slug: 'systeme-nerveux-9eme', summary: 'Organisation et fonctionnement du système nerveux.', order: 2, score: 95 },

  // Info 8ème
  { id: 'lesson-10', subjectSlug: 'info-8eme', title: 'Les Boucles', slug: 'boucles-algo', summary: 'Apprendre à utiliser les boucles (Pour, Tant que).', order: 1, score: 45 },
  { id: 'lesson-11', subjectSlug: 'info-8eme', title: 'Les Tableaux', slug: 'tableaux-algo', summary: 'Manipulation des tableaux à une dimension.', order: 2, score: 60 },

  // Maths 7ème
  { id: 'lesson-12', subjectSlug: 'maths-7eme', title: 'Les ensembles et les opérations', slug: 'ensembles-7eme', summary: 'Opérations sur les ensembles: intersection, union.', order: 1, score: 88 },
  { id: 'lesson-13', subjectSlug: 'maths-7eme', title: 'Angles et parallélisme', slug: 'angles-7eme', summary: 'Propriétés des angles et des droites parallèles.', order: 2, score: 78 },

  // Philo BAC
  { id: 'lesson-14', subjectSlug: 'philo-bac', title: 'La Conscience et l\'Inconscient', slug: 'conscience-inconscient-bac', summary: 'Analyse des théories de Freud et de ses critiques.', order: 1, score: 130 },
  { id: 'lesson-15', subjectSlug: 'philo-bac', title: 'La Liberté', slug: 'liberte-bac', summary: 'Le déterminisme contre le libre arbitre.', order: 2, score: 142 },

  // Economie 2ème
  { id: 'lesson-16', subjectSlug: 'economie-2eme', title: 'Le Marché', slug: 'marche-eco', summary: 'La loi de l\'offre et de la demande.', order: 1, score: 90 },

  // Calcul 1ère
  { id: 'lesson-17', subjectSlug: 'calcul-1ere', title: 'Les nombres jusqu\'à 10', slug: 'nombres-10', summary: 'Compter, lire et écrire les nombres de 1 à 10.', order: 1, score: 30 },
  { id: 'lesson-18', subjectSlug: 'calcul-1ere', title: 'L\'addition simple', slug: 'addition-simple', summary: 'Additionner deux nombres dont la somme est inférieure à 10.', order: 2, score: 40 },
];

export const recordedSessions: RecordedSession[] = [
  { id: 'session-1', lessonSlug: 'fonctions-log', title: 'Session 1: Introduction et Propriétés', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-2', lessonSlug: 'fonctions-log', title: 'Session 2: Exercices Corrigés', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2400 },
  { id: 'session-3', lessonSlug: 'dipole-rc', title: 'Session Vidéo Complète', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 3600 },
  { id: 'session-4', lessonSlug: 'nombres-complexes', title: 'Introduction aux nombres complexes', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2100 },
  { id: 'session-5', lessonSlug: 'probabilites', title: 'Probabilités Conditionnelles - Cours', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2000 },
  { id: 'session-6', lessonSlug: 'discours-rapporte', title: 'Leçon complète sur le discours rapporté', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1500 },
];

export const exercises: Exercise[] = [
  { id: 'ex-1', lessonSlug: 'fonctions-log', title: 'Série d\'exercices 1', description: 'Exercices de base sur les logarithmes.', fileUrl: '/sample.pdf', difficulty: 'EASY' },
  { id: 'ex-2', lessonSlug: 'fonctions-log', title: 'Problème de synthèse', description: 'Problème type bac.', fileUrl: '/sample.pdf', difficulty: 'HARD' },
  { id: 'ex-3', lessonSlug: 'dipole-rc', title: 'Série d\'exercices', description: 'Exercices sur la charge et décharge.', fileUrl: '/sample.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-4', lessonSlug: 'nombres-complexes', title: 'Exercices sur la forme algébrique', description: 'Calculs et manipulations de base.', fileUrl: '/sample.pdf', difficulty: 'EASY' },
  { id: 'ex-5', lessonSlug: 'genetique-9eme', title: 'Exercices sur les lois de Mendel', description: 'Croisements et analyse de résultats.', fileUrl: '/sample.pdf', difficulty: 'MEDIUM' },
];

export const comments: Comment[] = [
  { id: 'comment-1', user: mockUser, body: 'Merci beaucoup pour cette explication claire !', createdAt: 'Il y a 2 heures' },
  { id: 'comment-2', user: { id: 'user-2', firstName: 'Yassin', lastName: 'Abid', email: 'yassin.abid@tuned.tn', role: 'STUDENT' }, body: 'Est-ce qu\'on pourrait avoir plus d\'exercices sur les limites ?', createdAt: 'Il y a 1 jour' },
];

export const dashboardStats: DashboardStats = {
  timeTodaySeconds: 45 * 60, // 45 minutes
  lessonsViewed: 3,
  exercisesOpened: 2,
};

    

    
