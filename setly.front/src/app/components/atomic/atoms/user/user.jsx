"use client";

import Image from "next/image";
import styles from "./user.module.css";

export default function User({
    name = "User",
    avatarSrc,
    className,
    ...props
}) {
    return (
        <div className={`${styles.user} ${className ?? ""}`} {...props}>
            <span className={styles.avatar} aria-hidden>
                {avatarSrc ? (
                    <Image src={avatarSrc} alt="" width={24} height={24} unoptimized />
                ) : (
                    <span className={styles.avatarPlaceholder} />
                )}
            </span>
            <span className="paragraph">{name}</span>
        </div>
    );
}

export function UserDemo() {
    return (
        <div className={styles.demo}>
            <User name="User" />
        </div>
    );
}
