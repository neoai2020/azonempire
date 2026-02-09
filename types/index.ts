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

export interface Project {
    id: string;
    name: string;
    status: 'Live' | 'Draft';
    views: number;
    clicks: number;
    last_updated: string;
    user_id: string;
}

export interface DashboardStats {
    total_assets: number;
    total_views: number;
    outbound_clicks: number;
    conversion_estimation: number;
}
