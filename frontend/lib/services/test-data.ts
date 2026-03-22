export interface TestSection {
  name: string;
  duration: string;
  questions: string;
  score: string;
  description: string;
}

export interface TestData {
  slug: string;
  name: string;
  category: 'Language' | 'Graduate' | 'Undergraduate' | 'Professional';
  summary: string;
  acceptedBy: string;
  validity: string;
  fee: string;
  logo: string;
  sections: TestSection[];
  scoreGuide: Array<{ range: string; mapping: string; color: string }>;
  stats: { takers: string; countries: string; formats: string[] };
}

export const TEST_DATA: Record<string, TestData> = {
  ielts: {
    slug: 'ielts',
    name: 'IELTS Academic',
    category: 'Language',
    summary: 'The world\'s most popular English language test for higher education and global migration.',
    acceptedBy: '11,000+ organizations in 140 countries',
    validity: '2 Years',
    fee: '~ $250 - $300',
    logo: '🇬🇧',
    stats: { takers: '3.5M+', countries: '140', formats: ['Paper-based', 'Computer-delivered'] },
    sections: [
      { name: 'Listening', duration: '30 mins', questions: '40', score: '0 - 9.0', description: 'Four recorded monologues and conversations.' },
      { name: 'Reading', duration: '60 mins', questions: '40', score: '0 - 9.0', description: 'Three long texts which range from descriptive to analytical.' },
      { name: 'Writing', duration: '60 mins', questions: '2 Tasks', score: '0 - 9.0', description: 'Task 1 (Graphic analysis) and Task 2 (Essay).' },
      { name: 'Speaking', duration: '11-14 mins', questions: '3 Parts', score: '0 - 9.0', description: 'Face-to-face interview with an examiner.' }
    ],
    scoreGuide: [
      { range: '8.0 - 9.0', mapping: 'Top-tier (Ivy League, Oxford/Cambridge)', color: 'text-brand-success' },
      { range: '7.0 - 7.5', mapping: 'Tier 1 Universities (UCL, Toronto, Sydney)', color: 'text-brand-primary' },
      { range: '6.0 - 6.5', mapping: 'Tier 2 & 3 Universities / Immigration', color: 'text-brand-accent' }
    ]
  },
  gre: {
    slug: 'gre',
    name: 'GRE General',
    category: 'Graduate',
    summary: 'The most widely accepted graduate-level admissions test for Masters and PhD programs.',
    acceptedBy: 'Select business schools & most graduate programs',
    validity: '5 Years',
    fee: '~ $220',
    logo: '🎓',
    stats: { takers: '500k+', countries: '160', formats: ['Computer-adaptive'] },
    sections: [
      { name: 'Verbal Reasoning', duration: '60 mins', questions: '40', score: '130 - 170', description: 'Analyzes written material and relationship between words.' },
      { name: 'Quantitative Reasoning', duration: '70 mins', questions: '40', score: '130 - 170', description: 'Measures basic math skills and understanding of elementary math concepts.' },
      { name: 'Analytical Writing', duration: '30 mins', questions: '1 Task', score: '0 - 6.0', description: 'Measures critical thinking and analytical writing skills.' }
    ],
    scoreGuide: [
      { range: '320+', mapping: 'Highly Competitive (STEM, Top-50 US)', color: 'text-brand-success' },
      { range: '300 - 315', mapping: 'Competitive Graduate Programs', color: 'text-brand-primary' },
      { range: '< 300', mapping: 'State Universities / Practical Programs', color: 'text-brand-accent' }
    ]
  }
};
