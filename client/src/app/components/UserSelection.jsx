import Link from "next/link";
import styles from "../page.module.css";
export default function UserSelector() {
    return (
        <div className={styles.userSelectorContainer}>
            <Link href={'/connexion/admin'}>Administrateur</Link>
            <Link href={'/connexion/joueur'}>Joueur</Link>
        </div>
    )
}