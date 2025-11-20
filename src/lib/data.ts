
import type { Level, ClassYear, Subject, Lesson, RecordedSession, Exercise, Comment } from './types';

// IMPORTANT: This file is intended for a one-time seeding operation.
// After running the seed command to add these sessions and exercises,
// you should restore the full data set to this file to avoid build errors.

export const levels: Level[] = [
  { id: 'level-1', name: 'Primaire', slug: 'primaire', order: 1, yearCount: 6 },
  { id: 'level-2', name: 'Collège', slug: 'college', order: 2, yearCount: 3 },
  { id: 'level-3', name: 'Lycée', slug: 'lycee', order: 3, yearCount: 4 },
];

export const classYears: ClassYear[] = [
  // Primaire
  { id: 'year-p1', levelSlug: 'primaire', name: '1ère Année', slug: '1ere-annee', order: 1 },
  { id: 'year-p2', levelSlug: 'primaire', name: '2ème Année', slug: '2eme-annee', order: 2 },
  { id: 'year-p3', levelSlug: 'primaire', name: '3ème Année', slug: '3eme-annee', order: 3 },
  { id: 'year-p4', levelSlug: 'primaire', name: '4ème Année', slug: '4eme-annee', order: 4 },
  { id: 'year-p5', levelSlug: 'primaire', name: '5ème Année', slug: '5eme-annee', order: 5 },
  { id: 'year-p6', levelSlug: 'primaire', name: '6ème Année', slug: '6eme-annee', order: 6 },
  // Collège
  { id: 'year-c7', levelSlug: 'college', name: '7ème Année', slug: '7eme-annee', order: 1 },
  { id: 'year-c8', levelSlug: 'college', name: '8ème Année', slug: '8eme-annee', order: 2 },
  { id: 'year-c9', levelSlug: 'college', name: '9ème Année', slug: '9eme-annee', order: 3 },
  // Lycée
  { id: 'year-l1', levelSlug: 'lycee', name: '1ère Année Secondaire', slug: '1ere-annee-secondaire', order: 1 },
  { id: 'year-l2', levelSlug: 'lycee', name: '2ème Année Secondaire', slug: '2eme-annee-secondaire', order: 2 },
  { id: 'year-l3', levelSlug: 'lycee', name: '3ème Année Secondaire', slug: '3eme-annee-secondaire', order: 3 },
  { id: 'year-l4', levelSlug: 'lycee', name: 'BAC (4ème)', slug: 'bac', order: 4 },
];

