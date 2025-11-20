
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise } from './types';

export const levels: Level[] = [
  { id: 'primaire', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'college', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'lycee', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: '1ere-annee', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee', order: 1 },
  { id: '2eme-annee', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee', order: 2 },
  { id: '3eme-annee', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee', order: 3 },
  { id: '4eme-annee', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee', order: 4 },
  { id: '5eme-annee', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee', order: 5 },
  { id: '6eme-annee', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee', order: 6 },
  // Collège
  { id: '7eme-annee', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 7 },
  { id: '8eme-annee', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 8 },
  { id: '9eme-annee', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 9 },
  // Lycée
  { id: '1ere-annee-secondaire', levelSlug: 'lycee', name: '1ère Année', slug: '1ere-annee-secondaire', order: 10 },
  { id: '2eme-annee-secondaire', levelSlug: 'lycee', name: '2ème Année', slug: '2eme-annee-secondaire', order: 11 },
  { id: '3eme-annee-secondaire', levelSlug: 'lycee', name: '3ème Année', slug: '3eme-annee-secondaire', order: 12 },
  { id: 'baccalaureat', levelSlug: 'lycee', name: 'Baccalauréat', slug: 'baccalaureat', order: 13 },
];

export const subjects: Subject[] = [
  // 1ère Année Primaire
  { id: 'ar-1ere', classYearSlug: '1ere-annee', name: 'Lecture Arabe', slug: 'ar-1ere', description: 'Apprendre à lire et écrire les lettres arabes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/ar-1ere/600/400', thumbnailHint: 'arabic calligraphy' },
  { id: 'graph-1ere', classYearSlug: '1ere-annee', name: 'Graphisme', slug: 'graph-1ere', description: 'Développer la motricité fine à travers le dessin.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/graph-1ere/600/400', thumbnailHint: 'drawing kids' },
  { id: 'maths-1ere', classYearSlug: '1ere-annee', name: 'Mathématiques', slug: 'maths-1ere', description: 'Introduction aux nombres et aux formes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/maths-1ere/600/400', thumbnailHint: 'numbers shapes' },
  // 6ème Année Primaire
  { id: 'fr-6eme', classYearSlug: '6eme-annee', name: 'Français', slug: 'fr-6eme', description: 'Grammaire, conjugaison, et lecture de textes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/fr-6eme/600/400', thumbnailHint: 'french book' },
  { id: 'svt-6eme', classYearSlug: '6eme-annee', name: 'Sciences de la vie', slug: 'svt-6eme', description: 'Le corps humain et l\'environnement.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/svt-6eme/600/400', thumbnailHint: 'human anatomy' },
  { id: 'educ-civ-6eme', classYearSlug: '6eme-annee', name: 'Éducation civique', slug: 'educ-civ-6eme', description: 'Les droits et les devoirs du citoyen.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/educ-civ-6eme/600/400', thumbnailHint: 'tunisian flag' },
  // Baccalauréat
  { id: 'math-bac', classYearSlug: 'baccalaureat', name: 'Mathématiques', slug: 'math-bac', description: 'Analyse, algèbre, et probabilités pour le bac.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/math-bac/600/400', thumbnailHint: 'abstract math' },
  { id: 'physique-bac', classYearSlug: 'baccalaureat', name: 'Physique-Chimie', slug: 'physique-bac', description: 'Mécanique, électricité, et chimie organique.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/physique-bac/600/400', thumbnailHint: 'atom model' },
  { id: 'philo-bac', classYearSlug: 'baccalaureat', name: 'Philosophie', slug: 'philo-bac', description: 'Étude des grands courants de pensée.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/philo-bac/600/400', thumbnailHint: 'philosophy statue' },
];

export const lessons: Lesson[] = [
    // 1ère Année Primaire - Arabe
    { id: 'alif', subjectSlug: 'ar-1ere', title: 'La lettre Alif (أ)', slug: 'alif', summary: 'Apprendre à reconnaître, écrire et prononcer la lettre Alif.', order: 1, score: 85 },
    // 1ère Année Primaire - Graphisme
    { id: 'lignes-droites', subjectSlug: 'graph-1ere', title: 'Tracer des lignes droites', slug: 'lignes-droites', summary: 'Exercices pour maîtriser le tracé des lignes verticales et horizontales.', order: 1, score: 92 },
    // 1ère Année Primaire - Maths
    { id: 'compter-5', subjectSlug: 'maths-1ere', title: 'Compter jusqu\'à 5', slug: 'compter-5', summary: 'Introduction aux chiffres de 1 à 5 et au dénombrement.', order: 1, score: 78 },
    // 6ème Année Primaire - Français
    { id: 'passe-compose', subjectSlug: 'fr-6eme', title: 'Le passé composé', slug: 'passe-compose', summary: 'Formation et utilisation du passé composé avec les auxiliaires avoir et être.', order: 1, score: 88 },
    // 6ème Année Primaire - SVT
    { id: 'systeme-digestif', subjectSlug: 'svt-6eme', title: 'Le système digestif', slug: 'systeme-digestif', summary: 'Le trajet des aliments et la transformation en nutriments.', order: 1, score: 95 },
    // 6ème Année Primaire - Éducation civique
    { id: 'constitution-tunisienne', subjectSlug: 'educ-civ-6eme', title: 'La constitution tunisienne', slug: 'constitution-tunisienne', summary: 'Introduction aux principes fondamentaux de la constitution.', order: 1, score: 82 },
    // Baccalauréat - Mathématiques
    { id: 'fonctions-log', subjectSlug: 'math-bac', title: 'Fonctions Logarithmiques', slug: 'fonctions-log', summary: 'Étude complète de la fonction logarithme népérien.', order: 1, score: 90 },
    { id: 'nombres-complexes', subjectSlug: 'math-bac', title: 'Nombres Complexes', slug: 'nombres-complexes', summary: 'Forme algébrique, trigonométrique et exponentielle.', order: 2, score: 85 },
    // Baccalauréat - Physique
    { id: 'dipole-rc', subjectSlug: 'physique-bac', title: 'Le Dipôle RC', slug: 'dipole-rc', summary: 'Charge et décharge d\'un condensateur, équations différentielles.', order: 1, score: 88 },
    // Baccalauréat - Philosophie
    { id: 'liberte-bac', subjectSlug: 'philo-bac', title: 'La Liberté', slug: 'liberte-bac', summary: 'Analyse des concepts de liberté et de déterminisme.', order: 1, score: 76 },
];

export const recordedSessions: RecordedSession[] = [
  { id: 'session-alif', lessonSlug: 'alif', title: 'Session Vidéo pour La lettre Alif (أ)', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1200 },
  { id: 'session-lignes-droites', lessonSlug: 'lignes-droites', title: 'Session Vidéo pour Tracer des lignes droites', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1100 },
  { id: 'session-compter-5', lessonSlug: 'compter-5', title: 'Session Vidéo pour Compter jusqu\'à 5', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1300 },
  { id: 'session-passe-compose', lessonSlug: 'passe-compose', title: 'Session Vidéo pour Le passé composé', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2100 },
  { id: 'session-systeme-digestif', lessonSlug: 'systeme-digestif', title: 'Session Vidéo pour Le système digestif', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2400 },
  { id: 'session-constitution-tunisienne', lessonSlug: 'constitution-tunisienne', title: 'Session Vidéo pour La constitution tunisienne', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 2800 },
  { id: 'session-fonctions-log', lessonSlug: 'fonctions-log', title: 'Session Vidéo pour Fonctions Logarithmiques', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 3600 },
  { id: 'session-nombres-complexes', lessonSlug: 'nombres-complexes', title: 'Session Vidéo pour Nombres Complexes', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 3400 },
  { id: 'session-dipole-rc', lessonSlug: 'dipole-rc', title: 'Session Vidéo pour Le Dipôle RC', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 4000 },
  { id: 'session-liberte-bac', lessonSlug: 'liberte-bac', title: 'Session Vidéo pour La Liberté', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 3600 },
];

export const exercises: Exercise[] = [
  // 1ère Année
  { id: 'ex-alif-1', lessonSlug: 'alif', title: 'Écrire la lettre Alif', description: 'Entraînez-vous à écrire la lettre Alif sous toutes ses formes.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-lignes-1', lessonSlug: 'lignes-droites', title: 'Exercice de traçage', description: 'Suivez les pointillés pour tracer des lignes droites et des formes simples.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-compter-5-1', lessonSlug: 'compter-5', title: 'Compter les objets', description: 'Comptez les fruits dans chaque panier et écrivez le chiffre.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  // 6ème Année
  { id: 'ex-pc-1', lessonSlug: 'passe-compose', title: 'Conjugaison au passé composé', description: 'Mettez les verbes entre parenthèses au passé composé.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-digestif-1', lessonSlug: 'systeme-digestif', title: 'Schéma du système digestif', description: 'Légendez le schéma du système digestif humain.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-civique-1', lessonSlug: 'constitution-tunisienne', title: 'Questions sur la constitution', description: 'Répondez aux questions sur les droits et devoirs du citoyen.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  // Bac
  { id: 'ex-log-1', lessonSlug: 'fonctions-log', title: 'Étude de fonction Log', description: 'Étude complète d\'une fonction logarithmique avec tracé de courbe.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-complexes-1', lessonSlug: 'nombres-complexes', title: 'Opérations sur les complexes', description: 'Résolvez des équations et effectuez des opérations sur les nombres complexes.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-rc-1', lessonSlug: 'dipole-rc', title: 'Exercice sur le dipôle RC', description: 'Calculez la constante de temps et analysez la charge du condensateur.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-liberte-1', lessonSlug: 'liberte-bac', title: 'Dissertation philosophique', description: 'Rédigez une dissertation sur le sujet : "Sommes-nous réellement libres ?".', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
];

export const comments: Comment[] = [];
