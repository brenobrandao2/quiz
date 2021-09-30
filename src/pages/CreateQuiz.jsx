import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../css/CreateQuiz.css'
import '../css/global.css'

import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'

import { getById, insert, update, Quiz } from '../repository/quiz.repository'
import { Pergunta } from '../repository/pergunta.repository'

const CreateQuiz = (props) => {
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState(new Quiz())
    const [quizName, setQuizName] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pageSubtitle, setPageSubtitle] = useState('')
    const history = useHistory()

    const loadQuiz = async (quiz_id) => {
        setLoading(true)
        const listQuiz = await getById(quiz_id)
        const quiz = listQuiz[0]
        setQuizName(quiz.nome)
        setPageTitle(quiz.titulo)
        setPageSubtitle(quiz.subtitulo)
        setQuiz(quiz)
        setLoading(false)
    }

    const updatedQuiz = () => {
        const newQuiz = {...quiz}
        newQuiz.nome = quizName
        newQuiz.titulo = pageTitle
        newQuiz.subtitulo = pageSubtitle
        return newQuiz
    } 

    useEffect(() => {
        const { quiz, id_quiz } = props.location.state || {}
        if (quiz) {
            console.log(quiz)
            const { nome, titulo, subtitulo } = quiz
            setQuizName(nome)
            setPageTitle(titulo)
            setPageSubtitle(subtitulo)
            setQuiz(quiz)
        }
        else if (id_quiz) 
            loadQuiz(id_quiz)
    }, [props.location.state])
    
    // const setQuestion = (index, question) => {
    //     const newQuiz = {...quiz}
    //     newQuiz.perguntas[index] = question
    //     setQuiz(newQuiz)
    // }


    const mountQuestion = () => {    
        return quiz.perguntas?.map((pergunta, index) => {
            const updateQuestion = () => {
                const newQuiz = updatedQuiz()
                const createQuestionProps = {
                    questionIndex: index,
                    quiz: newQuiz
                }

                history.push('/create-question', { createQuestionProps })
            }
    
            return(
                <div key={index} className="CreateQuiz-questionArea">
                    <h4>{pergunta.texto}</h4>
                    <div className="CreateQuiz-iconsArea">
                        <img src={PEN_IMG} alt="pen_img" className="CreateQuiz-icon" onClick={() => updateQuestion()}/>
                        <img src={DELETE_IMG} alt="delete_img" className="CreateQuiz-icon"/>
                    </div>
                </div>
            )
        })
    }

    const addNewQuestion = () => {
        const newQuiz = updatedQuiz()
        newQuiz.perguntas.push(new Pergunta())
        setQuiz(newQuiz)
    }

    
    const mountFinalCard = () => {
        const updateFinalCard = () => {
            const newQuiz = updatedQuiz()
            history.push('/create-final-card', { quiz: newQuiz })
        }

        return(
            <div className="CreateQuiz-questionArea">
                <h4>{quiz.cardFinal.titulo}</h4>
                    <img src={PEN_IMG} alt="pen_img" className="CreateQuiz-icon" onClick={() => updateFinalCard()}/>
            </div>
        )
    }

    const configQuiz = () => {
        const newQuiz = updatedQuiz()
        history.push('/answers-configuration', { quiz: newQuiz })
    }

    const saveQuiz = async () => {
        const newQuiz = {...quiz}
        newQuiz.nome = quizName
        newQuiz.titulo = pageTitle
        newQuiz.subtitulo = pageSubtitle

        try {
            if (quiz._id) await update(newQuiz)
            else await insert(newQuiz)
            history.push('/', { quiz })
        } catch (error) {
            alert(`Falha ao registrar quiz \n ${error}`)
        }

    }

    return (
        <div className="CreateQuiz-container">
            {loading ?
                <div className="CreateQuiz-LoaderArea">
                    <div className="CreateQuiz-loader"/>
                </div>
            :
                <form>
                    <div className="CreateQuiz-inputArea">
                        <label>Nome do Quiz:</label>
                        <input value={quizName} className="CreateQuiz-input" onChange={(e) => setQuizName(e.target.value)}/>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Título da página:</label>
                        <input value={pageTitle} className="CreateQuiz-input" onChange={(e) => setPageTitle(e.target.value)}/>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Subtítulo da página:</label>
                        <input value={pageSubtitle} className="CreateQuiz-input" onChange={(e) => setPageSubtitle(e.target.value)}/>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Imagem:</label>
                        <input type="file" className="CreateQuiz-input" onChange={(e) => quiz.imagem = e.target.files[0]}></input>
                    </div>
                    <div className="CreateQuiz-questionList">
                        <label className="CreateQuiz-questionListTitle">Cards:</label>
                        {mountQuestion()}
                        <input type="button" className="CreateQuiz-addQuestionButton" onClick={() => addNewQuestion()} />
                        {mountFinalCard()}
                        <div className="CreateQuiz-finalButtonsArea">
                            <input type="button" value="Configurar resultados" className="CreateQuiz-button" onClick={() => configQuiz()} />
                            <input type="button" value="Salvar" className="CreateQuiz-button" onClick={() => saveQuiz()} />
                        </div>
                    </div>
                </form>
            }
        </div>
    );
};

export default CreateQuiz;