'use client';

import React from 'react';
import { Headset } from 'lucide-react';
import styles from './SupportBanner.module.css';

export default function SupportBanner() {
    return (
        <div id="support-banner" className={styles.bannerContainer}>
            <div className={styles.contentWrapper}>
                <div className={styles.iconCircle}>
                    <Headset size={28} strokeWidth={1.5} />
                </div>

                <div className={styles.textContent}>
                    <h3 className={styles.title}>Need Help?</h3>
                    <p className={styles.description}>
                        Our support team is here to assist you 24/7
                    </p>
                </div>
            </div>

            <a
                href="mailto:AzonempireAI@neoai.freshdesk.com"
                className={styles.actionButton}
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
                Contact Support
            </a>
        </div>
    );
}
