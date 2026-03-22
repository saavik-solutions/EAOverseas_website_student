export interface ProfileData {
  name: string;
  avatar: string;
  cover: string;
  nationality: string;
  title: string;
  institution: string;
  paiScore: number;
  bio: string;
  skills: string[];
  education: Array<{ degree: string; school: string; year: string; gpa: string }>;
  experience: Array<{ role: string; company: string; duration: string; description: string }>;
  activity: Array<{ type: 'comparison' | 'save' | 'test'; detail: string; date: string }>;
  saved: {
    universities: number;
    courses: number;
    accommodation: number;
  };
}

export const USER_PROFILE: ProfileData = {
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  cover: 'linear-gradient(to right, #6366f1, #a855f7)',
  nationality: '🇺🇸',
  title: 'B.Sc. Computer Science',
  institution: 'Stanford University',
  paiScore: 82,
  bio: 'Aspiring AI researcher with a focus on natural language processing. Looking to pursue a Master\'s in Europe to broaden my global perspective on ethics in technology.',
  skills: ['Python', 'React', 'Machine Learning', 'Public Speaking', 'System Design'],
  education: [
    { degree: 'B.Sc. Computer Science', school: 'Stanford University', year: '2020 - 2024', gpa: '3.8/4.0' },
    { degree: 'High School Diploma', school: 'Lakeside School', year: '2016 - 2020', gpa: '4.0/4.0' }
  ],
  experience: [
    { role: 'AI Intern', company: 'Google DeepMind', duration: 'Summer 2023', description: 'Worked on transformer model optimization for mobile devices.' },
    { role: 'Research Assistant', company: 'Stanford AI Lab', duration: '2022 - Present', description: 'Assisting in multi-modal learning research.' }
  ],
  activity: [
    { type: 'comparison', detail: 'Compared Harvard vs MIT for MSc CS', date: '2 hours ago' },
    { type: 'save', detail: 'Saved Riverside Student Commons', date: 'Yesterday' },
    { type: 'test', detail: 'Added IELTS Academic Score: 8.5', date: '3 days ago' }
  ],
  saved: {
    universities: 12,
    courses: 8,
    accommodation: 3
  }
};