export const subjects: Subject[] = [
  // --- Primaire ---
  // 1ère Année
  { id: 'subj-p1-1', classYearSlug: '1ere-annee', name: 'Lecture (Arabe)', slug: 'lecture-ar-1ere', description: 'Apprentissage des lettres et des sons.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/arabic-calligraphy/600/400', thumbnailHint: 'arabic calligraphy' },
  { id: 'subj-p1-2', classYearSlug: '1ere-annee', name: 'Ecriture', slug: 'ecriture-1ere', description: 'Apprendre à bien former les lettres.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/writing-pencil/600/400', thumbnailHint: 'writing pencil' },
  { id: 'subj-p1-3', classYearSlug: '1ere-annee', name: 'Calcul', slug: 'calcul-1ere', description: 'Initiation aux nombres et aux opérations de base.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/abacus-math/600/400', thumbnailHint: 'abacus math' },
  // 2ème Année
  { id: 'subj-p2-1', classYearSlug: '2eme-annee', name: 'Lecture (Arabe)', slug: 'lecture-ar-2eme', description: 'Lecture de mots et de phrases simples.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/arabic-book/600/400', thumbnailHint: 'arabic book' },
  { id: 'subj-p2-2', classYearSlug: '2eme-annee', name: 'Calcul', slug: 'calcul-2eme', description: 'Additions, soustractions et problèmes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/math-blackboard/600/400', thumbnailHint: 'math blackboard' },
  { id: 'subj-p2-3', classYearSlug: '2eme-annee', name: 'Eveil scientifique', slug: 'eveil-scientifique-2eme', description: 'Découverte du monde du vivant et de la matière.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/science-leaf/600/400', thumbnailHint: 'science leaf' },
  // 3ème Année
  { id: 'subj-p3-1', classYearSlug: '3eme-annee', name: 'Français', slug: 'francais-3eme', description: 'Lecture, grammaire et expression orale.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/eiffel-tower/600/400', thumbnailHint: 'eiffel tower' },
  { id: 'subj-p3-2', classYearSlug: '3eme-annee', name: 'Langue Arabe', slug: 'arabe-3eme', description: 'Grammaire, conjugaison et vocabulaire.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/arabic-script/600/400', thumbnailHint: 'arabic script' },
  { id: 'subj-p3-3', classYearSlug: '3eme-annee', name: 'Mathématiques', slug: 'maths-3eme', description: 'Tables de multiplication et géométrie de base.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/math-compass/600/400', thumbnailHint: 'math compass' },
  // 4ème Année
  { id: 'subj-p4-1', classYearSlug: '4eme-annee', name: 'Français', slug: 'francais-4eme', description: 'Conjugaison (passé, futur), lecture de textes variés.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/french-cafe/600/400', thumbnailHint: 'french cafe' },
  { id: 'subj-p4-2', classYearSlug: '4eme-annee', name: 'Mathématiques', slug: 'maths-4eme', description: 'Fractions, divisions et résolution de problèmes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/math-equations/600/400', thumbnailHint: 'math equations' },
  { id: 'subj-p4-3', classYearSlug: '4eme-annee', name: 'Histoire & Géographie', slug: 'hist-geo-4eme', description: 'L\'histoire de la Tunisie et la géographie locale.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/ancient-map/600/400', thumbnailHint: 'ancient map' },
  // 5ème Année
  { id: 'subj-p5-1', classYearSlug: '5eme-annee', name: 'Langue Arabe', slug: 'arabe-5eme', description: 'Analyse grammaticale (I’rab) et production écrite.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/mosque-architecture/600/400', thumbnailHint: 'mosque architecture' },
  { id: 'subj-p5-2', classYearSlug: '5eme-annee', name: 'Français', slug: 'francais-5eme', description: 'Temps du récit, analyse de texte et expression écrite.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/louvre-museum/600/400', thumbnailHint: 'louvre museum' },
  { id: 'subj-p5-3', classYearSlug: '5eme-annee', name: 'Sciences de la vie et de la Terre', slug: 'svt-5eme', description: 'Le corps humain, les plantes, les écosystèmes.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/dna-helix/600/400', thumbnailHint: 'dna helix' },
  // 6ème Année
  { id: 'subj-p6-1', classYearSlug: '6eme-annee', name: 'Education civique', slug: 'civique-6eme', description: 'Les institutions de l\'état, les droits et les devoirs.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/tunisia-flag/600/400', thumbnailHint: 'tunisia flag' },
  { id: 'subj-p6-2', classYearSlug: '6eme-annee', name: 'Calcul', slug: 'calcul-6eme', description: 'Proportionnalité, pourcentages et aires.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/calculator-graphs/600/400', thumbnailHint: 'calculator graphs' },
  { id: 'subj-p6-3', classYearSlug: '6eme-annee', name: 'Français', slug: 'francais-6eme', description: 'Analyse de textes complexes et préparation au concours.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/paris-street/600/400', thumbnailHint: 'paris street' },

  // --- Collège ---
  // 7ème
  { id: 'subj-c7-1', classYearSlug: '7eme-annee', name: 'Anglais', slug: 'anglais-7eme', description: 'Bases de la langue anglaise.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/london-bridge/600/400', thumbnailHint: 'london bridge' },
  { id: 'subj-c7-2', classYearSlug: '7eme-annee', name: 'Mathématiques', slug: 'maths-7eme', description: 'Algèbre de base et géométrie.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/geometry-shapes/600/400', thumbnailHint: 'geometry shapes' },
  { id: 'subj-c7-3', classYearSlug: '7eme-annee', name: 'Sciences Physiques', slug: 'physique-7eme', description: 'Introduction à la physique et à la chimie.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/chemistry-beakers/600/400', thumbnailHint: 'chemistry beakers' },
  // 8ème
  { id: 'subj-c8-1', classYearSlug: '8eme-annee', name: 'Français', slug: 'francais-8eme', description: 'Étude de textes littéraires et argumentation.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/library-books/600/400', thumbnailHint: 'library books' },
  { id: 'subj-c8-2', classYearSlug: '8eme-annee', name: 'Histoire', slug: 'histoire-8eme', description: 'Le monde médiéval et les grandes civilisations.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/roman-colosseum/600/400', thumbnailHint: 'roman colosseum' },
  { id: 'subj-c8-3', classYearSlug: '8eme-annee', name: 'Informatique', slug: 'info-8eme', description: 'Algorithmique et introduction à la programmation.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/computer-code/600/400', thumbnailHint: 'computer code' },
  // 9ème
  { id: 'subj-c9-1', classYearSlug: '9eme-annee', name: 'Français', slug: 'francais-9eme', description: 'Analyse de textes, argumentation et préparation au brevet.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/writer-desk/600/400', thumbnailHint: 'writer desk' },
  { id: 'subj-c9-2', classYearSlug: '9eme-annee', name: 'Mathématiques', slug: 'maths-9eme', description: 'Fonctions, équations et géométrie dans l\'espace.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/graph-paper/600/400', thumbnailHint: 'graph paper' },
  { id: 'subj-c9-3', classYearSlug: '9eme-annee', name: 'SVT', slug: 'svt-9eme', description: 'Génétique, immunologie et géologie.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/microscope-slide/600/400', thumbnailHint: 'microscope slide' },

  // --- Lycée ---
  // 1ère
  { id: 'subj-l1-1', classYearSlug: '1ere-annee-secondaire', name: 'Histoire', slug: 'histoire-1ere', description: 'Le monde contemporain du 19ème siècle à nos jours.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/old-newspaper/600/400', thumbnailHint: 'old newspaper' },
  { id: 'subj-l1-2', classYearSlug: '1ere-annee-secondaire', name: 'Géographie', slug: 'geo-1ere', description: 'Les grands enjeux géopolitiques et environnementaux.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/world-globe/600/400', thumbnailHint: 'world globe' },
  { id: 'subj-l1-3', classYearSlug: '1ere-annee-secondaire', name: 'Physique-Chimie', slug: 'physique-chimie-1ere', description: 'Mécanique, électricité et chimie organique.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/physics-atoms/600/400', thumbnailHint: 'physics atoms' },
  // 2ème
  { id: 'subj-l2-1', classYearSlug: '2eme-annee-secondaire', name: 'Économie', slug: 'economie-2eme', description: 'Les grands courants de la pensée économique.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/stock-market/600/400', thumbnailHint: 'stock market' },
  { id: 'subj-l2-2', classYearSlug: '2eme-annee-secondaire', name: 'Gestion', slug: 'gestion-2eme', description: 'Management, marketing et comptabilité.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/business-meeting/600/400', thumbnailHint: 'business meeting' },
  { id: 'subj-l2-3', classYearSlug: '2eme-annee-secondaire', name: 'Technologie', slug: 'techno-2eme', description: 'Systèmes automatisés, robotique et conception.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/robotic-arm/600/400', thumbnailHint: 'robotic arm' },
  // 3ème
  { id: 'subj-l3-1', classYearSlug: '3eme-annee-secondaire', name: 'Mathématiques (Sciences)', slug: 'maths-3eme-sciences', description: 'Analyse, probabilités et géométrie complexe.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/fractal-art/600/400', thumbnailHint: 'fractal art' },
  { id: 'subj-l3-2', classYearSlug: '3eme-annee-secondaire', name: 'Algorithmique & Programmation', slug: 'algo-3eme', description: 'Structures de données avancées et paradigmes de programmation.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/binary-code/600/400', thumbnailHint: 'binary code' },
  { id: 'subj-l3-3', classYearSlug: '3eme-annee-secondaire', name: 'Philosophie', slug: 'philo-3eme', description: 'La métaphysique, l\'éthique et la philosophie politique.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/greek-statue/600/400', thumbnailHint: 'greek statue' },
  // BAC
  { id: 'subj-bac-1', classYearSlug: 'bac', name: 'Mathématiques', slug: 'maths-bac', description: 'Préparation intensive pour l\'épreuve du baccalauréat.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/abstract-math/600/400', thumbnailHint: 'abstract math' },
  { id: 'subj-bac-2', classYearSlug: 'bac', name: 'Physique-Chimie', slug: 'physique-chimie-bac', description: 'Révisions complètes du programme et annales.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/science-lab/600/400', thumbnailHint: 'science lab' },
  { id: 'subj-bac-3', classYearSlug: 'bac', name: 'Informatique', slug: 'info-bac', description: 'Algorithmique avancée, structures de données et bases de données.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/circuit-board/600/400', thumbnailHint: 'circuit board' },
  { id: 'subj-bac-4', classYearSlug: 'bac', name: 'Philosophie', slug: 'philo-bac', description: 'Analyse des notions clés du programme et méthodologie de la dissertation.', manualUrl: '/manuals/placeholder.pdf', thumbnailUrl: 'https://picsum.photos/seed/philosophy-book/600/400', thumbnailHint: 'philosophy book' },
];

