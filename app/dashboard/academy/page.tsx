export default function AcademyPage() {
    return (
        <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '32px' }}>Academy</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px'
                    }}>
                        <div style={{ height: '160px', background: '#222', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                            Video Placeholder
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>How to find winning keywords</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Learn the strategies used by top affiliates.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
