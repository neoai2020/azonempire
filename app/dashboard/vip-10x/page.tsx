'use client';

import React from 'react';
import { Crown } from 'lucide-react';
import { UpgradePageTemplate } from '@/src/presentation/features/dashboard/components/UpgradePageTemplate';

export default function VIP10xPage() {
    return (
        <UpgradePageTemplate
            title="10x Profit System"
            description="Our flagship scaling system. Learn the exact blueprints we use to take fresh Amazon assets from $0 to $10,000/mo in record time."
            icon={Crown}
            accentColor="#fbbf24"
            videos={[
                { title: "The 10x Mindset & Setup", duration: "12:45" },
                { title: "Advanced Keyword Domination", duration: "24:10" },
                { title: "Scaling to Multiple Niches", duration: "18:20" },
                { title: "Automating Your Revenue", duration: "15:05" }
            ]}
            tools={[
                { title: "Profit Predictor AI", type: "Software" },
                { title: "10x Blueprint Checklist", type: "Document" }
            ]}
        />
    );
}
