'use client'
import styles from "../../../../page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import {socket} from "@/app/socket";

export default function QuizzSelect({params}) {
    const [username, setUsername] = useState(params.username)
    const [roomId, setRoomId] = useState(params.roomId)
    const [quizzs, setQuizzs] = useState([
        {
            id: 1,
            libelle: "Questionnaire culture G",
            questionsId: [1,2,3,4,5,6]
        },
        {
            id: 2,
            libelle: "Questionnaire culture Histoire",
            questionsId: [7,8,9,10,11]
        },
        {
            id: 1,
            libelle: "Questionnaire culture Math",
            questionsId: [12,13,14,15,16]
        },
    ])

    const router = useRouter()

    const goToQuizz = (e, quizzId) => {
        socket.emit('setQuizzId', ({quizzId, roomId}))
        socket.on('quizzIdSet', () => {
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