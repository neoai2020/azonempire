const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export type ChatMessage = { role: string; content: string };

export type ChatOptions = {
    temperature?: number;
    maxTokens?: number;
    timeoutMs?: number;
};

export type AiProvider = 'openrouter' | 'rapidapi';

export let lastAiProvider: AiProvider | null = null;

export function setLastAiProvider(provider: AiProvider) {
    lastAiProvider = provider;
}

export function getLastAiProvider(): AiProvider | null {
    return lastAiProvider;
}

export function isOpenRouterConfigured(): boolean {
    return !!process.env.OPENROUTER_API_KEY;
}

export async function openRouterChat(messages: ChatMessage[], opts: ChatOptions = {}): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

    const headers: Record<string, string> = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'AzonEmpire',
    };
    const referer = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
    if (referer) headers['HTTP-Referer'] = referer;

    const body: Record<string, unknown> = {
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
        messages,
    };
    if (opts.temperature !== undefined) body.temperature = opts.temperature;
    if (opts.maxTokens !== undefined) body.max_tokens = opts.maxTokens;

    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(opts.timeoutMs ?? 45000),
        cache: 'no-store',
    });

    if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`OpenRouter error ${response.status}: ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) {
        throw new Error('OpenRouter returned empty content');
    }
    return content;
}

/**
 * Tries OpenRouter when OPENROUTER_API_KEY is set, otherwise (or on any
 * OpenRouter error) runs the given RapidAPI call unchanged.
 */
export async function withOpenRouterFirst(
    messages: ChatMessage[],
    opts: ChatOptions,
    rapidApiCall: () => Promise<string>
): Promise<string> {
    if (isOpenRouterConfigured()) {
        try {
            const text = await openRouterChat(messages, opts);
            setLastAiProvider('openrouter');
            return text;
        } catch (error) {
            console.warn('[ai] OpenRouter failed, using RapidAPI:', error instanceof Error ? error.message : String(error));
        }
    }
    const text = await rapidApiCall();
    setLastAiProvider('rapidapi');
    return text;
}
