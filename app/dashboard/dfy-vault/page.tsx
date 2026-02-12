'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import { UpgradePageTemplate } from '@/src/presentation/features/dashboard/components/UpgradePageTemplate';

export default function DFYVaultPage() {
    return (
        <UpgradePageTemplate
            title="Done-For-You Vault"
            description="Skip the work and jump straight to the results. Access our private collection of pre-built, ready-to-deploy Amazon niche assets."
            icon={Briefcase}
            accentColor="#10b981"
            videos={[
                { title: "Deploying from the Vault", duration: "08:20" },
                { title: "Customizing Pre-Built Assets", duration: "12:10" }
            ]}
            tools={[
                { title: "Asset Importer PRO", type: "Software" },
                { title: "Pre-Vetted Niche List", type: "Document" }
            ]}
        />
    );
}
