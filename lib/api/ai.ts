const getSmartTemplate = (prompt: string): string => {
    // Basic extraction of product name and platform from prompt
    const isFacebook = prompt.includes('Facebook');
    const isTwitter = prompt.includes('Twitter');
    const isInstagram = prompt.includes('Instagram');
    const isSEO = prompt.includes('SEO') || prompt.includes('Meta');

    // Extract product name roughly (between "for" and ".")
    const match = prompt.match(/for "([^"]+)"/i) || prompt.match(/for ([^.]+)/i);
    const product = match ? match[1] : 'this product';

    if (isFacebook) {
        return `🔥 **NEW ARRIVAL: ${product}** 🔥\n\nLooking for the ultimate upgrade? ${product} is finally here and it's a game-changer! 🚀\n\n✅ Premium Quality\n✅ Top-rated Features\n✅ Best Value\n\n👇 **Check it out here:** [Link]\n\nHave you tried it yet? Let us know in the comments! 👇 #MustHave #${product.replace(/\s+/g, '')}`;
    }
    if (isTwitter) {
        return `Just discovered ${product} and I'm obsessed! 🤯\n\nIf you've been waiting for a sign to upgrade, this is it. 🚀\n\nGet yours now before it sells out! 👇\n[Link]\n\n#TechTrends #NewGear #${product.replace(/\s+/g, '')}`;
    }
    if (isInstagram) {
        return `✨ Level up your lifestyle with ${product}! ✨\n\nAbsolute perfection in every detail. 📸\n\nDouble tap if you need this in your life! ❤️\n\n🔗 Link in bio to shop!\n.\n.\n.\n#Lifestyle #Goals #MustHave #${product.replace(/\s+/g, '')} #Trending`;
    }
    if (isSEO) {
        return `**Meta Title:** ${product} Review (2026) - Is It Worth It?\n\n**Meta Description:** Discover if ${product} lives up to the hype. We break down the features, pros, cons, and best price deals in our comprehensive 2026 review.\n\n**Intro:**\nIn the world of premium products, ${product} stands out as a top contender. Whether you're a professional or an enthusiast, finding the right gear is crucial. In this deep-dive review, we explore why ${product} is making waves and if it's the right choice for you...`;
    }

    return `Check out ${product}, the latest must-have item! It features amazing quality and performance. Don't miss out on the best deal today. #Recommended #${product.replace(/\s+/g, '')}`;
};

export const generateText = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error('AI response not ok');

        const result = await response.json();
        const text = result.result || result.message || '';

        // Check for generic/bad responses from free API
        if (!text || text.length < 20 || text.includes("I'm doing well") || text.includes("language model")) {
            console.warn('AI returned generic response, using smart template.');
            return getSmartTemplate(prompt);
        }

        return text;
    } catch (error) {
        console.error('AI Client Error, using fallback:', error);
        return getSmartTemplate(prompt);
    }
};
