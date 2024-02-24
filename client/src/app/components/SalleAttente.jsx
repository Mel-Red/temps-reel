'use client'
import styles from "../page.module.css";
export default function SalleAttente(props) {

    return(
        <div className={styles.playerList}>
            <div className={styles.playerListList}>
                {props.playerList !== [] ? props.playerList.map(player => <p>{player}</p>) : <p>Fetching players ... </p>}
            </div>

            <button type={"button"} onClick={props.startQuizz} className={styles.quizzButton}>
                Démarrer le quizz
            </button>
        </div>
    )
}