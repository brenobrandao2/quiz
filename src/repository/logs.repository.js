import { base_url_db } from '../utils/baseUrls'

class Log {
    constructor(_id, data, usuario, descricao, detalhes) {
        this._id = _id
        this.data = data
        this.usuario = usuario
        this.descricao = descricao
        this.detalhes = detalhes
    }
}

export const getAll = async () => {
    const opt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let allLogs = []
    try {
        allLogs = await fetch(`${base_url_db}/log/`, opt).then(response => response.json())
    } catch(error) {
        console.log('Falha ao buscar logs')
    }
    
    return allLogs.map(log => {
        const {_id, data, usuario, descricao, detalhes} = log
        return new Log(_id, data, usuario, descricao, detalhes)
    })
}

export const registerLog = async (usuario, descricao, detalhes) => {
    console.log(new Date(), ' - Registrando log... ')

    const opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: new Date(),
            usuario,
            descricao,
            detalhes
        })
    }

    try {
        await fetch(`${base_url_db}/log/registerLog`, opt).then(response => response.json())
    } catch (error) {
        console.log('Falha ao registrar log - ', error)
    }

}