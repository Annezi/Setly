"use client";

import Image from "next/image";
import styles from "./animated-orbs.module.css";

const ORBS = [
	{ src: "/img/main/animation/anim1.svg", alt: "Анимированный круг 1" },
	{ src: "/img/main/animation/anim2.svg", alt: "Анимированный круг 2" },
	{ src: "/img/main/animation/anim3.svg", alt: "Анимированный круг 3" },
	{ src: "/img/main/animation/anim4.svg", alt: "Анимированный круг 4" },
];

export default function AnimatedOrbs({ className = "", theme = "default" }) {
	const themeClass =
		theme === "light" ? styles.lightTheme : theme === "footer" ? styles.footerTheme : "";

	return (
		<div className={`${styles.root} ${themeClass} ${className}`.trim()} aria-hidden="true">
			{ORBS.map((orb, index) => (
				<div key={orb.src} className={`${styles.orb} ${styles[`orb${index + 1}`]}`}>
					<Image src={orb.src} alt={orb.alt} fill sizes="65vw" className={styles.image} />
				</div>
			))}
		</div>
	);
}
