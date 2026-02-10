import React from 'react';
import styles from './GlobalBanner.module.css';
import { Smartphone, ArrowRight, DollarSign } from 'lucide-react';

export default function GlobalBanner() {
    return (
        <div className={styles.bannerContainer}>

            <div className={styles.contentWrapper}>
                <div className={styles.iconWrapper}>
                    <Smartphone size={32} color="white" strokeWidth={1.5} />
                    <div className={styles.coinBadge}>$</div>
                </div>

                <div className={styles.textContent}>
                    <h2 className={styles.title}>Want To Multiply Your Amazon Earnings?</h2>
                    <p className={styles.description}>
                        The AzonEmpire system is powerful, but to scale to truly life-changing income,
                        you need our advanced strategies. Learn how to dominate niches and automate your revenue today.
                    </p>
                </div>
            </div>

            <a
                href="https://www.jvzoo.com/c/86517/415009"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
            >
                <DollarSign size={18} />
                Click Here To Learn How
                <ArrowRight size={18} />
            </a>
        </div>
    );
}
