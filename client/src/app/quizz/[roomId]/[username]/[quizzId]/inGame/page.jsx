'use client'
import styles from "../../../../../page.module.css";
import {useEffect, useState} from "react";
import data from "@/app/data/quizz.json"
export default function Question({params}) {
    const [questionSimple, setQuestionSimple] = useState()
    const [questionMultiple, setQuestionMultiple] = useState()
    const [reponseSimple, setReponseSimple] = useState("")
    const [reponseMultiple, setReponseMultiple] = useState()
    const [reponseMultipleSelected, setReponseMultipleSelected] = useState()
    const [quizz, setQuizz] = useState()

    useEffect(() => {
        const getQuizz = data.quizzs.find(quizz => quizz.id === params.quizzId)
        setQuizz(getQuizz)
    }, [])
    
    // récup questionnaire --> recup question avec id questionnaire --> ecouteur d'event vers le back pour la room --> envoie d'un event pour changer dn quetions 
    // validation dans le front --> envoie des résultats perso dans le back pour calcul global et classement. 
    
    return (
        <div className={styles.questionContainer}>
            {questionSimple &&
                <div className={styles.questionSimpleContainer}>
                    <div className={styles.question}>Question: {questionSimple}</div>
                        <div className={styles.reponseSimpleContainer}>
                            <input type={"text"} onChange={e => setReponseSimple(e.target.value)}/>
                        </div>
                </div>
            }
            {questionMultiple &&
                <div className={styles.questionMultipleContainer}>
                    <div className={styles.question}>
                        Question: {questionMultiple}
                    </div>
                    <div className={styles.reponseMultipleContainer}>
                        {reponseMultiple.map(reponse => <option key={reponseMultiple.indexOf(reponse)} >{reponse.reponse}</option>)}
                    </div>
                </div>
            }
        </div>
    )
}