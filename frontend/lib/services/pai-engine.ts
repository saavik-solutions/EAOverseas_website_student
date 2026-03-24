import { OpenAI } from 'openai';

export interface ProfileData {
  academic: { degree: string; gpa: number; year: number; field: string };
  tests: { ielts?: number; toefl?: number; gre?: string; gmat?: number };
  experience: Array<{ role: string; company: string; years: number }>;
  skills: string[];
  budget: number;
  resumeText?: string;
}

export interface PAIResult {
  scores: {
    overall: number;
    academic: number;
    language: number;
    financial: number;
    experience: number;
  };
  strengths: string[];
  gaps: string[];
  recommendations: {
    courses: string[];
    universities: string[];
  };
  roadmap: string;
}

export class PAIEngine {
  private static readonly WEIGHTS = {
    academic: 0.4,
    language: 0.2,
    experience: 0.2,
    financial: 0.2
  };

  /**
   * Main analysis pipeline
   */
  static async analyze(profile: ProfileData): Promise<PAIResult> {
    const scores = this.calculateAlgorithmicScores(profile);
    const matches = await this.findUniversityMatches(profile);
    const aiNarrative = await this.generateAINarrative(profile, scores);

    return {
      scores,
      strengths: aiNarrative.strengths,
      gaps: aiNarrative.gaps,
      recommendations: {
        courses: aiNarrative.recommendedCourses,
        universities: matches.map(u => u.name)
      },
      roadmap: aiNarrative.roadmap
    };
  }

  /**
   * Layer 1: Deterministic Weighted Scoring
   */
  private static calculateAlgorithmicScores(profile: ProfileData) {
    // 0-100 normalization logic
    const academic = Math.min(100, (profile.academic.gpa / 10) * 100);
    const language = profile.tests.ielts ? Math.min(100, (profile.tests.ielts / 9) * 100) : 50;
    const experience = Math.min(100, (profile.experience.reduce((acc, curr) => acc + curr.years, 0) / 5) * 100);
    const financial = profile.budget > 50000 ? 100 : (profile.budget / 50000) * 100;

    const overall = (
      academic * this.WEIGHTS.academic +
      language * this.WEIGHTS.language +
      experience * this.WEIGHTS.experience +
      financial * this.WEIGHTS.financial
    );

    return {
      overall: Math.round(overall),
      academic: Math.round(academic),
      language: Math.round(language),
      experience: Math.round(experience),
      financial: Math.round(financial)
    };
  }

  /**
   * Layer 2: University Matching Logic
   */
  private static async findUniversityMatches(profile: ProfileData) {
    // In a real app, this would query Supabase/PostgreSQL
    // with filters: fee <= profile.budget AND min_gpa <= profile.gpa
    return [
      { name: 'University of Oxford', match: 85 },
      { name: 'TUM Munich', match: 92 },
      { name: 'University of Toronto', match: 88 }
    ];
  }

  /**
   * Layer 3: Generative AI Narrative
   */
  private static async generateAINarrative(profile: ProfileData, scores: any) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // We use a highly structured prompt to get reliable JSON back in one token-efficient call
    let prompt = `Analyze this student profile for global education:
    Profile: ${JSON.stringify(profile)}
    Scores: ${JSON.stringify(scores)}`;
    
    if (profile.resumeText) {
      prompt += `\nRaw Resume Data Extracted: """\n${profile.resumeText}\n"""\nUse this raw resume data to identify actual career depth, projects, and highly specific strengths.`;
    }

    prompt += `\n\nReturn JSON format: 
    {
      "strengths": ["string", 5 items],
      "gaps": ["string", 5 items],
      "recommendedCourses": ["string", 3 items],
      "roadmap": "string detailing 3-year plan"
    }`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
       return {
         strengths: ['Strong academic foundation', 'Financial readiness'],
         gaps: ['Language test scores missing', 'Work depth'],
         recommendedCourses: ['MSc Computer Science', 'MBA'],
         roadmap: 'Focus on language proficiency in Year 1...'
       };
    }
  }
}
