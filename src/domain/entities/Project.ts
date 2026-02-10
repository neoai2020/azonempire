export interface Project {
    id: string;
    name: string;
    slug: string;
    status: 'Live' | 'Draft';
    views: number;
    clicks: number;
    last_updated: string;
    user_id: string;
    review_title?: string;
    review_verdict?: string;
    review_features?: string[];
    review_description?: string;
    product_image?: string;
    affiliate_link?: string;
}

export interface DashboardStats {
    total_assets: number;
    total_views: number;
    outbound_clicks: number;
    conversion_estimation: number;
}
