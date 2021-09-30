export class Resposta {
    constructor(_id, texto, id_pergunta) {
        this._id = _id
        this.texto = texto || 'Nova Resposta'
        this.id_pergunta = id_pergunta
    }
}