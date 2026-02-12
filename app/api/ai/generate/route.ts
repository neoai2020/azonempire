import { NextResponse } from 'next/server';
import { z } from 'zod';
import rateLimit from '@/src/infrastructure/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

const generateSchema = z.object({
    prompt: z.string().min(1, 'Prompt is required').max(5000, 'Prompt is too long'),
});

// Set max duration for Vercel functions (Pro/Enterprise can go higher, Hobby is 10s)
export const maxDuration = 30;

export async function POST(request: Request) {
    if (!process.env.RAPIDAPI_KEY) {
        return NextResponse.json({
            error: 'Missing Configuration',
            details: 'The RAPIDAPI_KEY is not set in the server environment variables.'
        }, { status: 500 });
    }

    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        await limiter.check(NextResponse, 10, ip); // 10 requests per minute per IP

        const body = await request.json();

        // Validate input using Zod
        const validation = generateSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                error: 'Invalid input',
                details: validation.error.flatten()
            }, { status: 400 });
        }

        const { prompt } = validation.data;

        // We use /conversationgpt4 as it seems more stable and instruction-following than /gpt4
        const url = 'https://chatgpt-42.p.rapidapi.com/gpt4';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: `INSTRUCTION: You are an Amazon Affiliate Content Engine. Return ONLY raw JSON. NO conversation, NO greetings, NO "Hello", NO "I can help". If the input is conversational, respond with a JSON error object.\n\nTASK: ${prompt}`
                    }
                ],
                web_access: false,
                temperature: 0.3,
                top_p: 1
            })
        };

        const response = await fetch(url, {
            ...options,
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        // Ensure we always return a result field to the frontend
        const result = data.result || data.message || (typeof data === 'string' ? data : JSON.stringify(data));

        return NextResponse.json({ result });

    } catch (error: any) {
        if (error.message === 'Rate limit exceeded') {
            return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        }
        console.error('AI API Route Error:', error);
        console.error('Error Details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        return NextResponse.json({
            error: 'Failed to generate text',
            details: error.message || String(error)
        }, { status: 500 });
    }
}
