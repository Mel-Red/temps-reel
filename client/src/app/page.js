import styles from "./page.module.css";
import UserSelector from "@/app/components/UserSelection";

export default function Home() {

  return (
    <main className={styles.main}>
      <UserSelector />
    </main>
  );
}
