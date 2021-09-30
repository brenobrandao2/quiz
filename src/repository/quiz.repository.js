import { CardFinal } from "./cardFinal.repository"
import { Pergunta } from "./pergunta.repository"

export class Quiz {
    constructor(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos) {
        this._id = _id
        this.nome = nome || ''
        this.titulo = titulo || ''
        this.subtitulo = subtitulo || ''
        this.imagem = imagem
        this.duplicidade = duplicidade || 0

        this.setPerguntas(perguntas)

        this.cardFinal = cardFinal || new CardFinal()

        this.createdAt = createdAt
        this.lastModified = lastModified
        
        this.fluxos = fluxos
    }

    setPerguntas(perguntas) {
        if (perguntas) this.perguntas = perguntas
        else this.perguntas = [new Pergunta()]
    }
}

export const getAll = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const allQuiz = await fetch('http://localhost:3000/quiz', opt).then(response => response.json())
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos)
    })
}

export const getById = async (_id) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key: _id})
    }
    const allQuiz = await fetch('http://localhost:3000/quiz/getById', opt).then(response => response.json())
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos)
    })
}

export const deleteById = async (_id) => {
    console.log(`Excluindo quiz de id = ${_id}`)
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id })
    }
    
    await fetch('http://localhost:3000/quiz/deleteById', opt).then(async response => console.log(await response.json()))
}

export const insert = async (quiz) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz)
    }
    
    await fetch('http://localhost:3000/quiz/insert', opt).then(async response => console.log(await response.json()))
}

export const update = async (quiz) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz)
    }
    
    await fetch('http://localhost:3000/quiz/update', opt).then(async response => console.log(await response.json()))
}


// export const insertQuizTest = async () => {
//     const opt = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }
    
//     await fetch('http://localhost:3000/quiz/insertQuizTest', opt).then(async response => console.log(await response.json()))
// }

