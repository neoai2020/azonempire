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
