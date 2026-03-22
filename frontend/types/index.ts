export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: 'student' | 'admin';
}

export interface Profile {
  userId: string;
  countryOfOrigin: string;
  preferredCountries: string[];
  budget: number;
  educationLevel: string;
  major: string;
  testScores: Record<string, number>;
}

export interface PAI_Score {
  total: number;
  academic: number;
  financial: number;
  visa: number;
  extracurricular: number;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  fees: number;
  currency: string;
  image: string;
  matchPercentage: number;
  coursesCount: number;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  universityId: string;
  universityName: string;
  duration: string;
  fees: number;
  currency: string;
  level: string;
  flags: string[];
}

export interface Post {
  id: string;
  type: 'announcement' | 'blog' | 'news';
  title: string;
  body: string;
  author: string;
  timestamp: string;
  image?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  commentsCount: number;
  tags: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  targetId?: string;
  targetType?: 'post' | 'comment' | 'global';
  timestamp: string;
  read: boolean;
}
