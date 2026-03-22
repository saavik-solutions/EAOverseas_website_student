import { create } from 'zustand';
import { User, Profile, PAI_Score, University, Course, Post, CommunityPost, Message, Notification } from '@/types';

// User Store
interface UserState {
  user: User | null;
  profile: Profile | null;
  paiScore: PAI_Score | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setPAIScore: (score: PAI_Score | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  paiScore: null,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setPAIScore: (paiScore) => set({ paiScore }),
}));

// Feed Store
interface FeedState {
  posts: Post[];
  communityPosts: CommunityPost[];
  filters: any;
  setPosts: (posts: Post[]) => void;
  setCommunityPosts: (posts: CommunityPost[]) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  communityPosts: [],
  filters: {},
  setPosts: (posts) => set({ posts }),
  setCommunityPosts: (communityPosts) => set({ communityPosts }),
}));

// Discover Store
interface DiscoverState {
  universities: University[];
  searchQuery: string;
  setUniversities: (universities: University[]) => void;
  setSearchQuery: (query: string) => void;
}

export const useDiscoverStore = create<DiscoverState>((set) => ({
  universities: [],
  searchQuery: '',
  setUniversities: (universities) => set({ universities }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

// Courses Store
interface CoursesState {
  courses: Course[];
  searchQuery: string;
  setCourses: (courses: Course[]) => void;
  setSearchQuery: (query: string) => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  searchQuery: '',
  setCourses: (courses) => set({ courses }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

// Chat Store
interface ChatState {
  messages: Message[];
  isOpen: boolean;
  sessionId: string | null;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  sessionId: null,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
}));

// UI Store
interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  toggleSidebar: () => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notifications: [],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
  })),
}));
