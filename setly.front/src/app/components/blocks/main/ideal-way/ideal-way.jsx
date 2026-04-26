"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./ideal-way.module.css";

export default function OurCommunity() {
    const router = useRouter();

    return (
        <section className={styles.block}>
            <div className={styles.leftPart}>
                <Image
                    src="/img/main/suit-case.png"
                    alt=""
                    width={572}
                    height={572}
                    className={styles.suitcaseImage}
                    unoptimized
                />
            </div>
            <div className={styles.rightPart}>
                <div className={styles.rightPartHeader}>
                    <h2 className={`${styles.title} title_1`}>
                        {applyTypograf("С нами — те, кто уже знает, что взять")}
                    </h2>
                </div>
                <div className={styles.rightPartContent}>
                    <div className={styles.avatars}>
                        <Image
                            src="/img/main/our-exp-avatar-1.png"
                            alt=""
                            width={64}
                            height={64}
                            className={styles.avatar}
                            unoptimized
                        />
                        <Image
                            src="/img/main/our-exp-avatar-2.png"
                            alt=""
                            width={64}
                            height={64}
                            className={styles.avatar}
                            unoptimized
                        />
                        <Image
                            src="/img/main/our-exp-avatar-3.png"
                            alt=""
                            width={64}
                            height={64}
                            className={styles.avatar}
                            unoptimized
                        />
                    </div>
                    <div className={styles.descriptionWrap}>
                        <p className={`${styles.description} paragraph`}>
                            {applyTypograf(
                                "Мы уже прошли этот путь — и знаем, каково это: забыть адаптер, потерять билет, нервничать перед вылетом."
                            )}
                        </p>
                        <p className={`${styles.description} paragraph`}>
                            {applyTypograf(
                                "Присоединяйтесь — и создавайте чек-планы, которые работают именно для вас."
                            )}
                        </p>
                    </div>
                    <div className={styles.buttonWrap}>
                        <Button
                            Text={applyTypograf("Зарегистрироваться")}
                            color="white"
                            onClick={() => router.push("/registration")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
