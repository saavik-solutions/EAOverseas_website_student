"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAIEngine = void 0;
const openai_1 = require("openai");
class PAIEngine {
    /**
     * Main analysis pipeline
     */
    static async analyze(profile) {
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
    static calculateAlgorithmicScores(profile) {
        // 0-100 normalization logic
        const academic = Math.min(100, (profile.academic.gpa / 10) * 100);
        const language = profile.tests.ielts ? Math.min(100, (profile.tests.ielts / 9) * 100) : 50;
        const experience = Math.min(100, (profile.experience.reduce((acc, curr) => acc + curr.years, 0) / 5) * 100);
        const financial = profile.budget > 50000 ? 100 : (profile.budget / 50000) * 100;
        const overall = (academic * this.WEIGHTS.academic +
            language * this.WEIGHTS.language +
            experience * this.WEIGHTS.experience +
            financial * this.WEIGHTS.financial);
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
    static async findUniversityMatches(profile) {
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
    static async generateAINarrative(profile, scores) {
        const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        // We use a highly structured prompt to get reliable JSON back in one token-efficient call
        const prompt = `Analyze this student profile for global education:
    Profile: ${JSON.stringify(profile)}
    Scores: ${JSON.stringify(scores)}
    
    Return JSON format: 
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
        }
        catch (error) {
            return {
                strengths: ['Strong academic foundation', 'Financial readiness'],
                gaps: ['Language test scores missing', 'Work depth'],
                recommendedCourses: ['MSc Computer Science', 'MBA'],
                roadmap: 'Focus on language proficiency in Year 1...'
            };
        }
    }
}
exports.PAIEngine = PAIEngine;
PAIEngine.WEIGHTS = {
    academic: 0.4,
    language: 0.2,
    experience: 0.2,
    financial: 0.2
};
