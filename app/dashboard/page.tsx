'use client';

import React from 'react';
import { OnboardingSection } from '@/src/presentation/features/dashboard/components/OnboardingSection';
import { StatTile } from '@/src/presentation/features/dashboard/components/StatTile';
import { useDashboardStats } from '@/src/presentation/features/dashboard/hooks/useDashboardStats';
import { MousePointerClick, Eye, Layers, TrendingUp, Rocket, GraduationCap, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const { projects, stats, loading, error } = useDashboardStats();

    const onboardingSteps = [
        {
            id: 1,
            title: 'Create Your First Asset',
            description: 'Use our AI Wizard to find products and generate high-converting content.',
            icon: Rocket,
            action: () => router.push('/dashboard/wizard'),
            completed: projects.length > 0,
            cta: projects.length > 0 ? 'Create Another' : 'Start Wizard'
        },
        {
            id: 2,
            title: 'Learn the System',
            description: 'Master the AzonEmpire strategies to maximize your affiliate commissions.',
            icon: GraduationCap,
            action: () => router.push('/dashboard/academy'),
            completed: false, // Could be linked to a 'training_completed' flag in user metadata later
            cta: 'Explore Academy'
        },
        {
            id: 3,
            title: 'Boost Your Assets',
            description: 'Generate AI marketing content to drive massive traffic to your reviews.',
            icon: Sparkles,
            action: () => router.push('/dashboard/boost'),
            completed: false,
            cta: 'Boost Now'
        }
    ];

    const completedCount = onboardingSteps.filter(s => s.completed).length;

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading your empire...</div>;
    }

    if (error) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
            <OnboardingSection
                steps={onboardingSteps}
                completedCount={completedCount}
                totalCount={3}
            />

            <h3 id="performance-overview" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Performance Overview</h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: '40px'
            }}>
                <StatTile
                    label="Total Assets"
                    value={stats.total_assets.toString()}
                    icon={Layers}
                    trend="Updated live"
                    trendUp
                />
                <StatTile
                    label="Total Views"
                    value={stats.total_views.toLocaleString()}
                    icon={Eye}
                    trend="Overall"
                    trendUp
                />
                <StatTile
                    label="Outbound Clicks"
                    value={stats.outbound_clicks.toLocaleString()}
                    icon={MousePointerClick}
                    trend="Across all projects"
                    trendUp
                />
                <StatTile
                    label="Conversion Estimation"
                    value={`$${stats.conversion_estimation.toLocaleString()}`}
                    icon={TrendingUp}
                />
            </div>

            <div id="recent-assets" style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                padding: '24px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Assets</h3>
                    <button style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }}>View All</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                            <th style={{ padding: '12px 0', fontWeight: 500 }}>Asset Name</th>
                            <th style={{ padding: '12px 0', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '12px 0', fontWeight: 500 }}>Views</th>
                            <th style={{ padding: '12px 0', fontWeight: 500 }}>Clicks</th>
                            <th style={{ padding: '12px 0', fontWeight: 500 }}>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No assets found. Start by creating one!
                                </td>
                            </tr>
                        ) : projects.map((project, i) => (
                            <tr key={project.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <td style={{ padding: '16px 0', fontWeight: 500 }}>{project.name}</td>
                                <td style={{ padding: '16px 0' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        background: project.status === 'Live' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                        color: project.status === 'Live' ? 'var(--success)' : 'var(--text-muted)',
                                        border: `1px solid ${project.status === 'Live' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`
                                    }}>
                                        {project.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 0', color: 'var(--text-dim)' }}>{project.views}</td>
                                <td style={{ padding: '16px 0', color: 'var(--text-dim)' }}>{project.clicks}</td>
                                <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{new Date(project.last_updated).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
