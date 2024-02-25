'use client'
import {useEffect, useState} from "react";
import data from "@/app/data/quizz.json"
import questionData from "@/app/data/question.json"
import Question from "@/app/components/Question";
import {socket} from "@/app/socket";
import {useRouter} from "next/navigation";
export default function quizzContainer({params}) {
    const [questions, setQuestions] = useState()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [compteReponse, setCompteReponse] = useState(0)

    const router = useRouter()

    useEffect(() => {
        const getQuestions = questionData.questions.filter(question => question.quizzId == params.quizzId)
        console.log(getQuestions)
        setQuestions(getQuestions)
        socket.emit('currentQuestion', (params.roomId))
    }, [])

    socket.on('nextQuestion'+params.roomId, () => {
        if (currentQuestion < questions.length)
            setCurrentQuestion(currentQuestion+1)
        else {
            // router.push(`/quizz/${params.roomId}/${params.username}/${params.quizzId}/resultats`)
            setQuestions(undefined)
        }
        console.log(currentQuestion)
    })

    // récup questionnaire --> recup question avec id questionnaire --> ecouteur d'event vers le back pour la room --> envoie d'un event pour changer dn quetions 
    // validation dans le front --> envoie des résultats perso dans le back pour calcul global et classement. 
    
    return (
        <>
            {questions !== undefined ? <Question question={questions[currentQuestion]} setCompteReponse={setCompteReponse} compteReponse={compteReponse} /> : <p>Fetchings</p>}
        </>
    )
}