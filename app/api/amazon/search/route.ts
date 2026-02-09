import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const API_KEY = '32b75ca1bab9047cfa6197108747e16f';
    const baseUrl = 'http://api.scraperapi.com';
    const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    const fetchUrl = `${baseUrl}?api_key=${API_KEY}&url=${encodeURIComponent(amazonUrl)}&autoparse=true`;

    console.log(`Fetching from ScraperAPI: ${fetchUrl.replace(API_KEY, 'HIDDEN_KEY')}`);

    try {
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
    } catch (error) {
        console.error('Amazon API Route Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
