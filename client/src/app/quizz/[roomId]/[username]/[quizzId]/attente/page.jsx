'use client'
import {useContext, useEffect, useState} from "react";
import styles from "../../../../../page.module.css";
import SalleAttente from "@/app/components/SalleAttente";
import {socket} from "@/app/socket";
import {useRouter} from "next/navigation";


export default function Attente({params}) {
    const [playerList, setPlayerList] = useState(["User1", "User2", "User3"])

    const router = useRouter()

    socket.emit('getRoomUser', (params.roomId))
    socket.on('getRoomUser', (user) => {
        setPlayerList(user)
    })
    socket.on(`quizzStarted${params.roomId}`, () => {
        router.push(`/quizz/${params.roomId}/${params.username}/${params.quizzId}/inGame`)
    })

    const startQuizz = () => {
        socket.emit('startQuizz', (params.roomId))
    }

    useEffect(() => {
        socket.on(`quizzStarted${params.roomId}`, () => {
            router.push(`/quizz/${params.roomId}/${params.username}/${params.quizzId}/inGame`)
        })
    }, [])

    return(
        <div className={styles.main}>
            <SalleAttente playerList={playerList} roomId={params.roomId} startQuizz={startQuizz}/>
        </div>
    )
}