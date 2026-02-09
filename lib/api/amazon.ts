// Mock Data for Amazon Products

export interface AmazonProduct {
    asin: string;
    title: string;
    image: string;
    price: string;
    rating: number;
    reviews: number;
    url: string;
    description?: string;
    features?: string[];
}

const MOCK_PRODUCTS: AmazonProduct[] = [
    {
        asin: 'B08F683KGV',
        title: 'Sony WH-1000XM4 Wireless Noise Cancelling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
        image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
        price: '$348.00',
        rating: 4.7,
        reviews: 12405,
        url: 'https://amazon.com/dp/B08F683KGV',
        description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.',
        features: [
            'Industry-leading noise canceling',
            '30-hour battery life',
            'Touch Sensor controls',
            'Speak-to-chat technology'
        ]
    },
    {
        asin: 'B079HWAZM',
        title: 'Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive Transparency',
        image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
        price: '$249.00',
        rating: 4.8,
        reviews: 5890,
        url: 'https://amazon.com/dp/B079HWAZM',
        description: 'Reengineered sound. Active Noise Cancelling reduces unwanted background noise. Adaptive Transparency lets outside sounds in while reducing loud environmental noise.',
        features: [
            'Active Noise Cancelling',
            'Personalized Spatial Audio',
            'MagSafe Charging Case',
            'Touch control'
        ]
    },
    {
        asin: 'B08J5F3G18',
        title: 'Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Headphones with Multiple Modes, Hi-Res Sound',
        image: 'https://m.media-amazon.com/images/I/61+R5rK94QL._AC_SL1500_.jpg',
        price: '$79.99',
        rating: 4.5,
        reviews: 8760,
        url: 'https://amazon.com/dp/B08J5F3G18',
        description: 'Advanced Noise Cancellation Technology: Maintain your focus with Life Q30’s hybrid active noise cancellation.',
        features: [
            'Hi-Res Audio Certified',
            '40-Hour Playtime',
            'Pressure-Free Comfort',
            'Multipoint Connection'
        ]
    }
];

export const searchProducts = async (query: string): Promise<AmazonProduct[]> => {
    try {
        const response = await fetch(`/api/amazon/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Amazon Search Client Error:', error);
        return [];
    }
};

export const getProductDetails = async (asin: string): Promise<AmazonProduct | null> => {
    console.log(`Fetching details for ASIN: ${asin}`);
    await new Promise(resolve => setTimeout(resolve, 800));

    return MOCK_PRODUCTS.find(p => p.asin === asin) || null;
};
