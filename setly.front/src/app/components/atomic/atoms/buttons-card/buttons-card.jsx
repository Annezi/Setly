"use client";

import { useState } from 'react';
import PublicImage from "@/app/components/globals/public-image";
import styles from "./buttons-card.module.css";

export default function ButtonCard({
    text = "Добавить пункт...",
    disabled = false,
    icon,
    hoverIcon,
    ...props
}) {

    const [isHovered, setIsHovered] = useState(false);


    return (
        <button
            type="button"
            className={styles.cardButton}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {icon && (
                <span className={styles.cardButton__icon}>
                    <span 
                        className={`${styles.cardButton__iconBase} ${styles.cardButton__iconBaseDefault}`}
                    >
                        {icon}
                    </span>
                    {hoverIcon && (
                        <span 
                            className={`${styles.cardButton__iconBase} ${styles.cardButton__iconBaseHover} ${isHovered ? styles.cardButton__iconBaseHoverActive : ''}`}
                        >
                            {hoverIcon}
                        </span>
                    )}
                </span>
            )}
            <span className="subtitle_2">
                {text}
            </span>
        </button>
    );
}

export function ButtonCardDemo(){
    return (
        <div className="ButtonShowcase">
            <ButtonCard 
                text="Добавить пункт..."
                icon={
                    <PublicImage
                        src="/icons/system/CrossMini.svg"
                        alt=""
                        width={9}
                        height={9}
                    />
                }
                hoverIcon={
                    <PublicImage
                        src="/icons/system/CrossMiniDark.svg"
                        alt=""
                        width={9}
                        height={9}
                    />
                }
            ></ButtonCard>
        </div>
    )
}

