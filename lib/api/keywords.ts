// Mock Data for Keyword Suggestions

export const getKeywordSuggestions = async (query: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    if (!query) return [];

    const base = query.trim().toLowerCase();

    return [
        `${base}`,
        `${base} for beginners`,
        `${base} reviews 2024`,
        `best ${base}`,
        `${base} under $50`,
        `${base} alternatives`,
        `cheap ${base}`,
        `${base} deals`
    ];
};
