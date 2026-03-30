import Link from "next/link";
import Image from "next/image";
import styles from "./landing-header.module.css";

export function LandingHeader() {
  return (
    <header className={styles.wrapper} role="banner">
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="На главную">
          <Image
            src="/icons/system/logo-desktop.svg"
            alt="Setly"
            width={100}
            height={24}
            priority
            className={styles.logo}
            draggable={false}
          />
        </Link>
      </div>
    </header>
  );
}
