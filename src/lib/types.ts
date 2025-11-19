
import type { Timestamp } from "firebase/firestore";

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
  id:string;
  lessonSlug: string;
  title: string;
  description: string;
  fileUrl: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
};

export type Comment = {
  id: string;
  lessonId: string;
  user: Partial<User>;
  body: string;
  createdAt: Timestamp | string; // Can be a server timestamp or an ISO string
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

export type UserLessonView = {
  userId: string;
  lessonSlug: string;
  viewedAt: Timestamp;
};

export type UserExerciseOpen = {
  userId: string;
  exerciseId: string;
  openedAt: Timestamp;
};

export type UserTimeSpent = {
  userId: string;
  durationSeconds: number;
  context: string; // e.g., 'lesson:fonctions-log'
  loggedAt: Timestamp;
};
