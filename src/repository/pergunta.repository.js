import { Resposta } from "./resposta.repository"

export class Pergunta {
    constructor(_id, texto, id_quiz, respostas) {
        this._id = _id
        this.texto = texto || 'Nova pergunta'
        this.id_quiz = id_quiz

        this.setRespostas(respostas)
    }

    setRespostas(respostas) {
        if (respostas) this.respostas = respostas
        else this.respostas = [new Resposta()]
    }
}