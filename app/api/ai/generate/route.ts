import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        console.log('AI Prompt Received:', prompt);

        const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'e58a784d0dmsh8c00f2f58365008p103943jsn729926f8c316',
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: prompt }],
                system_prompt: '',
                temperature: 0.9,
                top_k: 5,
                top_p: 0.9,
                max_tokens: 256,
                web_access: false
            })
        };

        const response = await fetch(url, options);
        const result = await response.json();

        console.log('AI Response:', JSON.stringify(result).substring(0, 200));

        return NextResponse.json(result);
    } catch (error) {
        console.error('AI API Route Error:', error);
        return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
    }
}
