export const userValidation = (user) => {
    const missing = []

    if (!user.nome)
        missing.push('nome')
    if (!user.email)
        missing.push('e-mail')
    if (!user.senha)
        missing.push('senha')

        if (missing.length > 0) {
        const problems = missing.join(", ")
        const result = `Os seguintes pontos precisam ser verificados antes de salvar: ${problems}.`
        return result
    }
    else return undefined
}