import OpenAI from 'openai';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db/mongodb';
import { AICache } from '@/lib/db/models/ai-cache';

export const aiService = {
  /**
   * Generates a streaming response for the AI Chat
   */
  async generateStreamingResponse(messages: any[]) {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview", // or fine-tuned model
        messages,
        stream: true,
        temperature: 0.7,
      });
      return response;
    } catch (error) {
      console.error("OpenAI stream generation failed:", error);
      throw new Error("Failed to generate response. Please try again later.");
    }
  },

  /**
   * Analyzes student profile and returns a PAI score
   */
  async analyzeProfile(profileData: any) {
    try {
      await connectToDatabase();
      const promptString = JSON.stringify(profileData);
      const hash = crypto.createHash('sha256').update("analyze_profile_" + promptString).digest('hex');
      
      const cached = await AICache.findOne({ promptHash: hash });
      if (cached) {
        return JSON.parse(cached.response);
      }

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: "You are an expert student counselor. Evaluate the student profile for global university admission." },
          { role: "user", content: promptString }
        ],
        response_format: { type: "json_object" }
      });
      
      const content = response.choices[0].message.content || '{}';
      await AICache.create({ promptHash: hash, response: content });
      
      return JSON.parse(content);
    } catch (error) {
      console.error("OpenAI profile analysis failed:", error);
      throw new Error("Failed to analyze profile. Please check your data and try again.");
    }
  }
};
