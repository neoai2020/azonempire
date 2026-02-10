import React from 'react';
import { Sidebar } from './Sidebar';
import GlobalBanner from '../ui/GlobalBanner';
import SupportBanner from '../ui/SupportBanner';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <GlobalBanner />
                    {children}
                    <SupportBanner />
                </div>
            </main>
        </div>
    );
};
