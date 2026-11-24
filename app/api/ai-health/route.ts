import { NextResponse } from 'next/server';
import { getLastAiProvider, withOpenRouterFirst } from '@/src/infrastructure/lib/openrouter';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const secret = process.env.AI_HEALTH_SECRET;
    if (!secret || request.headers.get('x-ai-health-secret') !== secret) {
        return new NextResponse(null, { status: 404 });
    }

    const started = Date.now();
    try {
        const messages = [{ role: 'user', content: 'Reply with the single word ok' }];
        const text = await withOpenRouterFirst(messages, { temperature: 0.3 }, async () => {
            if (!process.env.RAPIDAPI_KEY) throw new Error('The RAPIDAPI_KEY is not set in the server environment variables.');

            const response = await fetch('https://chatgpt-42.p.rapidapi.com/gpt4', {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages,
                    web_access: false,
                    temperature: 0.3,
                    top_p: 1
                }),
                cache: 'no-store',
                signal: AbortSignal.timeout(90000)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const result = data.result || data.message || '';
            if (!result) throw new Error('RapidAPI returned empty content');
            return result;
        });

        return NextResponse.json(
            { ok: true, provider: getLastAiProvider(), ms: Date.now() - started, sample: String(text).slice(0, 40) },
            { headers: { 'Cache-Control': 'no-store' } }
        );
    } catch (error) {
        return NextResponse.json(
            { ok: false, error: error instanceof Error ? error.message : String(error), ms: Date.now() - started },
            { status: 502, headers: { 'Cache-Control': 'no-store' } }
        );
    }
}
