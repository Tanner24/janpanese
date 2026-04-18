import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createCohere } from '@ai-sdk/cohere';
import { createGroq } from '@ai-sdk/groq';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

function getAIModel() {
    const provider = process.env.ACTIVE_AI_PROVIDER || 'openrouter';

    if (provider === 'google') {
        const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '' });
        return google('gemini-1.5-pro');
    } else if (provider === 'github') {
        const github = createOpenAI({ baseURL: 'https://models.inference.ai.azure.com', apiKey: process.env.GITHUB_TOKEN || '' });
        return github('gpt-4o');
    } else if (provider === 'cohere') {
        const cohere = createCohere({ apiKey: process.env.COHERE_API_KEY || '' });
        return cohere('command-r-plus-08-2024');
    } else if (provider === 'groq') {
        const groq = createGroq({ apiKey: process.env.GROQ_API_KEY || '' });
        return groq('llama-3.3-70b-versatile');
    } else {
        // Default to OpenRouter
        const openrouter = createOpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY || '',
            headers: { "HTTP-Referer": "http://localhost:3000", "X-Title": "Nihongo Master" }
        });
        return openrouter('google/gemini-2.0-pro-exp-02-05:free');
    }
}

export async function POST(req: Request) {
    try {
        const { topic, level, count = 3 } = await req.json();

        if (!topic || !level) {
            return new Response(JSON.stringify({ error: "Missing topic or level" }), { status: 400 });
        }

        const prompt = `
Generate ${count} Japanese phrases for speaking practice.
Level: JLPT ${level}
Topic: ${topic}

Requirements:
- Phải là tiếng Nhật tự nhiên, phù hợp với ngữ cảnh thực tế.
- Độ khó và từ vựng, ngữ pháp phải tương đương cấp độ ${level}.
- Cung cấp Hiragana/Katakana rõ ràng.
- Cung cấp Romaji chính xác để người học dễ đọc.
- Cung cấp nghĩa tiếng Việt (meaning_vi) tự nhiên, sát nghĩa thực tế.
- Độ khó (difficulty) đánh giá từ 1 đến 5 (1: rất dễ, 5: khó).
`;

        const { object } = await generateObject({
            model: getAIModel(),
            system: 'You are an expert Japanese teacher creating lesson materials for Vietnamese students.',
            prompt: prompt,
            schema: z.object({
                phrases: z.array(z.object({
                    japanese: z.string(),
                    romaji: z.string(),
                    meaning_vi: z.string(),
                    difficulty: z.number(),
                }))
            })
        });

        return new Response(JSON.stringify(object), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error("AI Generation API Error:", error);
        return new Response(JSON.stringify({
            error: "Failed to generate phrases",
            details: error.message,
            stack: error.stack
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
