"use client";

import Button from "../../../atomic/atoms/buttons/buttons";
import styles from "./three-steps.module.css";

const steps = [
    {
        image: "/img/main/step-1.png",
        title: "Шаг 1",
        subtitle: "Выберите тип поездки",
        description:
            "Город, пляж, горы, командировка — мы подскажем, что важно взять",
        rotation: "left",
    },
    {
        image: "/img/main/step-2.png",
        title: "Шаг 2",
        subtitle: "Отредактируйте план",
        description:
            "Уберите лишнее, добавьте своё — ваш чек-план должен быть вашим",
        rotation: "none",
    },
    {
        image: "/img/main/step-3.png",
        title: "Шаг 3",
        subtitle: "Готово. Можно ехать",
        description:
            "Все документы, вещи, маршруты — в одном месте. Без стресса",
        rotation: "right",
    },
];

export default function ThreeSteps() {
    return (
        <div className={styles.wrapper}>
        <section className={styles.block}>
            <h2 className={`${styles.title} title_1`}>
                Три шага для идеального плана
            </h2>

            <div className={styles.cards}>
                {steps.map((step) => {
                    let cardClass = styles.card;
                    if (step.rotation === "left") cardClass += ` ${styles["card--rotateLeft"]}`;
                    if (step.rotation === "right") cardClass += ` ${styles["card--rotateRight"]}`;
                    return (
                    <article
                        key={step.title}
                        className={cardClass}
                    >
                        <img
                            src={step.image}
                            alt=""
                            className={styles.cardImage}
                        />
                        <h3 className={`${styles.cardTitle} subtitle_1`}>
                            {step.title}
                        </h3>
                        <p className={`${styles.cardSubtitle} subtitle_1`}>
                            {step.subtitle}
                        </p>
                        <p className={`${styles.cardDescription} subinfo`}>
                            {step.description}
                        </p>
                    </article>
                    );
                })}
            </div>

            <div className={styles.buttonWrap}>
                <Button Text="Создать чек-план" color="blue" />
            </div>
        </section>
        </div>
    );
}
