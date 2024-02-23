'use client'
import styles from "../page.module.css";
import axios from "axios";
export default function UserConnectionForm(props) {

    const handleSubmit = async () => {
        axios.get('/api/connexion')
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    return (
        <form className={styles.connectionForm} onSubmit={e => handleSubmit(e)}>
            <div className={styles.formComponent}>
                <label htmlFor={"id"}>Pseudo: </label>
                <input id={"id"} type={"text"} placeholder={"Pseudo"}/>
            </div>
            <div className={styles.formComponent}>
                <label htmlFor={"roomId"}>Rejoindre une room: </label>
                <input id={"roomId"} type={"password"} placeholder={"Id de la salle"}/>
            </div>
            <button type={"submit"}>Se connecter</button>
        </form>
    )
}

// TODO: Créer une manière de se connecter pour créer une room.