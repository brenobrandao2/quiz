import { base_url_db } from "../utils/baseUrls"

export class User {
    constructor(_id, nome, email, senha) {
        this._id = _id
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}

export const insert = async (user) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }
    
    await fetch(`${base_url_db}/user/insert`, opt).then(async response => console.log(await response.json()))
}

export const update = async (user) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }
    
    await fetch(`${base_url_db}/user/update`, opt).then(async response => console.log(await response.json()))
}

export const getAll = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let allUsers = []
    try {
        allUsers = await fetch(`${base_url_db}/user`, opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar dados')
    }
    
    const result = allUsers && allUsers.length > 0 ? 
        allUsers.map(user => {
            const {_id, nome, email} = user
            return new User(_id, nome, email)
        }) : []
    return result
}

export const deleteById = async (_id) => {
    console.log(`Excluindo usuário de id = ${_id}`)
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id })
    }
    
    await fetch(`${base_url_db}/user/deleteById`, opt).then(async response => console.log(await response.json()))
}

export const tryLogin = async (email, senha) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
    }
    
    let result
    try {
        result = await fetch(`${base_url_db}/user/login`, opt).then(async response => await response.json())
        return {...result}
    } catch (error) {
        console.log('Falha ao realizar login - ', error)
    }
}

export const checkPassword = async (email, senha) => {
    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
    }
    
    let result
    try {
        result = await fetch(`${base_url_db}/user/checkPassword`, opt).then(async response => await response.json())
        return {...result}
    } catch (error) {
        console.log('Falha ao realizar login - ', error)
    }
}