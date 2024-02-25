'use client'
import styles from "../../../../page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {socket} from "@/app/socket";
import data from "@/app/data/quizz.json"

export default function QuizzSelect({params}) {
    const [username, setUsername] = useState(params.username)
    const [roomId, setRoomId] = useState(params.roomId)
    const [quizzs, setQuizzs] = useState(data.quizzs)

    const router = useRouter()

    const goToQuizz = (e, quizzId) => {
        socket.emit('setQuizzId', ({quizzId, roomId}))
        socket.on('quizzIdSet', () => {
            localStorage.setItem('roomCreator', 'true')
            router.push(`/quizz/${roomId}/${username}/${quizzId}/attente`)
        })
    }

    useEffect(() => {
        // Logique pour récupérer les quizz disponibles depuis le serveur.
        // setQuizz()
    }, []);

    return (
        <div className={styles.quizzSelectorContainer}>
            <h2>Liste des quizz</h2>
            <div className={styles.quizzContainer}>
                {quizzs && quizzs.map((quizz) => <button onClick={e => goToQuizz(e, quizz.id)} className={styles.quizzSelectorButton} key={quizz.id}>{quizz.libelle}</button>)}
            </div>
        </div>
    )
}