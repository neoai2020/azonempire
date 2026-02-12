'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/lib/supabase';
import { LayoutDashboard, Wand2, FolderOpen, Zap, GraduationCap, Settings, LogOut, Crown, Sparkles, Rocket, Briefcase } from 'lucide-react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Wizard', icon: Wand2, href: '/dashboard/wizard' },
    { label: 'My Assets', icon: FolderOpen, href: '/dashboard/assets' },
    { label: 'Boost', icon: Zap, href: '/dashboard/boost' },
    { label: 'Academy', icon: GraduationCap, href: '/dashboard/academy' },
];

const UPGRADE_ITEMS = [
    { id: 'upgrade_10x', label: '10x Profit System', icon: Crown, href: '/dashboard/vip-10x' },
    { id: 'upgrade_dfy', label: 'Done-For-You Vault', icon: Briefcase, href: '/dashboard/dfy-vault' },
    { id: 'upgrade_traffic', label: 'Automation', icon: Rocket, href: '/dashboard/traffic-pro' },
    { id: 'upgrade_conversion', label: 'Infinite', icon: Zap, href: '/dashboard/conversion-master' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [unlockedUpgrades, setUnlockedUpgrades] = useState<string[]>([]);

    useEffect(() => {
        const checkUpgrades = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata?.unlocked_upgrades) {
                setUnlockedUpgrades(user.user_metadata.unlocked_upgrades);
            }
        };
        checkUpgrades();
    }, []);

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

                {/* Show Section Header ONLY if there are unlocked upgrades */}
                {unlockedUpgrades.length > 0 && (
                    <div className={styles.sectionHeader}>
                        <Sparkles size={14} className={styles.sectionHeaderIcon} />
                        <span>MY UPGRADES</span>
                    </div>
                )}

                {/* Render Unlocked Upgrades */}
                {UPGRADE_ITEMS.map((item) => {
                    if (!unlockedUpgrades.includes(item.id)) return null;

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
                            <span className={styles.vipBadge}>UNLOCKED</span>
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
