export const quizValidation = (quiz) => {
    const missing = []

    if (!quiz.nome)
        missing.push('nome do quiz')
    if (!quiz.titulo)
        missing.push('título do quiz')
    if (!quiz.subtitulo)
        missing.push('subtítulo do quiz')
    if (!quiz.token)
        missing.push('token do quiz')
    
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

    if (!quiz.cardFinal.titulo)
        missing.push('título do card final')
    if (!quiz.cardFinal.subtitulo)
        missing.push('subtítulo do card final')
    if (!quiz.cardFinal.botao)
        missing.push('texto do botão do card final')

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

    if (missing.length > 0) {
        const problems = missing.join(", ")
        const result = `Os seguintes pontos precisam ser verificados antes de salvar: ${problems}.`
        return result
    }
    else return undefined
}