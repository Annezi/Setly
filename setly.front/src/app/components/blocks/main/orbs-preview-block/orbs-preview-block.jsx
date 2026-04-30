"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import AnimatedOrbs from "@/app/components/blocks/main/animated-orbs/animated-orbs";
import styles from "./orbs-preview-block.module.css";

export default function OrbsPreviewBlock() {
	const router = useRouter();

	return (
		<section className={styles.block} aria-label="Тест анимации кругов">
			<AnimatedOrbs theme="light" />
			<div className={styles.content}>
				<h2 className={styles.title}>
					<span className={styles.titleLine}>
						<span className={styles.titlePart}>Планируй</span>
						<span className={styles.titlePart}>
							<span className={styles.titleImageWrap}>
								<Image
									src="/img/main/easy.png"
									alt="Легко"
									width={208}
									height={52}
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
									sizes="(max-width: 800px) 70vw, 412px"
									className={`${styles.titleImage} ${styles.titleImageSecond}`}
								/>
							</span>
						</span>
						<span className={styles.titlePart}>уверенно</span>
					</span>
				</h2>
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
