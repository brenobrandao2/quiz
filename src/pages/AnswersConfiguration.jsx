import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import '../css/AnswersConfiguration.css'
import { Quiz } from '../repository/quiz.repository';

const css = 'AnswersConfiguration-'
const AnswersConfiguration = (props) => {
    const [quiz, setQuiz] = useState(new Quiz())
    const [flows, setFlows] = useState({})
    const [checkedFlows, setCheckedFlows] = useState([])
    const [checkGeral, setCheckGeral] = useState()
    const [redirGeral, setRedirGeral] = useState('')
    const history = useHistory()

    useEffect(() => {
        const { quiz } = props.location.state || {}
        const { fluxos } = quiz
        if (fluxos) {
            setFlows(fluxos)
            setQuiz(quiz)
        }
        else {
            const perguntas = quiz?.perguntas ? [...quiz.perguntas] : []

        const mountAnswers = (perguntas) => {
            const allAnswers = []
            for (const perguntaIndex in perguntas) {
                const pergunta = perguntas[perguntaIndex]
                const group = []
                for (const respostaIndex in pergunta.respostas) {
                    const resposta = pergunta.respostas[respostaIndex]
                    group.push({ pergunta: pergunta.texto, resposta: resposta.texto, codigo: `${perguntaIndex}${respostaIndex}`})
                }
                allAnswers.push(group)
            }
            return allAnswers
        }

        const mountFlows = (allAnswers) => {
            if (allAnswers.length === 0) {
                
                return []
            }
            else if (allAnswers.length === 1) {

                return allAnswers[0]
            }
            else {
                const result = []
                const remainingAnswers = mountFlows(allAnswers.slice(1))

                for (var answerIndex in remainingAnswers) {
                    for (var i = 0; i < allAnswers[0].length; i++) {
                        result.push([allAnswers[0][i]].concat(remainingAnswers[answerIndex]))
                    }
                  }
                return result
            }
        }

        const mountSingleQuestionFlows = (allAnswers) => {
            const answers = allAnswers[0]
            const flows = []
          
            answers.forEach(answer => {
              flows.push([answer])
            })
          
            return flows
        }

        const configFlows = (allFlows) => {
            const newFlows = {}

            for (const flow of allFlows) {
                const codigos = flow.map(item => item.codigo)
                const codigo = codigos.join("")
                
                newFlows[codigo] = {
                    fluxo: flow,
                    redirecionamento: ''
                }
            }

            return newFlows
        }

        const allAnswers = mountAnswers(perguntas)
        const allFlows = allAnswers.length > 1 ? mountFlows(allAnswers) : mountSingleQuestionFlows(allAnswers)
        const configuredFlows = configFlows(allFlows)

        setFlows(configuredFlows)
        setQuiz(quiz)
        }
    },[props])

    const updateFlow = (key, redirecionamento) => {
        const newFlows = {...flows}
        newFlows[key].redirecionamento = redirecionamento
        setFlows(newFlows)
    }

    const saveConfigurations = () => {
        const newQuiz = {...quiz}
        newQuiz.fluxos = flows
        history.push('/create-quiz', { quiz: newQuiz})
    }

    const toggleCheck = (status, key) => {
        const list = [...checkedFlows]
        if (status) {
            list.push(key)
        } else {
            const index = list.indexOf(key)
            list.splice(index, 1)
        }
        setCheckedFlows(list)
    }

    const insertRedir = () => {
        const newFlows = {...flows}

        if (checkGeral) {
            for (const item in newFlows) {
                newFlows[item].redirecionamento = redirGeral
            }
        } else {
            checkedFlows.forEach(item => {
                newFlows[item].redirecionamento = redirGeral
            })
        }

        setFlows(newFlows)
        setRedirGeral('')
    }

    const possibilityComponent = () => {
        return Object.keys(flows).map((key, index) => {
            return(
                <div key={index} className={`${css}possibilityComponent`}>
                    <input type="checkbox" className={`${css}checkbox`} onChange={(e) => toggleCheck(e.target.checked, key)} />
                    <div className={`${css}titleArea`}>
                        <label className={`${css}title`}>Pergunta</label>
                        <label className={`${css}title`}>Resposta</label>
                    </div>
                    {
                        flows[key].fluxo.map((item, index) => {
                            return (
                                <div key={index} className={`${css}answerArea`}>
                                    <label className={`${css}label`}>{item.pergunta}</label>
                                    <label className={`${css}label2`}>{item.resposta}</label>
                                </div>            
                            )
                        })
                    }
                    <form>
                        <div className={`${css}inputArea`}>
                            <label>Redirecionamento:</label>
                            <input type="text" className={`${css}input`} value={flows[key].redirecionamento} onChange={(e) => updateFlow(key, e.target.value)}></input>
                            <p className={`${css}codigo`}>código: {key}</p>
                        </div>
                    </form>
                </div>
            )            
        })
    }

    return (
        <div className={`${css}container`}>
            <h3 className={`${css}pageTitle`}>Configuração dos resultados - {quiz.nome}</h3>
            <div className={`${css}redir-multi`}>
                <label>Redirecionamento:</label>
                <input type="text" className={`${css}inputGeral`} value={redirGeral} onChange={(e) => setRedirGeral(e.target.value)} />
                <p>Todos:</p>
                <input type="checkbox" className={`${css}checkboxGeral`} onChange={(e) => setCheckGeral(e.target.checked)} />
                <input type="button" className={`${css}insert`} value="Inserir" onClick={() => insertRedir()} />
            </div>
            {possibilityComponent()}
            <input type="button" value="Salvar" className={`${css}button`} onClick={() => saveConfigurations()}/>
        </div>
    );
};

export default AnswersConfiguration;