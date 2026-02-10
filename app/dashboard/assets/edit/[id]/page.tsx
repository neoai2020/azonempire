'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Project } from '@/src/domain/entities';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { ArrowLeft, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAssetEdit } from '@/src/presentation/features/assets/hooks/useAssetEdit';

export default function EditAssetPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { project, loading, saving, error, handleSave, updateProjectField } = useAssetEdit(id);

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    if (error || !project) {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error || 'Project not found'}</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <button
                    onClick={() => router.back()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        marginBottom: '16px'
                    }}
                >
                    <ArrowLeft size={16} /> Back to Assets
                </button>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Edit Asset</h1>
                <p style={{ color: 'var(--text-muted)' }}>Update your asset details and content.</p>
            </div>

            <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px'
            }}>
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Project Name</label>
                        <Input
                            value={project.name}
                            onChange={(e) => updateProjectField('name', e.target.value)}
                            placeholder="e.g. Best Gaming Laptops"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Slug (URL)</label>
                        <Input
                            value={project.slug}
                            onChange={(e) => updateProjectField('slug', e.target.value)}
                            placeholder="best-gaming-laptops"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Affiliate Link</label>
                        <Input
                            value={project.affiliate_link || ''}
                            onChange={(e) => updateProjectField('affiliate_link', e.target.value)}
                            placeholder="https://amazon.com/..."
                        />
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '24px 0' }} />

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>Content</h3>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Review Title</label>
                        <Input
                            value={project.review_title || ''}
                            onChange={(e) => updateProjectField('review_title', e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Verdict</label>
                        <textarea
                            value={project.review_verdict || ''}
                            onChange={(e) => updateProjectField('review_verdict', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--bg-app)',
                                border: '1px solid var(--border-input)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                minHeight: '100px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
                        <textarea
                            value={project.review_description || ''}
                            onChange={(e) => updateProjectField('review_description', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--bg-app)',
                                border: '1px solid var(--border-input)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                minHeight: '200px'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
                        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button onClick={handleSave} disabled={saving}>
                            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
