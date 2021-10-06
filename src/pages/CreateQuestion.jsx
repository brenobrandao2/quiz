import React, { useEffect, useState } from 'react';
import '../css/CreateQuestion.css'
import '../css/global.css'

import DELETE_IMG from '../assets/delete.png'
import { Resposta } from '../repository/resposta.repository';

const CreateQuestion = (props) => {
    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswers, setNewAnswers] = useState([])
    const [quiz, setQuiz] = useState()
    const [questionIndex, setQuestionIndex] = useState()

    useEffect(() => {
        const createQuestionProps = props.location.state?.createQuestionProps || {}
        const quiz = createQuestionProps?.quiz
        const questionIndex = createQuestionProps.questionIndex
        const question = quiz?.perguntas[questionIndex]?.texto || 'Nova pergunta' 
        const answers = quiz?.perguntas[questionIndex]?.respostas || [new Resposta()]
        setNewQuestion(question)
        setNewAnswers(answers)
        setQuiz(quiz)
        setQuestionIndex(questionIndex)
    },[props])

    const addNewAnswer = () => {
        if (quiz.fluxos) {
            const res = window.confirm('Os redirecionamentos já foram definidos. Ao adicionar uma resposta, os fluxos serão recalculados e os redirecionamentos atuais serão excluidos. Deseja continuar?')
            if (res === true) {
                const result = [...newAnswers]
                result.push(new Resposta())
                setNewAnswers(result)
                const newQuiz = {...quiz}
                newQuiz.fluxos = undefined
                setQuiz(newQuiz)
            }
        } else {
            const result = [...newAnswers]
            result.push(new Resposta())
            setNewAnswers(result)
        }
    }

    const updateAnswer = (value, index) => {
        const result = [...newAnswers]
        result[index].texto = value
        setNewAnswers(result)
    }

    const deleteAnswer = (index) => {
        if (quiz.fluxos) {
            const res = window.confirm('Os redirecionamentos já foram definidos. Ao exluir uma resposta, os fluxos serão recalculados e os redirecionamentos atuais serão excluidos. Deseja continuar?')
            if (res === true) {
                const result = [...newAnswers]
                result.splice(index, 1)
                setNewAnswers(result)
                const newQuiz = {...quiz}
                newQuiz.fluxos = undefined
                setQuiz(newQuiz)
            }
        } else {
            const result = [...newAnswers]
            result.splice(index, 1)
            setNewAnswers(result)
        }
    }

    const mountAnswer = () => {       
        return newAnswers.map((resposta, index) => {
            return(
                <div key={index} className="CreateQuestion-answerArea">
                    <input className="CreateQuestion-inputAnswer" value={resposta.texto} onChange={(e) => updateAnswer(e.target.value, index)}></input>
                    {newAnswers.length > 1 && <img src={DELETE_IMG} alt="delete_img" className="CreateQuestion-icon" onClick={() => deleteAnswer(index)} />}
                </div>
            )
        })
    }

    const saveQuestion = () => {
        const newQuiz = quiz
        newQuiz.perguntas[questionIndex] = {
            texto: newQuestion,
            respostas: newAnswers,
        }

        props.history.push('/create-quiz', { quiz })
    }

    return (
        <div className="CreateQuestion-container">
            <form>
                <div className="CreateQuestion-inputArea">
                    <label>Pergunta:</label>
                    <input className="CreateQuestion-input" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}></input>
                </div>
                <div className="CreateQuestion-answerList">
                    <label className="CreateQuestion-answerListTitle">Respostas:</label>
                    {mountAnswer()}
                    <input type="button" className="CreateQuestion-addAnswerButton" onClick={() => addNewAnswer()} />
                        {/* <img src={PLUS_IMG} alt="plus_img" className="CreateQuestion-icon"/>
                    </input> */}
                    <input type="button" className="CreateQuestion-button" value="Salvar" onClick={() => saveQuestion()} />
                </div>
            </form>
        </div>
    );
};

export default CreateQuestion