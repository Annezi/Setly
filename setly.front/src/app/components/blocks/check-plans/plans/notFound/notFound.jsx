import Image from "next/image";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.block}>
      <Image
        src="/img/main/notFound.png"
        alt=""
        width={295}
        height={299}
        className={styles.image}
      />
      <h2 className={`title_1 ${styles.title}`}>Пока не собрали</h2>
      <p className={`paragraph ${styles.description}`}>
        По вашему запросу ещё нет чек-планов. Но вы можете создать свой — и,
        может, кому-то он пригодится, как вам.
      </p>
    </div>
  );
}
