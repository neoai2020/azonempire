'use client';

import React from 'react';
import { Button } from '@/src/presentation/components/ui/Button';
import { Plus, Edit, ExternalLink, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAssets } from '@/src/presentation/features/assets/hooks/useAssets';

export default function MyAssetsPage() {
    const router = useRouter();
    const { projects, loading, error, handleDelete } = useAssets();

    const handleCreateNew = () => {
        router.push('/dashboard/wizard');
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/assets/edit/${id}`);
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading assets...</div>;
    }

    if (error) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    }

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

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>Loading assets...</div>
            ) : (
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
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No assets found. Start by creating one!
                                    </td>
                                </tr>
                            ) : projects.map((project) => (
                                <tr key={project.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                    <td style={{ padding: '16px 24px', fontWeight: 500 }}>{project.name}</td>
                                    <td style={{ padding: '16px 24px' }}>
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
                                    <td style={{ padding: '16px 24px', color: 'var(--text-dim)' }}>
                                        {project.views} views · {project.clicks} clicks
                                    </td>
                                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>
                                        {new Date(project.last_updated).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '16px 24px', display: 'flex', gap: '8px' }}>
                                        <button
                                            title="Edit"
                                            onClick={() => router.push(`/dashboard/assets/edit/${project.id}`)}
                                            style={{ padding: '8px', color: 'var(--text-muted)', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            title="Delete"
                                            onClick={() => handleDelete(project.id)}
                                            style={{ padding: '8px', color: 'var(--danger)', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        {project.status === 'Live' && (
                                            <button
                                                title="View Live"
                                                onClick={() => window.open(`${window.location.origin}/${project.slug}`, '_blank')}
                                                style={{ padding: '8px', color: 'var(--text-muted)', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
