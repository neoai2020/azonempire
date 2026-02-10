import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './StatTile.module.css';

interface StatTileProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export const StatTile: React.FC<StatTileProps> = ({ label, value, icon: Icon, trend, trendUp }) => {
    return (
        <div className={`glass ${styles.card}`}>
            <div className={styles.header}>
                <span className={styles.label}>{label}</span>
                <Icon size={18} className={styles.icon} />
            </div>

            <div className={styles.main}>
                <span className={styles.value}>{value}</span>
            </div>

            {trend && (
                <div className={`${styles.trend} ${trendUp ? styles.up : styles.down}`}>
                    {trendUp ? '↑' : '↓'} {trend}
                </div>
            )}
        </div>
    );
};
