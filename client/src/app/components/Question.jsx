'use client'

import styles from "@/app/page.module.css";
import {useEffect, useState} from "react";

export default function Question(props) {
    const [questionSimple, setQuestionSimple] = useState()
    const [questionMultiple, setQuestionMultiple] = useState()
    const [reponseSimple, setReponseSimple] = useState("")
    const [reponseSimpleUser, setReponseSimpleUser] = useState("")
    const [reponseMultiple, setReponseMultiple] = useState()
    const [choices, setChoices] = useState()
    const [reponseMultipleSelected, setReponseMultipleSelected] = useState()

    useEffect(() => {
        if (props.question.typeQuestion === 1) {
            setQuestionSimple(props.question.question)
            setReponseSimple(props.question.reponse)
            setQuestionMultiple(false)
        } else if (props.question.typeQuestion === 2) {
            setQuestionMultiple(props.question.question)
            setChoices(props.question.choix)
            setReponseMultiple(props.question.reponse)
        }
    }, [props.question]);

    return (
        <div className={styles.questionContainer}>
            {questionSimple &&
                <div className={styles.questionSimpleContainer}>
                    <div className={styles.question}>Question: {questionSimple}</div>
                    <div className={styles.reponseSimpleContainer}>
                        <input type={"text"} onChange={e => setReponseSimpleUser(e.target.value)}/>
                    </div>
                </div>
            }
            {questionMultiple &&
                <div className={styles.questionMultipleContainer}>
                    <div className={styles.question}>
                        Question: {questionMultiple}
                    </div>
                    <div className={styles.reponseMultipleContainer}>
                        {reponseMultiple.map(reponse => <option
                            key={reponseMultiple.indexOf(reponse)}>{reponse.reponse}</option>)}
                    </div>
                </div>
            }
        </div>
    )
}