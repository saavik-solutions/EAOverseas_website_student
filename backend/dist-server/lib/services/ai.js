"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const openai_1 = __importDefault(require("openai"));
const crypto_1 = __importDefault(require("crypto"));
const mongodb_1 = __importDefault(require("@/lib/db/mongodb"));
const ai_cache_1 = require("@/lib/db/models/ai-cache");
exports.aiService = {
    /**
     * Generates a streaming response for the AI Chat
     */
    async generateStreamingResponse(messages) {
        try {
            const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
            const response = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview", // or fine-tuned model
                messages,
                stream: true,
                temperature: 0.7,
            });
            return response;
        }
        catch (error) {
            console.error("OpenAI stream generation failed:", error);
            throw new Error("Failed to generate response. Please try again later.");
        }
    },
    /**
     * Analyzes student profile and returns a PAI score
     */
    async analyzeProfile(profileData) {
        try {
            await (0, mongodb_1.default)();
            const promptString = JSON.stringify(profileData);
            const hash = crypto_1.default.createHash('sha256').update("analyze_profile_" + promptString).digest('hex');
            const cached = await ai_cache_1.AICache.findOne({ promptHash: hash });
            if (cached) {
                return JSON.parse(cached.response);
            }
            const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
            const response = await openai.chat.completions.create({
                model: "gpt-4-turbo-preview",
                messages: [
                    { role: "system", content: "You are an expert student counselor. Evaluate the student profile for global university admission." },
                    { role: "user", content: promptString }
                ],
                response_format: { type: "json_object" }
            });
            const content = response.choices[0].message.content || '{}';
            await ai_cache_1.AICache.create({ promptHash: hash, response: content });
            return JSON.parse(content);
        }
        catch (error) {
            console.error("OpenAI profile analysis failed:", error);
            throw new Error("Failed to analyze profile. Please check your data and try again.");
        }
    }
};
