'use client'
import styles from "../page.module.css";
export default function AdminConnectionForm({setIdAdmin, setPasswordAdmin, onSubmit}) {
    return (
        <form onSubmit={e => onSubmit} className={styles.connectionForm}>
            <div className={styles.formComponent}>
                <label htmlFor={"id"}>Pseudo: </label>
                <input onChange={e => setIdAdmin} id={"id"} type={"text"} placeholder={"Pseudo"}/>
            </div>
            <div className={styles.formComponent}>
                <label htmlFor={"mdp"}>Password: </label>
                <input onChange={e => setPasswordAdmin} id={"mdp"} type={"password"} placeholder={"Password"}/>
            </div>
            <button type={"submit"}>Se connecter</button>
        </form>
    )
}