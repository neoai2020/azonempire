'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { UpgradePageTemplate } from '@/src/presentation/features/dashboard/components/UpgradePageTemplate';

export default function ConversionMasterPage() {
    return (
        <UpgradePageTemplate
            title="Infinite"
            description="Turn every visitor into a sale. Our psychological conversion triggers and layout optimizations designed to triple your outbound clicks."
            icon={Zap}
            accentColor="#a855f7"
            videos={[
                { title: "The Psychology of Selling", duration: "16:30" },
                { title: "Click-Through Optimization", duration: "21:15" },
                { title: "Copywriting for Conversions", duration: "14:50" }
            ]}
            tools={[
                { title: "Heatmap Analyzer Lite", type: "Software" },
                { title: "High-Ticket Copy Scripts", type: "Document" }
            ]}
        />
    );
}
