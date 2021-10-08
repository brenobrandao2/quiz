import { CardFinal } from "./cardFinal.repository"
import { Pergunta } from "./pergunta.repository"

export class Quiz {
    constructor(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token) {
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
        this.token = token || ''
    }

    setPerguntas(perguntas) {
        if (perguntas) this.perguntas = perguntas
        else this.perguntas = [new Pergunta(undefined, 'Pergunta 1'), new Pergunta(undefined, 'Pergunta 2')]
    }
}

export const getAll = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let allQuiz = []
    try {
        allQuiz = await fetch('http://159.203.187.163:3001/quiz', opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar dados')
    }
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token)
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
    const allQuiz = await fetch('http://159.203.187.163:3001/quiz/getById', opt).then(response => response.json())
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token)
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
    
    await fetch('http://159.203.187.163:3001/quiz/deleteById', opt).then(async response => console.log(await response.json()))
}

export const insert = async (quiz) => {
    let formData = new FormData()
    if (quiz.imagem)
    formData.append('quizImagem', quiz.imagem)
    if (quiz.cardFinal.imagem)
    formData.append('cardFinalImagem', quiz.cardFinal.imagem)
    
    delete quiz.imagem
    delete quiz.cardFinal.imagem
    
    formData.append('quiz', JSON.stringify(quiz))
    
    for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }

    const opt = {
        method: 'POST',
        body: formData
    }
    
    await fetch('http://159.203.187.163:3001/quiz/insert', opt).then(async response => {})//console.log(await response.json()))
}

export const update = async (quiz) => {
    let formData = new FormData()

    if (quiz.imagem){
        formData.append('quizImagem', quiz.imagem)
    }
    if (quiz.cardFinal.imagem){
        formData.append('cardFinalImagem', quiz.cardFinal.imagem)
    }

    for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }
    
    delete quiz.imagem
    delete quiz.cardFinal.imagem
    
    formData.append('quiz', JSON.stringify(quiz))
    
    const opt = {
        method: 'POST',
        body: formData
    }
    
    await fetch('http://159.203.187.163:3001/quiz/update', opt).then(async response => console.log(await response.json()))
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

