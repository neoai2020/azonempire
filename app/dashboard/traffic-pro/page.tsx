'use client';

import React from 'react';
import { Rocket } from 'lucide-react';
import { UpgradePageTemplate } from '@/src/presentation/features/dashboard/components/UpgradePageTemplate';

export default function TrafficProPage() {
    return (
        <UpgradePageTemplate
            title="Traffic Booster PRO"
            description="Instantly flood your assets with high-converting buyer traffic. Bypass the standard SEO wait-times and get eyes on your products TODAY."
            icon={Rocket}
            accentColor="#ec4899"
            videos={[
                { title: "Instant Traffic Sources", duration: "14:20" },
                { title: "Viral Social Loops", duration: "19:45" },
                { title: "Paid Traffic on a Budget", duration: "22:10" }
            ]}
            tools={[
                { title: "Traffic Surge Engine", type: "Software" },
                { title: "Viral Content Templates", type: "Document" }
            ]}
        />
    );
}
