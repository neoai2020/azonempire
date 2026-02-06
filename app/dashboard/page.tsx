import React from 'react';
import { VideoCard } from '@/components/dashboard/VideoCard';
import { StatTile } from '@/components/dashboard/StatTile';
import { MousePointerClick, Eye, Layers, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
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
                    value="3"
                    icon={Layers}
                    trend="2 new this week"
                    trendUp
                />
                <StatTile
                    label="Total Views"
                    value="1,248"
                    icon={Eye}
                    trend="12%"
                    trendUp
                />
                <StatTile
                    label="Outbound Clicks"
                    value="86"
                    icon={MousePointerClick}
                    trend="5%"
                    trendUp
                />
                <StatTile
                    label="Conversion Estimation"
                    value="$240"
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
                        {[
                            { name: 'Sony WH-1000XM4 Review', status: 'Live', views: 843, clicks: 42, date: '2 days ago' },
                            { name: 'Best Air Fryers 2024', status: 'Draft', views: '-', clicks: '-', date: '5 hours ago' },
                            { name: 'Mechanical Keyboards Guide', status: 'Live', views: 405, clicks: 18, date: '1 week ago' },
                        ].map((asset, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <td style={{ padding: '16px 0', fontWeight: 500 }}>{asset.name}</td>
                                <td style={{ padding: '16px 0' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        background: asset.status === 'Live' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                        color: asset.status === 'Live' ? 'var(--success)' : 'var(--text-muted)',
                                        border: `1px solid ${asset.status === 'Live' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`
                                    }}>
                                        {asset.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 0', color: 'var(--text-dim)' }}>{asset.views}</td>
                                <td style={{ padding: '16px 0', color: 'var(--text-dim)' }}>{asset.clicks}</td>
                                <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{asset.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