export const lessons: Lesson[] = [
  // --- Primaire ---
  // 1ère
  { id: 'lesson-p1-1', subjectSlug: 'lecture-ar-1ere', title: 'La lettre Alif (أ)', slug: 'alif', summary: 'Apprendre à reconnaître et prononcer la lettre Alif.', order: 1, score: 10 },
  { id: 'lesson-p1-2', subjectSlug: 'ecriture-1ere', title: 'Tracer des lignes droites', slug: 'lignes-droites', summary: 'Exercices de graphisme pour s\'habituer à tenir le crayon.', order: 1, score: 8 },
  { id: 'lesson-p1-3', subjectSlug: 'calcul-1ere', title: 'Compter jusqu\'à 5', slug: 'compter-5', summary: 'Apprendre à compter et reconnaître les chiffres jusqu\'à 5.', order: 1, score: 12 },
  // 2ème
  { id: 'lesson-p2-1', subjectSlug: 'lecture-ar-2eme', title: 'Lire des mots de 3 lettres', slug: 'mots-3-lettres', summary: 'Combiner des lettres pour lire des mots simples.', order: 1, score: 15 },
  { id: 'lesson-p2-2', subjectSlug: 'calcul-2eme', title: 'L\'addition simple', slug: 'addition-simple-2eme', summary: 'Apprendre à faire des additions sans retenue.', order: 1, score: 18 },
  { id: 'lesson-p2-3', subjectSlug: 'eveil-scientifique-2eme', title: 'Les états de l\'eau', slug: 'etats-eau', summary: 'Découvrir les états solide, liquide et gazeux.', order: 1, score: 14 },
  // 3ème
  { id: 'lesson-p3-1', subjectSlug: 'francais-3eme', title: 'Se présenter', slug: 'se-presenter', summary: 'Apprendre les phrases de base pour se présenter en français.', order: 1, score: 20 },
  { id: 'lesson-p3-2', subjectSlug: 'arabe-3eme', title: 'Le nom et le verbe', slug: 'nom-verbe', summary: 'Distinguer entre un nom et un verbe dans une phrase.', order: 1, score: 22 },
  { id: 'lesson-p3-3', subjectSlug: 'maths-3eme', title: 'La table de multiplication de 2', slug: 'table-2', summary: 'Mémoriser et appliquer la table de multiplication de 2.', order: 1, score: 25 },
  // 4ème
  { id: 'lesson-p4-1', subjectSlug: 'francais-4eme', title: 'Le passé composé', slug: 'passe-compose', summary: 'Conjuguer les verbes du premier groupe au passé composé.', order: 1, score: 30 },
  { id: 'lesson-p4-2', subjectSlug: 'maths-4eme', title: 'Les fractions simples', slug: 'fractions-simples', summary: 'Comprendre et représenter les fractions.', order: 1, score: 35 },
  { id: 'lesson-p4-3', subjectSlug: 'hist-geo-4eme', title: 'Carthage', slug: 'carthage', summary: 'L\'histoire de la civilisation carthaginoise.', order: 1, score: 28 },
  // 5ème
  { id: 'lesson-p5-1', subjectSlug: 'arabe-5eme', title: 'L\'analyse grammaticale (I’rab)', slug: 'irab-simple', summary: 'Introduction à l\'analyse grammaticale simple.', order: 1, score: 40 },
  { id: 'lesson-p5-2', subjectSlug: 'francais-5eme', title: 'Le futur simple', slug: 'futur-simple', summary: 'Formation et utilisation du futur simple.', order: 1, score: 38 },
  { id: 'lesson-p5-3', subjectSlug: 'svt-5eme', title: 'Le système digestif', slug: 'systeme-digestif', summary: 'Le trajet des aliments dans le corps humain.', order: 1, score: 42 },
  // 6ème
  { id: 'lesson-p6-1', subjectSlug: 'civique-6eme', title: 'La constitution tunisienne', slug: 'constitution-tunisienne', summary: 'Les grands principes de la constitution.', order: 1, score: 45 },
  { id: 'lesson-p6-2', subjectSlug: 'calcul-6eme', title: 'La règle de trois', slug: 'regle-de-trois', summary: 'Résoudre des problèmes de proportionnalité.', order: 1, score: 50 },
  { id: 'lesson-p6-3', subjectSlug: 'francais-6eme', title: 'Analyse d\'un texte narratif', slug: 'texte-narratif', summary: 'Structure et caractéristiques du texte narratif.', order: 1, score: 48 },

  // --- Collège ---
  // 7ème
  { id: 'lesson-c7-1', subjectSlug: 'anglais-7eme', title: 'Greetings and Introductions', slug: 'greetings-7eme', summary: 'Learn basic English greetings.', order: 1, score: 30 },
  { id: 'lesson-c7-2', subjectSlug: 'maths-7eme', title: 'Les ensembles et les opérations', slug: 'ensembles-7eme', summary: 'Opérations sur les ensembles: intersection, union.', order: 1, score: 88 },
  { id: 'lesson-c7-3', subjectSlug: 'physique-7eme', title: 'La mesure de volume', slug: 'mesure-volume', summary: 'Utiliser une éprouvette graduée.', order: 1, score: 35 },
  // 8ème
  { id: 'lesson-c8-1', subjectSlug: 'francais-8eme', title: 'La description', slug: 'description-8eme', summary: 'Apprendre à décrire un lieu, un objet, une personne.', order: 1, score: 40 },
  { id: 'lesson-c8-2', subjectSlug: 'histoire-8eme', title: 'La civilisation islamique', slug: 'civilisation-islamique', summary: 'L\'âge d\'or de la civilisation islamique.', order: 1, score: 45 },
  { id: 'lesson-c8-3', subjectSlug: 'info-8eme', title: 'Les Boucles', slug: 'boucles-algo', summary: 'Apprendre à utiliser les boucles (Pour, Tant que).', order: 1, score: 45 },
  // 9ème
  { id: 'lesson-c9-1', subjectSlug: 'francais-9eme', title: 'Le Discours Direct et Indirect', slug: 'discours-rapporte', summary: 'Maîtriser la transformation du discours.', order: 1, score: 55 },
  { id: 'lesson-c9-2', subjectSlug: 'francais-9eme', title: 'Les figures de style', slug: 'figures-de-style', summary: 'Identifier et analyser les figures de style.', order: 2, score: 72 },
  { id: 'lesson-c9-3', subjectSlug: 'maths-9eme', title: 'Les équations du premier degré', slug: 'equations-9eme', summary: 'Résolution d\'équations à une inconnue.', order: 1, score: 60 },
  { id: 'lesson-c9-4', subjectSlug: 'svt-9eme', title: 'La transmission des caractères héréditaires', slug: 'genetique-9eme', summary: 'Introduction à la génétique et aux lois de Mendel.', order: 1, score: 110 },
  { id: 'lesson-c9-5', subjectSlug: 'svt-9eme', title: 'Le système nerveux', slug: 'systeme-nerveux-9eme', summary: 'Organisation et fonctionnement du système nerveux.', order: 2, score: 95 },

  // --- Lycée ---
  // 1ère
  { id: 'lesson-l1-1', subjectSlug: 'histoire-1ere', title: 'La Renaissance en Europe', slug: 'renaissance-europe', summary: 'Les grandes découvertes et les changements culturels.', order: 1, score: 65 },
  { id: 'lesson-l1-2', subjectSlug: 'geo-1ere', title: 'Les climats dans le monde', slug: 'climats-monde', summary: 'Les facteurs et la répartition des grands domaines climatiques.', order: 1, score: 60 },
  { id: 'lesson-l1-3', subjectSlug: 'physique-chimie-1ere', title: 'L\'atome', slug: 'atome-1ere', summary: 'Modèles atomiques et structure de l\'atome.', order: 1, score: 70 },
  // 2ème
  { id: 'lesson-l2-1', subjectSlug: 'economie-2eme', title: 'Le Marché', slug: 'marche-eco', summary: 'La loi de l\'offre et de la demande.', order: 1, score: 90 },
  { id: 'lesson-l2-2', subjectSlug: 'gestion-2eme', title: 'L\'entreprise et son environnement', slug: 'entreprise-env', summary: 'Les différentes composantes de l\'environnement de l\'entreprise.', order: 1, score: 85 },
  { id: 'lesson-l2-3', subjectSlug: 'techno-2eme', title: 'Introduction à la CAO', slug: 'cao-2eme', summary: 'Principes de base de la Conception Assistée par Ordinateur.', order: 1, score: 75 },
  // 3ème
  { id: 'lesson-l3-1', subjectSlug: 'maths-3eme-sciences', title: 'Les limites de fonctions', slug: 'limites-3eme', summary: 'Calcul des limites et formes indéterminées.', order: 1, score: 100 },
  { id: 'lesson-l3-2', subjectSlug: 'algo-3eme', title: 'Les pointeurs et l\'allocation dynamique', slug: 'pointeurs-3eme', summary: 'Manipulation de la mémoire en C/Pascal.', order: 1, score: 95 },
  { id: 'lesson-l3-3', subjectSlug: 'philo-3eme', title: 'La raison et le réel', slug: 'raison-reel', summary: 'Introduction à l\'épistémologie.', order: 1, score: 80 },

  // BAC
  { id: 'lesson-bac-1', subjectSlug: 'maths-bac', title: 'Fonctions Logarithmiques', slug: 'fonctions-log', summary: 'Étude complète des fonctions logarithmiques.', order: 1, score: 125 },
  { id: 'lesson-bac-2', subjectSlug: 'maths-bac', title: 'Nombres Complexes', slug: 'nombres-complexes', summary: 'Introduction aux nombres complexes et à leurs applications.', order: 2, score: 98 },
  { id: 'lesson-bac-3', subjectSlug: 'maths-bac', title: 'Probabilités', slug: 'probabilites', summary: 'Probabilités conditionnelles et lois de probabilité.', order: 3, score: 150 },
  { id: 'lesson-bac-4', subjectSlug: 'physique-chimie-bac', title: 'La Dipôle RC', slug: 'dipole-rc', summary: 'Analyse du comportement d\'un dipôle RC.', order: 1, score: 210 },
  { id: 'lesson-bac-5', subjectSlug: 'physique-chimie-bac', title: 'Modulation et Démodulation', slug: 'modulation', summary: 'Principes de la modulation d\'amplitude.', order: 2, score: 180 },
  { id: 'lesson-bac-6', subjectSlug: 'info-bac', title: 'Les Graphes', slug: 'graphes-bac', summary: 'Théorie des graphes et algorithmes associés (Parcours, Dijkstra).', order: 1, score: 160 },
  { id: 'lesson-bac-7', subjectSlug: 'philo-bac', title: 'La Conscience et l\'Inconscient', slug: 'conscience-inconscient-bac', summary: 'Analyse des théories de Freud et de ses critiques.', order: 1, score: 130 },
  { id: 'lesson-bac-8', subjectSlug: 'philo-bac', title: 'La Liberté', slug: 'liberte-bac', summary: 'Le déterminisme contre le libre arbitre.', order: 2, score: 142 },
];


