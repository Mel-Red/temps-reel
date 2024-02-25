'use client'
import {useContext, useEffect, useState} from "react";
import styles from "../../../../../page.module.css";
import ListeQuiz from "@/app/components/ListeQuiz";
import {socket} from "@/app/socket";
import {useRouter} from "next/navigation";

export default function Attente() {
    return(
        <div className={styles.main}>
            <ListeQuiz />
        </div>
    )
}