import Link from "next/link";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import styles from "@/app/legal/legal.module.css";

export const metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности сервиса Setly: какие данные мы собираем, как используем и как защищаем персональные данные пользователей.",
  alternates: {
    canonical: "https://setly.space/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={`container ${styles.container}`}>
          <article className={`${styles.card} main-page-reveal__item`} style={{ "--reveal-delay": "70ms" }}>
            <h1 className="title_1">Политика конфиденциальности Setly</h1>
            <p className={`${styles.updatedAt} subinfo`}>Дата последнего обновления: 26 апреля 2026 года</p>
            <p className={`${styles.lead} paragraph`}>
              Настоящая Политика описывает, какие данные пользователей обрабатывает сервис Setly, для каких целей,
              на каком основании и как пользователь может управлять своими данными.
            </p>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>1. Какие данные мы обрабатываем</h2>
              <ul className={styles.list}>
                <li>Данные аккаунта: адрес электронной почты, никнейм, пароль (в защищенном виде).</li>
                <li>Данные профиля: фото профиля и иные сведения, которые пользователь добавляет в профиль.</li>
                <li>Пользовательский контент: созданные и отредактированные чек-планы, отметки «избранное».</li>
                <li>Технические данные: информация об устройстве, браузере, IP-адресе, cookie/локальное хранилище.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>2. Цели обработки данных</h2>
              <ul className={styles.list}>
                <li>Регистрация, авторизация и управление учетной записью пользователя.</li>
                <li>Предоставление функций сервиса: создание, хранение, редактирование и отображение чек-планов.</li>
                <li>Обеспечение безопасности, предотвращение злоупотреблений и техническая диагностика.</li>
                <li>Улучшение качества сервиса, интерфейса и пользовательского опыта.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>3. Правовые основания обработки</h2>
              <p className={styles.paragraph}>
                Обработка персональных данных осуществляется на основании согласия пользователя, а также в целях
                исполнения пользовательского соглашения и предоставления функционала сервиса.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>4. Передача и хранение данных</h2>
              <ul className={styles.list}>
                <li>Мы не продаем персональные данные третьим лицам.</li>
                <li>
                  Данные могут передаваться подрядчикам, которые обеспечивают хостинг, безопасность и техническую
                  поддержку сервиса, в объеме, необходимом для оказания таких услуг.
                </li>
                <li>
                  Данные хранятся в течение срока действия аккаунта, а также в пределах сроков, необходимых для
                  выполнения обязательств и соблюдения требований применимого законодательства.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>5. Права пользователя</h2>
              <ul className={styles.list}>
                <li>Получать сведения об обработке своих персональных данных.</li>
                <li>Обновлять и корректировать данные в настройках профиля.</li>
                <li>Требовать удаления аккаунта и прекращения обработки, если это не противоречит закону.</li>
                <li>Отозвать согласие на обработку персональных данных.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>6. Безопасность</h2>
              <p className={styles.paragraph}>
                Мы применяем разумные организационные и технические меры защиты данных от утраты, неправомерного
                доступа, изменения и распространения.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={`${styles.sectionTitle} subtitle_1`}>7. Изменения политики</h2>
              <p className={styles.paragraph}>
                Мы можем обновлять настоящую Политику. Актуальная редакция всегда размещается на этой странице.
              </p>
              <p className={styles.paragraph}>
                Используя сервис, пользователь также подтверждает согласие с{" "}
                <Link href="/terms" className={styles.link}>
                  Пользовательским соглашением
                </Link>
                .
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
