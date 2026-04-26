import Link from "next/link";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import styles from "@/app/legal/legal.module.css";

export const metadata = {
  title: "Пользовательское соглашение",
  description:
    "Пользовательское соглашение сервиса Setly: условия использования сервиса, права и обязанности сторон.",
  alternates: {
    canonical: "https://setly.space/terms",
  },
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
        <Header />
      </div>
      <main className={styles.main}>
        <div className={`container ${styles.container}`}>
          <article className={`${styles.card} main-page-reveal__item`} style={{ "--reveal-delay": "70ms" }}>
            <h1 className="title_1">Пользовательское соглашение Setly</h1>
            <p className={`${styles.updatedAt} subinfo`}>Дата последнего обновления: 26 апреля 2026 года</p>
            <p className={`${styles.lead} paragraph`}>
              Настоящее Соглашение регулирует отношения между пользователем и сервисом Setly при использовании сайта
              и доступного функционала.
            </p>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>1. Предмет соглашения</h2>
              <p className={styles.paragraph}>
                Setly предоставляет пользователю доступ к функционалу для просмотра, создания, редактирования и
                хранения чек-планов для поездок, а также к сопутствующим информационным материалам.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>2. Регистрация и аккаунт</h2>
              <ul className={styles.list}>
                <li>Для доступа к отдельным функциям требуется регистрация и создание учетной записи.</li>
                <li>Пользователь обязуется предоставлять достоверные данные и поддерживать их актуальность.</li>
                <li>
                  Пользователь несет ответственность за сохранность учетных данных и действия, совершенные в аккаунте.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>3. Правила использования сервиса</h2>
              <ul className={styles.list}>
                <li>Запрещено использовать сервис в целях, нарушающих законодательство.</li>
                <li>
                  Запрещено размещать вредоносный, оскорбительный или заведомо незаконный контент, нарушающий права
                  третьих лиц.
                </li>
                <li>
                  Запрещены попытки несанкционированного доступа, нарушения работы сервиса и обхода технических
                  ограничений.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>4. Интеллектуальные права</h2>
              <p className={styles.paragraph}>
                Права на программный код, дизайн, структуру и иные элементы сервиса принадлежат правообладателю
                Setly. Пользователь сохраняет права на свой контент, размещенный в сервисе.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>5. Ограничение ответственности</h2>
              <ul className={styles.list}>
                <li>Сервис предоставляется «как есть» и может обновляться или изменяться без предварительного уведомления.</li>
                <li>Мы прикладываем усилия для бесперебойной работы, но не гарантируем абсолютную доступность сервиса.</li>
                <li>
                  Setly не несет ответственности за убытки, возникшие в результате невозможности использования сервиса
                  по причинам, не зависящим от нас.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>6. Прекращение доступа</h2>
              <p className={styles.paragraph}>
                Мы можем ограничить или прекратить доступ пользователя к сервису при нарушении настоящего Соглашения,
                требований безопасности или законодательства.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>7. Заключительные положения</h2>
              <p className={styles.paragraph}>
                Продолжение использования сервиса означает принятие условий настоящего Соглашения и{" "}
                <Link href="/privacy" className={styles.link}>
                  Политики конфиденциальности
                </Link>
                .
              </p>
              <p className={styles.paragraph}>
                Мы вправе вносить изменения в текст Соглашения. Актуальная редакция публикуется на этой странице.
              </p>
            </section>
          </article>
        </div>
      </main>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "130ms" }}>
        <Footer />
      </div>
    </div>
  );
}
