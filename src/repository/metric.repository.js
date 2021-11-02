import { base_url_db } from "../utils/baseUrls"

class Metric {
    constructor(_id, id_quiz, data, acesso, pergunta, resposta, lead) {
        this._id = _id
        this.id_quiz = id_quiz
        this.data = data
        this.acesso = acesso
        this.pergunta = pergunta
        this.resposta = resposta
        this.lead = lead
    }
}

export const getQuizMetrics = async (_id) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id})
    }
    const quizMetrics = await fetch(`${base_url_db}/quiz/getQuizMetrics`, opt).then(response => response.json())
    
    return quizMetrics.map(metric => {
        const {_id, id_quiz, data, acesso, pergunta, resposta, lead} = metric
        return new Metric(_id, id_quiz, data, acesso, pergunta, resposta, lead)
    })
}