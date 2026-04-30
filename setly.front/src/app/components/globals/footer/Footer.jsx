'use client';

import Link from 'next/link';
import PublicImage from '@/app/components/globals/public-image';
import Button from '@/app/components/atomic/atoms/buttons/buttons';
import AnimatedOrbs from '@/app/components/blocks/main/animated-orbs/animated-orbs';
import styles from './footer.module.css';

export function Footer() {
    return (
        <footer className={styles.wrapper} role="contentinfo">
            <div className={styles.bg} aria-hidden />
            <AnimatedOrbs theme="footer" className={styles.orbsLayer} />
            <div className={styles.content}>
                <div className={styles.ctaBlock}>
                    <h2 className={`${styles.title} title_1 title_1-mobile`}>Мы в телеграме</h2>
                    <p className={`${styles.description} paragraph paragraph-mobile`}>
                        Советы и чек-планы, только то, что поможет собраться
                    </p>
                    <div className={styles.ctaButtonWrap}>
                        <Link href="https://t.me/setly_space" target="_blank" rel="noopener noreferrer">
                        <Button
                        color="white"
                        Text="Присоединиться"
                        icon={
                            <PublicImage
                                src="/icons/system/TG.svg"
                                alt=""
                                width={16}
                                height={16}
                            />
                        }
                    />
                        </Link>
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <p className={`${styles.subinfoLeft} subinfo`}>
                        ©2025 Setly. Когда подготовка исчезает — остаётся только предвкушение
                    </p>
                    <div className={styles.subinfoRight}>
                        <Link href="/privacy" className="subinfo">
                            Политика конфиденциальности
                        </Link>
                        <Link href="/terms" className="subinfo">
                            Пользовательское соглашение
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
