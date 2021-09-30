export const quizValidation = (quiz) => {
    const missing = []

    if (!quiz.nome)
        missing.push('nome do quiz')
    if (!quiz.titulo)
        missing.push('título do quiz')
    if (!quiz.subtitulo)
        missing.push('subtítulo do quiz')
    
    let missingQuestion = false
    let missingAnswer = false
    
    quiz.perguntas.forEach(pergunta => {
        if (!pergunta.texto)
            missingQuestion = true
        pergunta.respostas.forEach(resposta => {
            if (!resposta.texto)
                missingAnswer = true
        })
    })

    if (missingQuestion)
        missing.push('título das perguntas')
    if (missingAnswer)
        missing.push('respostas das perguntas')

    if (!quiz.fluxos)
        missing.push('configuração dos resultados')
    else {
        let missingRedirect = false

        Object.values(quiz.fluxos).forEach(fluxo => {
            if (!fluxo.redirecionamento)
                missingRedirect = true
        })

        if (missingRedirect)
            missing.push('rederecionamento dos fluxos')
    }

    const problems = missing.join(", ")
    if (missing.length > 0) {
        const result = `Os seguintes pontos precisam ser verificados antes de salvar: ${problems}.`
        return result
    }
    else return undefined
}