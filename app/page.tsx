import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      gap: '24px' 
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>AzonEmpire</h1>
      <p style={{ color: 'var(--text-muted)' }}>The Asset Activation Machine</p>
      
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link 
          href="/login" 
          style={{ 
            padding: '12px 24px', 
            background: 'var(--primary)', 
            borderRadius: 'var(--radius-md)', 
            fontWeight: 600 
          }}
        >
          Login
        </Link>
        <Link 
          href="/dashboard" 
          style={{ 
            padding: '12px 24px', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)', 
            fontWeight: 600 
          }}
        >
          Dashboard (Dev)
        </Link>
      </div>
    </main>
  );
}
