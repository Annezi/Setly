"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import styles from "./welcome-screen.module.css";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<section className={styles.block} aria-label="Приветственный экран">
			<Image
				src="/img/main/welcome-banner.webp"
				alt=""
				fill
				priority
				fetchPriority="high"
				sizes="(max-width: 800px) 100vw, 1400px"
				className={styles.backgroundImage}
			/>
			<div className={styles.content}>
				<h1 className={styles.title}>
					<span className={styles.titleLine}>
						<span className={styles.titlePart}>Планируй</span>
						<span className={styles.titlePart}>
							<span className={styles.titleImageWrap}>
								<Image
									src="/img/main/easy.png"
									alt="Легко"
									width={208}
									height={52}
									priority
									fetchPriority="high"
									sizes="(max-width: 800px) 50vw, 208px"
									className={styles.titleImage}
								/>
							</span>
						</span>
					</span>
					<span className={styles.titleLine}>
						<span className={styles.titlePart}>
							<span className={styles.titleImageWrap}>
								<Image
									src="/img/main/explore.png"
									alt="Путешествуй"
									width={412}
									height={73}
									priority
									fetchPriority="high"
									sizes="(max-width: 800px) 70vw, 412px"
									className={`${styles.titleImage} ${styles.titleImageSecond}`}
								/>
							</span>
						</span>
						<span className={styles.titlePart}>уверенно</span>
					</span>
				</h1>
				<p className={styles.subinfo}>
					Скажи «пока» тревоге при планировании путешествий! Мы разработали
					чек-планы, которые помогут ничего не упустить и отправиться в путь
					уверенно.
				</p>
				<Button
					Text="Вперед к чек-планам"
					color="white"
					onClick={() => router.push("/check-plans")}
				/>
			</div>
		</section>
	);
}
