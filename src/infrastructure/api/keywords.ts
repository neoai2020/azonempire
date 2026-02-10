// AI-powered Keyword Suggestions

export const getKeywordSuggestions = async (query: string): Promise<string[]> => {
    if (!query) return [];

    const angles = [
        "high-end professional equipment",
        "affordable budget-friendly options",
        "popular gift ideas",
        "new and trending products",
        "essential accessories and add-ons",
        "beginner-friendly starters",
        "top-rated and most-reviewed items",
        "unique and niche alternatives"
    ];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];

    const prompt = `Provide a unique and diverse list of 10 high-traffic Amazon affiliate keywords for the niche "${query}". 
Focus specifically on ${randomAngle}.
Make sure these keywords vary from previous requests.
Return ONLY a raw JSON array of strings. Ref: ${Math.random().toString(36).substring(7)}`;

    try {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('AI API failed');

        const result = await response.json();
        console.log('Raw result from /api/ai/generate in keywords.ts:', result);
        let text = result.result || '';

        if (!text) {
            console.error('AI returned empty result');
            throw new Error('AI returned empty response');
        }

        // Clean up potential markdown formatting (and generic leading text)
        const cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

        // Strategy 1: Try to extract JSON array from response
        const arrayMatch = cleanedText.match(/\[[\s\S]*?\]/);
        if (arrayMatch) {
            try {
                const keywords = JSON.parse(arrayMatch[0]);
                if (Array.isArray(keywords) && keywords.length > 0) {
                    console.log('Successfully parsed JSON array:', keywords);
                    return keywords.map((k: any) => String(k).trim()).filter(Boolean);
                }
            } catch (jsonErr) {
                console.warn('Found array-like string but failed to parse it as JSON:', arrayMatch[0]);
            }
        }

        // Strategy 2: Try to parse as a numbered list (1. Keyword, 2. Keyword...)
        const lines = cleanedText.split('\n');
        const listItems = lines
            .map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').trim()) // Remove "1. " or "1) "
            .filter((line: string) => line.length > 0 && line.length < 50 && !line.includes(':')); // Filter out long lines or lines with colons

        if (listItems.length >= 3) { // If we got at least 3 items, consider it a valid list
            console.log('Parsed as numbered/bulleted list:', listItems);
            return listItems.slice(0, 10);
        }

        // Strategy 3: Just split by comma or newline if nothing else worked
        console.warn('Falling back to splitting by commas/newlines for text:', cleanedText);
        const splitItems = cleanedText
            .split(/[,\n]/)
            .map((item: string) => item.trim().replace(/^["']|["']$/g, '')) // Remove leading/trailing quotes
            .filter((item: string) => item.length > 2 && item.length < 50 && !item.toLowerCase().includes('here are'));

        if (splitItems.length > 0) {
            return splitItems.slice(0, 8);
        }

        throw new Error('AI returned non-array response');
    } catch (e) {
        console.error('AI keywords generation failed:', e);
        throw e; // Re-throw so the UI can show the error
    }
};
