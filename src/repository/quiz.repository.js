import { CardFinal } from "./cardFinal.repository"
import { Pergunta } from "./pergunta.repository"
import { base_url_db } from "../utils/baseUrls"

export class Quiz {
    constructor(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl) {
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
        this.listName = listName || ''
        this.listId = listId || ''
        this.apiUrl = apiUrl || ''
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
        allQuiz = await fetch(`${base_url_db}/quiz`, opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar dados')
    }
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl)
    })
}

export const getSimpleList = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let allQuiz = []
    try {
        allQuiz = await fetch(`${base_url_db}/quiz/getSimpleList`, opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar dados')
    }
    
    const result = allQuiz && allQuiz.length > 0 ? 
    allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl)
    }) : []
    return result
}

export const getById = async (_id) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key: _id})
    }
    const allQuiz = await fetch(`${base_url_db}/quiz/getById`, opt).then(response => response.json())
    
    return allQuiz.map(quiz => {
        const {_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl} = quiz
        return new Quiz(_id, nome, titulo, subtitulo, imagem, duplicidade, perguntas, cardFinal, createdAt, lastModified, fluxos, token, listName, listId, apiUrl)
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
    
    await fetch(`${base_url_db}/quiz/deleteById`, opt).then(async response => console.log(await response.json()))
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

    const opt = {
        method: 'POST',
        body: formData
    }
    
    await fetch(`${base_url_db}/quiz/insert`, opt).then(async response => {})
}

export const update = async (quiz) => {
    let formData = new FormData()

    if (quiz.imagem){
        formData.append('quizImagem', quiz.imagem)
    }
    if (quiz.cardFinal.imagem){
        formData.append('cardFinalImagem', quiz.cardFinal.imagem)
    }
    
    delete quiz.imagem
    delete quiz.cardFinal.imagem
    
    formData.append('quiz', JSON.stringify(quiz))
    
    const opt = {
        method: 'POST',
        body: formData
    }
    
    await fetch(`${base_url_db}/quiz/update`, opt).then(async response => console.log(await response.json()))
}