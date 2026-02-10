import { NextResponse } from 'next/server';
import { z } from 'zod';
import rateLimit from '@/src/infrastructure/lib/rate-limit';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

const searchSchema = z.string().min(1, 'Query is required').max(100, 'Query is too long');

export async function GET(request: Request) {
    try {
        // Rate Limiting
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
        await limiter.check(NextResponse, 20, ip); // 20 requests per minute per IP

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        // Validate query using Zod
        const validation = searchSchema.safeParse(query);

        if (!validation.success) {
            return NextResponse.json({
                error: 'Invalid query',
                details: validation.error.flatten()
            }, { status: 400 });
        }

        const safeQuery = validation.data;

        const API_KEY = process.env.SCRAPERAPI_KEY!;
        const baseUrl = 'http://api.scraperapi.com';
        const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(safeQuery)}`;
        const fetchUrl = `${baseUrl}?api_key=${API_KEY}&url=${encodeURIComponent(amazonUrl)}&autoparse=true`;

        console.log(`Fetching from ScraperAPI: ${fetchUrl.replace(API_KEY, 'HIDDEN_KEY')}`);

        const response = await fetch(fetchUrl);

        if (!response.ok) {
            console.error(`ScraperAPI Error: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error('Error Body:', errorText);
            return NextResponse.json({ error: `ScraperAPI failed: ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();
        console.log('ScraperAPI Response Status:', response.status);

        // Map ScraperAPI response
        const products = data.results || data.organic_results || [];
        console.log(`Found ${products.length} products`);

        const mappedProducts = Array.isArray(products) ? products.slice(0, 10).map((item: any) => ({
            asin: item.asin || '',
            title: item.name || item.title || item.text || 'No Title',
            image: item.image || item.main_image || '',
            price: item.price_string || item.price || 'N/A',
            rating: item.stars || item.rating || 0,
            reviews: item.reviews || item.review_count || 0,
            url: item.url || item.link || '',
            description: item.description || '',
            features: []
        })) : [];

        return NextResponse.json(mappedProducts);

    } catch (error: any) {
        if (error.message === 'Rate limit exceeded') {
            return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        }
        console.error('Amazon API Route Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
