'use client'
import {useEffect, useState} from "react";
import styles from "../../../page.module.css";
import SalleAttente from "@/app/components/SalleAttente";
import axios from "axios";

export default function Attente({params}) {
    const [playerList, setPlayerList] = useState(["Todd", "PabloX9", "XxX_CHARl3_XxX"])

    const onsubmit = async () => {
        await axios.get(`/api/quizz/${params.quizzId}`)
    }

    useEffect(() => {
    //     Code to fetch all players in the room: socket.io
    }, [playerList])

    return(
        <div className={styles.main}>
            <SalleAttente playerList={playerList}/>
        </div>
    )
}