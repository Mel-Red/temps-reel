export default function GetQuizzAndQuestions({params}) {
    const idQuizz = params.quizzId
    // Connection à la BDD et chargement du questionnaire et de ses questions.
    return {
        //     Ici on renvoit un objet comprenant les questions et leur réponse sous la forme d'un JSON
        //     en gros on a
        //     [
        //         {
        //             idQuestion: 1,
        //             question: "La question",
        //             typeQuestion: 1 Pour une question solo (champs text), 2 pour des question à choix multiple (jusqu'a 4),
        //             reponse: [
        //                 "Réponse 1" => true,
        //                 "Réponse 2 "=> false
        //             ] Pour les question choix multiple ou
        //             reponse: "La réponse" Pour les questions simple
        //         },
        // {
        //     Une autre question
        // }
        //         ]
        // }
        true
    }
}