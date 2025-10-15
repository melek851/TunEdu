export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'ADMIN';
  avatarUrl?: string;
};

export type Level = {
  id: string;
  name: string;
  slug: string;
  order: number;
  yearCount: number;
};

export type ClassYear = {
  id: string;
  levelSlug: string;
  name: string;
  slug: string;
  order: number;
};

export type Subject = {
  id: string;
  classYearSlug: string;
  name: string;
  slug: string;
  description: string;
  manualUrl: string;
  thumbnailUrl: string;
  thumbnailHint: string;
};

export type Lesson = {
  id: string;
  subjectSlug: string;
  title: string;
  slug: string;
  summary: string;
  order: number;
  score: number;
};

export type RecordedSession = {
  id: string;
  lessonSlug: string;
  title: string;
  videoUrl: string;
  durationSeconds: number;
};

export type Exercise = {
  id: string;
  lessonSlug: string;
  title: string;
  description: string;
  fileUrl: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
};

export type Comment = {
  id: string;
  user: User;
  body: string;
  createdAt: string;
  parentId?: string;
};

export type DashboardStats = {
  timeTodaySeconds: number;
  lessonsViewed: number;
  exercisesOpened: number;
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};
