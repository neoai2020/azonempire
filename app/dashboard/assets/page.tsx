'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, ExternalLink, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MyAssetsPage() {
    const router = useRouter();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>My Assets</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your deployed review pages.</p>
                </div>
                <Button onClick={() => router.push('/dashboard/wizard')}>
                    <Plus size={18} /> Create New Asset
                </Button>
            </div>

            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Asset Name</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Status</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Performance</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Last Edited</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Sony WH-1000XM4 Review', status: 'Live', views: '1.2k', clicks: 86, edited: '2 days ago' },
                            { name: 'Best Air Fryers 2024', status: 'Draft', views: '-', clicks: '-', edited: '5 hours ago' },
                            { name: 'Mechanical Keyboards Guide', status: 'Live', views: '405', clicks: 18, edited: '1 week ago' }
                        ].map((asset, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{asset.name}</td>
                                <td style={{ padding: '16px 24px' }}>
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
                                <td style={{ padding: '16px 24px', color: 'var(--text-dim)' }}>
                                    {asset.views} views · {asset.clicks} clicks
                                </td>
                                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{asset.edited}</td>
                                <td style={{ padding: '16px 24px', display: 'flex', gap: '8px' }}>
                                    <button title="Edit" style={{ padding: '8px', color: 'var(--text-muted)', borderRadius: '4px' }}>
                                        <Edit size={16} />
                                    </button>
                                    {asset.status === 'Live' && (
                                        <button title="View Live" style={{ padding: '8px', color: 'var(--text-muted)', borderRadius: '4px' }}>
                                            <ExternalLink size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
