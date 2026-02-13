'use client';
export default function TestPage() {
    return (
        <div style={{ padding: '100px', textAlign: 'center', fontSize: '2rem' }}>
            <h1>DEPLOYMENT IS WORKING!</h1>
            <p>Version: 1.0.9</p>
            <p>Time: {new Date().toISOString()}</p>
        </div>
    );
}
