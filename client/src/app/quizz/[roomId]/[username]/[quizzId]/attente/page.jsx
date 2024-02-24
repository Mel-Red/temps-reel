'use client'
import {useContext, useEffect, useState} from "react";
import styles from "../../../../../page.module.css";
import SalleAttente from "@/app/components/SalleAttente";
import {socket} from "@/app/socket";

export default function Attente({params}) {
    const [playerList, setPlayerList] = useState(["Todd", "PabloX9", "XxX_CHARl3_XxX"])

    socket.emit('getRoomUser', (params.roomId))
    socket.on('getRoomUser', (user) => {
        setPlayerList(user)
    })

    const startQuizz = () => {

    }

    return(
        <div className={styles.main}>
            <SalleAttente playerList={playerList} startQuizz={startQuizz}/>
        </div>
    )
}