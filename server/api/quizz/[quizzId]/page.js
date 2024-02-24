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
        //             typeQuestion: 1 Pour une question solo (champs text), 2 pour des question à choix multiple (jusqu'a 4 réponses possibles),
        //             reponse: 1, Pour les question à choix multiple on met l'index de la réponse dans la propriété reponse.
        //             choix: {
        //                  1: "Réponse 1"
        //                  2: "Réponse 2"
        //                  3: "Réponse 3"
        //                  4: "Réponse 4"
        //             }
        //             Pour les question choix multiples on ajoute l'objet choix.
        //
        //             reponse: "La réponse" Pour les questions simples on met directement la réponse dans la propriété reponse.
        //         },
        // {
        //     Une autre question
        // }
        //         ]
        // }
        true
    }
}