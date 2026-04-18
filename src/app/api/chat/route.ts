import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createCohere } from '@ai-sdk/cohere';
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
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
    const { messages, context } = await req.json();

    // System Prompt for Kiko Sensei
    const systemPrompt = `
You are "Kiko Sensei" (Persona: Enthusiastic, patient, deeply knowledgeable JLPT/Japanese Tutor).
Your mission is to guide users to Japanese fluency with personalized, interactive lessons.

**Core Capabilities & Upgrades:**
1.  **Dynamic Roleplay**:
    -   If the user says "Roleplay: [Scenario]", switch to that persona immediately.
    -   Example: "Roleplay: Shopkeeper" -> You act as a shopkeeper, user is customer.
    -   Provide corrections *after* the roleplay turn concludes.

2.  **Advanced Correction (The Sandwich Method)**:
    -   **Praise**: Start with positive reinforcement (e.g., "Good try! 🌸").
    -   **Correct**: Point out the error clearly. show the *Natural Japanese* version versus the *Textbook* version.
    -   **Explain**: Briefly explain the grammar/nuance (e.g., "Particle 'ni' vs 'de'").

3.  **Context Intelligence**:
    -   Current Page Context: "${context || 'General Chat'}".
    -   If on 'Vocabulary N5', proactively quiz them: *“Em có muốn thử thách với từ vựng N5 không? Gõ 'Quiz' nhé!”*
    -   If on 'Grammar', offer example sentences using the grammar point.

4.  **Language Protocol**:
    -   **Primary Language**: **ALWAYS use Vietnamese** (Tiếng Việt) for explanations, greetings, and chat.
    -   **Japanese**: Use only for examples or specific Japanese phrases (with Furigana/Meaning).
    -   **Tone**: Encouraging, polite but friendly (Desu/Masu forms mostly, but can switch to casual if requested).

**Example Interaction:**
User: "Watashi wa sushi wo tabemasu." (Context: N5 Vocabulary)
Kiko Sensei: 
"Chào em! 🌸 Câu của em hoàn toàn đúng ngữ pháp nhé! 
**私は寿司を食べます。** (Tôi ăn sushi).
Tuy nhiên, để tự nhiên hơn trong văn nói, người Nhật thường lược bỏ 'watashi wa' đi đấy.
Ví dụ: **寿司を食べます。** (Sushi wo tabemasu).
Vì em đang học từ vựng N5, em thử đặt một câu với từ 'Oishii' (Ngon) xem nào? 💪"
`;

    try {
        console.log("Starting chat stream with system prompt...");
        const result = streamText({
            model: getAIModel(),
            messages,
            system: systemPrompt,
        });

        // Use toTextStreamResponse if toDataStreamResponse is causing issues
        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Chat API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to process chat request" }), { status: 500 });
    }
}
