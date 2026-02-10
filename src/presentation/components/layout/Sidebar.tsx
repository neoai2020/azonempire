'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import { LayoutDashboard, Wand2, FolderOpen, Zap, GraduationCap, Settings, LogOut, Crown, Sparkles, Rocket } from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Wizard', icon: Wand2, href: '/dashboard/wizard' }, // Note: Wizard might be a separate flow, but linked here
    { label: 'My Assets', icon: FolderOpen, href: '/dashboard/assets' },
    { label: 'Boost', icon: Zap, href: '/dashboard/boost' },
    { label: 'Academy', icon: GraduationCap, href: '/dashboard/academy' },
];

const PREMIUM_ITEMS = [
    { label: 'DFY Vault', icon: Crown, href: '/dashboard/dfy-vault' },
    { label: 'Instant Income', icon: Sparkles, href: '/dashboard/instant-income' },
    { label: 'Autopilot', icon: Rocket, href: '/dashboard/autopilot' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error logging out:', error);
        router.push('/login');
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.logoText}>
                    Azon<span className={styles.empireText}>Empire</span>
                </span>
            </div>

            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                <div className={styles.sectionHeader}>
                    <Sparkles size={14} className={styles.sectionHeaderIcon} />
                    <span>PREMIUM FEATURES</span>
                </div>

                {PREMIUM_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${styles.premiumItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                            <span className={styles.vipBadge}>VIP</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <Link href="/dashboard/settings" className={styles.navItem}>
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                <button onClick={handleLogout} className={styles.navItem} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', font: 'inherit' }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};
