"use client";

import { useRouter } from "next/navigation";
import Button from "../../../atomic/atoms/buttons/buttons";
import styles from "./ideal-way.module.css";

export default function OurCommunity() {
    const router = useRouter();

    return (
        <section className={styles.block}>
            <div className={styles.leftPart}>
                <img
                    src="/img/main/suit-case.png"
                    alt=""
                    className={styles.suitcaseImage}
                />
            </div>
            <div className={styles.rightPart}>
                <div className={styles.rightPartHeader}>
                    <h2 className={`${styles.title} title_1`}>
                        С нами — те, кто уже знает, что взять
                    </h2>
                </div>
                <div className={styles.rightPartContent}>
                    <div className={styles.avatars}>
                        <img
                            src="/img/main/our-exp-avatar-1.png"
                            alt=""
                            className={styles.avatar}
                        />
                        <img
                            src="/img/main/our-exp-avatar-2.png"
                            alt=""
                            className={styles.avatar}
                        />
                        <img
                            src="/img/main/our-exp-avatar-3.png"
                            alt=""
                            className={styles.avatar}
                        />
                    </div>
                    <div className={styles.descriptionWrap}>
                        <p className={`${styles.description} paragraph`}>
                            Мы уже прошли этот путь — и знаем, каково это: забыть адаптер, потерять билет, нервничать перед вылетом.
                        </p>
                        <p className={`${styles.description} paragraph`}>
                            Присоединяйтесь — и создавайте чек-планы, которые работают именно для вас.
                        </p>
                    </div>
                    <div className={styles.buttonWrap}>
                        <Button
                            Text="Зарегистрироваться"
                            color="white"
                            onClick={() => router.push("/registration")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
