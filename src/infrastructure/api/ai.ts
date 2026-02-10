export const generateText = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'AI response not ok');
        }

        const result = await response.json();
        const text = result.result || '';

        if (!text) {
            throw new Error('No text generated');
        }

        return text;
    } catch (error) {
        console.error('AI Client Error:', error);
        throw error; // Re-throw to let caller handle it
    }
};
