// AI-powered Keyword Suggestions

export const getKeywordSuggestions = async (query: string): Promise<string[]> => {
    const isInitial = !query || query.trim() === '';

    const angles = [
        "high-yield profitable categories",
        "trending and high-demand items",
        "top-rated consumer electronics",
        "home and kitchen essentials",
        "health and personal care must-haves",
        "lifestyle and outdoor gear",
        "gift-worthy popular products",
        "niche but high-converting items"
    ];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];

    const prompt = isInitial
        ? `TASK: Provide exactly 10 "Hot right now" high-traffic broad Amazon affiliate categories. 
           FOCUS: ${randomAngle}.
           FORMAT: Return ONLY a raw JSON array of 10 strings.
           FORBIDDEN: NO sentences, NO introduction, NO filler. Example: ["category 1", "category 2"...]`
        : `TASK: Provide exactly 10 high-traffic, specific Amazon affiliate long-tail keywords for the niche "${query}". 
           LANGUAGE: Respond in the same language as the query.
           FORMAT: Return ONLY a raw JSON array of 10 strings.
           FORBIDDEN: NO greetings, NO explanations, NO conversational text. Example: ["keyword 1", "keyword 2"...]`;

    try {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('AI API failed');

        const result = await response.json();
        let text = result.result || '';

        if (!text) {
            throw new Error('AI returned empty response');
        }

        // Clean up potential markdown formatting
        const cleanedText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

        // Conversational Filter: Reject common filler phrases and anything that looks like a sentence
        const fillerList = [
            "hello", "hi ", "how are you", "thank you", "i'm doing",
            "doing well", "here are", "sure!", "of course", "i can help",
            "مرحباً", "كيف حالك", "شكراً", "أهلاً", "أنا بخير", "استطيع مساعدتك",
            "how about you", "i am an ai", "as an ai", "my name is", "how can i help"
        ];

        const isFiller = (s: string) => {
            const low = s.toLowerCase();
            // If it's too long or contains filler words or is a question
            if (low.length > 60) return true;
            if (low.includes('?') && low.length > 20) return true;
            return fillerList.some(f => low.includes(f));
        };

        // Strategy 1: Try to extract JSON array
        const arrayMatch = cleanedText.match(/\[[\s\S]*?\]/);
        if (arrayMatch) {
            try {
                const keywords = JSON.parse(arrayMatch[0]);
                if (Array.isArray(keywords)) {
                    const filtered = keywords
                        .map((k: any) => String(k).trim())
                        .filter(k => k && k.length > 2 && !isFiller(k));
                    if (filtered.length > 0) return filtered.slice(0, 10);
                }
            } catch (jsonErr) {
                console.warn('JSON parse failed in keywords.ts');
            }
        }

        // Strategy 2: Fallback to line splitting with filler filtering
        const listItems = cleanedText.split('\n')
            .map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').trim())
            .filter((line: string) => line.length > 1 && line.length < 50 && !line.includes(':') && !isFiller(line));

        if (listItems.length > 0) {
            return listItems.slice(0, 10);
        }

        // Final Fallback if AI fails or returns filler
        return [
            "Wireless Earbuds",
            "Smart Home Devices",
            "Kitchen Gadgets",
            "Fitness Equipment",
            "Eco-friendly Products",
            "Gaming Accessories",
            "Pet Supplies",
            "Home Office Gear",
            "Outdoor Survival Tools",
            "Baby Care Essentials"
        ];
    } catch (e) {
        // Silently return fallback to avoid noisy console errors if API fails
        return [
            "Wireless Earbuds",
            "Smart Home Devices",
            "Kitchen Gadgets",
            "Fitness Gear",
            "Eco-friendly Products",
            "Gaming Accessories",
            "Pet Supplies",
            "Home Office Gear",
            "Outdoor Gear",
            "Travel Essentials"
        ];
    }
};