export const recordedSessions: RecordedSession[] = [
  { id: 'session-alif', lessonSlug: 'alif', title: 'Session Vidéo pour La lettre Alif (أ)', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-lignes-droites', lessonSlug: 'lignes-droites', title: 'Session Vidéo pour Tracer des lignes droites', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-compter-5', lessonSlug: 'compter-5', title: 'Session Vidéo pour Compter jusqu\'à 5', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-mots-3-lettres', lessonSlug: 'mots-3-lettres', title: 'Session Vidéo pour Lire des mots de 3 lettres', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-addition-simple-2eme', lessonSlug: 'addition-simple-2eme', title: 'Session Vidéo pour L\'addition simple', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-etats-eau', lessonSlug: 'etats-eau', title: 'Session Vidéo pour Les états de l\'eau', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-se-presenter', lessonSlug: 'se-presenter', title: 'Session Vidéo pour Se présenter', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-nom-verbe', lessonSlug: 'nom-verbe', title: 'Session Vidéo pour Le nom et le verbe', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-table-2', lessonSlug: 'table-2', title: 'Session Vidéo pour La table de multiplication de 2', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-passe-compose', lessonSlug: 'passe-compose', title: 'Session Vidéo pour Le passé composé', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-fractions-simples', lessonSlug: 'fractions-simples', title: 'Session Vidéo pour Les fractions simples', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-carthage', lessonSlug: 'carthage', title: 'Session Vidéo pour Carthage', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-irab-simple', lessonSlug: 'irab-simple', title: 'Session Vidéo pour L\'analyse grammaticale (I’rab)', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-futur-simple', lessonSlug: 'futur-simple', title: 'Session Vidéo pour Le futur simple', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-systeme-digestif', lessonSlug: 'systeme-digestif', title: 'Session Vidéo pour Le système digestif', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-constitution-tunisienne', lessonSlug: 'constitution-tunisienne', title: 'Session Vidéo pour La constitution tunisienne', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-regle-de-trois', lessonSlug: 'regle-de-trois', title: 'Session Vidéo pour La règle de trois', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-texte-narratif', lessonSlug: 'texte-narratif', title: 'Session Vidéo pour Analyse d\'un texte narratif', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-greetings-7eme', lessonSlug: 'greetings-7eme', title: 'Session Vidéo pour Greetings and Introductions', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-ensembles-7eme', lessonSlug: 'ensembles-7eme', title: 'Session Vidéo pour Les ensembles et les opérations', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-mesure-volume', lessonSlug: 'mesure-volume', title: 'Session Vidéo pour La mesure de volume', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-description-8eme', lessonSlug: 'description-8eme', title: 'Session Vidéo pour La description', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-civilisation-islamique', lessonSlug: 'civilisation-islamique', title: 'Session Vidéo pour La civilisation islamique', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-boucles-algo', lessonSlug: 'boucles-algo', title: 'Session Vidéo pour Les Boucles', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-discours-rapporte', lessonSlug: 'discours-rapporte', title: 'Session Vidéo pour Le Discours Direct et Indirect', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-figures-de-style', lessonSlug: 'figures-de-style', title: 'Session Vidéo pour Les figures de style', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-equations-9eme', lessonSlug: 'equations-9eme', title: 'Session Vidéo pour Les équations du premier degré', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-genetique-9eme', lessonSlug: 'genetique-9eme', title: 'Session Vidéo pour La transmission des caractères héréditaires', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-systeme-nerveux-9eme', lessonSlug: 'systeme-nerveux-9eme', title: 'Session Vidéo pour Le système nerveux', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-renaissance-europe', lessonSlug: 'renaissance-europe', title: 'Session Vidéo pour La Renaissance en Europe', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-climats-monde', lessonSlug: 'climats-monde', title: 'Session Vidéo pour Les climats dans le monde', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-atome-1ere', lessonSlug: 'atome-1ere', title: 'Session Vidéo pour L\'atome', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-marche-eco', lessonSlug: 'marche-eco', title: 'Session Vidéo pour Le Marché', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-entreprise-env', lessonSlug: 'entreprise-env', title: 'Session Vidéo pour L\'entreprise et son environnement', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-cao-2eme', lessonSlug: 'cao-2eme', title: 'Session Vidéo pour Introduction à la CAO', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-limites-3eme', lessonSlug: 'limites-3eme', title: 'Session Vidéo pour Les limites de fonctions', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-pointeurs-3eme', lessonSlug: 'pointeurs-3eme', title: 'Session Vidéo pour Les pointeurs et l\'allocation dynamique', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-raison-reel', lessonSlug: 'raison-reel', title: 'Session Vidéo pour La raison et le réel', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-fonctions-log', lessonSlug: 'fonctions-log', title: 'Session Vidéo pour Fonctions Logarithmiques', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-nombres-complexes', lessonSlug: 'nombres-complexes', title: 'Session Vidéo pour Nombres Complexes', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-probabilites', lessonSlug: 'probabilites', title: 'Session Vidéo pour Probabilités', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-dipole-rc', lessonSlug: 'dipole-rc', title: 'Session Vidéo pour La Dipôle RC', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-modulation', lessonSlug: 'modulation', title: 'Session Vidéo pour Modulation et Démodulation', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-graphes-bac', lessonSlug: 'graphes-bac', title: 'Session Vidéo pour Les Graphes', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-conscience-inconscient-bac', lessonSlug: 'conscience-inconscient-bac', title: 'Session Vidéo pour La Conscience et l\'Inconscient', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
  { id: 'session-liberte-bac', lessonSlug: 'liberte-bac', title: 'Session Vidéo pour La Liberté', videoUrl: 'https://www.youtube.com/embed/k9zY1lplD9c', durationSeconds: 1800 },
];

export const exercises: Exercise[] = [
  // Primaire
  { id: 'ex-alif-1', lessonSlug: 'alif', title: 'Exercices sur la lettre Alif', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-lignes-droites-1', lessonSlug: 'lignes-droites', title: 'Exercices sur le traçage', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-compter-5-1', lessonSlug: 'compter-5', title: 'Exercices pour compter jusqu\'à 5', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-mots-3-lettres-1', lessonSlug: 'mots-3-lettres', title: 'Exercices de lecture de mots', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-addition-simple-2eme-1', lessonSlug: 'addition-simple-2eme', title: 'Exercices d\'addition', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-etats-eau-1', lessonSlug: 'etats-eau', title: 'Exercices sur les états de l\'eau', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-se-presenter-1', lessonSlug: 'se-presenter', title: 'Exercices pour se présenter', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-nom-verbe-1', lessonSlug: 'nom-verbe', title: 'Exercices sur le nom et le verbe', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-table-2-1', lessonSlug: 'table-2', title: 'Exercices sur la table de 2', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-passe-compose-1', lessonSlug: 'passe-compose', title: 'Exercices sur le passé composé', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-fractions-simples-1', lessonSlug: 'fractions-simples', title: 'Exercices sur les fractions', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-carthage-1', lessonSlug: 'carthage', title: 'Exercices sur Carthage', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-irab-simple-1', lessonSlug: 'irab-simple', title: 'Exercices d\'I\'rab', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-futur-simple-1', lessonSlug: 'futur-simple', title: 'Exercices sur le futur simple', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-systeme-digestif-1', lessonSlug: 'systeme-digestif', title: 'Exercices sur le système digestif', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-constitution-tunisienne-1', lessonSlug: 'constitution-tunisienne', title: 'Exercices sur la constitution', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-regle-de-trois-1', lessonSlug: 'regle-de-trois', title: 'Exercices sur la règle de trois', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-texte-narratif-1', lessonSlug: 'texte-narratif', title: 'Exercices sur le texte narratif', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  // Collège
  { id: 'ex-greetings-7eme-1', lessonSlug: 'greetings-7eme', title: 'Exercises on Greetings', description: 'Application exercises.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'EASY' },
  { id: 'ex-ensembles-7eme-1', lessonSlug: 'ensembles-7eme', title: 'Exercices sur les ensembles', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-mesure-volume-1', lessonSlug: 'mesure-volume', title: 'Exercices de mesure de volume', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-description-8eme-1', lessonSlug: 'description-8eme', title: 'Exercices de description', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-civilisation-islamique-1', lessonSlug: 'civilisation-islamique', title: 'Exercices sur la civilisation islamique', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-boucles-algo-1', lessonSlug: 'boucles-algo', title: 'Exercices sur les boucles', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'MEDIUM' },
  { id: 'ex-discours-rapporte-1', lessonSlug: 'discours-rapporte', title: 'Exercices sur le discours rapporté', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-figures-de-style-1', lessonSlug: 'figures-de-style', title: 'Exercices sur les figures de style', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-equations-9eme-1', lessonSlug: 'equations-9eme', title: 'Exercices sur les équations', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-genetique-9eme-1', lessonSlug: 'genetique-9eme', title: 'Exercices sur la génétique', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-systeme-nerveux-9eme-1', lessonSlug: 'systeme-nerveux-9eme', title: 'Exercices sur le système nerveux', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  // Lycée
  { id: 'ex-renaissance-europe-1', lessonSlug: 'renaissance-europe', title: 'Exercices sur la Renaissance', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-climats-monde-1', lessonSlug: 'climats-monde', title: 'Exercices sur les climats', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-atome-1ere-1', lessonSlug: 'atome-1ere', title: 'Exercices sur l\'atome', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-marche-eco-1', lessonSlug: 'marche-eco', title: 'Exercices sur le marché', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-entreprise-env-1', lessonSlug: 'entreprise-env', title: 'Exercices sur l\'entreprise', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-cao-2eme-1', lessonSlug: 'cao-2eme', title: 'Exercices de CAO', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-limites-3eme-1', lessonSlug: 'limites-3eme', title: 'Exercices sur les limites', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-pointeurs-3eme-1', lessonSlug: 'pointeurs-3eme', title: 'Exercices sur les pointeurs', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-raison-reel-1', lessonSlug: 'raison-reel', title: 'Exercices sur la raison et le réel', description: 'Séries d\'exercices d\'application.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  // BAC
  { id: 'ex-fonctions-log-1', lessonSlug: 'fonctions-log', title: 'Problèmes sur les fonctions log', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-nombres-complexes-1', lessonSlug: 'nombres-complexes', title: 'Problèmes sur les nombres complexes', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-probabilites-1', lessonSlug: 'probabilites', title: 'Problèmes sur les probabilités', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-dipole-rc-1', lessonSlug: 'dipole-rc', title: 'Problèmes sur le dipôle RC', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-modulation-1', lessonSlug: 'modulation', title: 'Problèmes sur la modulation', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-graphes-bac-1', lessonSlug: 'graphes-bac', title: 'Problèmes sur les graphes', description: 'Séries d\'exercices de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-conscience-inconscient-bac-1', lessonSlug: 'conscience-inconscient-bac', title: 'Dissertations sur la conscience', description: 'Sujets de dissertation de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
  { id: 'ex-liberte-bac-1', lessonSlug: 'liberte-bac', title: 'Dissertations sur la liberté', description: 'Sujets de dissertation de type bac.', fileUrl: '/exercises/placeholder.pdf', difficulty: 'HARD' },
];

export const comments: Comment[] = []; // Empty, as comments are user-generated

    

    