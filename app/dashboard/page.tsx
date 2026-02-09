'use client';

import React, { useEffect, useState } from 'react';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { StatTile } from '@/components/dashboard/StatTile';
import { MousePointerClick, Eye, Layers, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project, DashboardStats } from '@/types';

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        total_assets: 0,
        total_views: 0,
        outbound_clicks: 0,
        conversion_estimation: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch projects
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('*')
                    .order('last_updated', { ascending: false });

                if (projectsError) throw projectsError;
                if (projectsData) setProjects(projectsData);

                // In a real app, stats would be aggregated or fetched from a stats table
                // For now, let's aggregate them from projects or use mock stats if table doesn't exist
                const aggregateStats: DashboardStats = {
                    total_assets: projectsData?.length || 0,
                    total_views: projectsData?.reduce((acc, p) => acc + (p.views || 0), 0) || 0,
                    outbound_clicks: projectsData?.reduce((acc, p) => acc + (p.clicks || 0), 0) || 0,
                    conversion_estimation: (projectsData?.reduce((acc, p) => acc + (p.clicks || 0), 0) || 0) * 2.5, // Mock multiplier
                };
                setStats(aggregateStats);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading your empire...</div>;
    }

    return (
        <div>
            <VideoCard />

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Performance Overview</h3>

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

            <div style={{
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
