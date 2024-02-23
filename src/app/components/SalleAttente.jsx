'use client'
import styles from "../page.module.css";
export default function SalleAttente({playerList}) {
    return(
        <div className={styles.playerList}>
            <div className={styles.playerListList}>
                {playerList !== [] ? playerList.map(player => <p>{player}</p>) : <p>Fetching players ... </p>}
            </div>

            <button type={"button"} className={styles.quizzButton}>
                Démarrer le quizz
            </button>
        </div>
    )
}