'use client'
import styles from "../page.module.css";
import {useState} from "react";
import { useRouter } from 'next/navigation'
import {socket} from "@/app/socket";
export default function UserConnectionForm() {
    const [username, setUsername] = useState("");
    const [roomId, setRoomdId] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit('joinRoom', {username, roomId});
        socket.on('roomJoined', ({roomId, username}) => {
            router.push(`/quizz/${roomId}/${username}/quizzSelect`)
        })
    }

    return (
        <form className={styles.connectionForm} onSubmit={e => handleSubmit(e)}>
            <div className={styles.formComponent}>
                <label htmlFor={"id"}>Pseudo: </label>
                <input id={"id"} type={"text"} placeholder={"Pseudo"} value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className={styles.formComponent}>
                <label htmlFor={"roomId"}>Rejoindre une room: </label>
                <input id={"roomId"} type={"password"} placeholder={"Id de la salle"}  value={roomId} onChange={e => setRoomdId(e.target.value)}/>
            </div>
            <button type={"submit"}>Se connecter</button>
        </form>
    )
}

