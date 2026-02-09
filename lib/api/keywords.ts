// Mock Data for Keyword Suggestions
import { generateText } from './ai';

export const getKeywordSuggestions = async (query: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!query) return [];

    if (!query) return [];

    const prompt = `Generate 8 relevant, high-traffic Amazon keywords suitable for the niche '${query}'. Return ONLY a raw JSON array of strings (e.g. ["keyword 1", "keyword 2"]). Do not include any markdown formatting or explanation. The keywords should be in English.`;

    try {
        const text = await generateText(prompt);
        // Clean up potential markdown code blocks if the AI adds them
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const keywords = JSON.parse(cleanedText);
        return Array.isArray(keywords) ? keywords : [];
    } catch (e) {
        console.error('Keyword Generation Error:', e);
        // Fallback: Return the original query and some variations, but ensure the original query is first
        // This prevents searching for "fifa Suggestions" which yields bad results
        return [query, `Best ${query}`, `${query} Review`];
    }
};
