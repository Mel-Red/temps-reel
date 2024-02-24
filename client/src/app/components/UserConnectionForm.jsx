'use client'
import styles from "../page.module.css";
import { io } from 'socket.io-client'
import {useEffect, useState} from "react";
export default function UserConnectionForm() {
    const [username, setUsername] = useState("");
    const [roomId, setRoomdId] = useState("")
    const [socket, setSocket] = useState()

    useEffect(() => {
        const socket = io('http://localhost:3000')
        setSocket(socket)
        // socket.emit('joinRoom', {username: username, roomId: roomId});
        // socket.on('joinRoom')
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        socket.emit('joinRoom', {username: username, roomId: roomId});
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

