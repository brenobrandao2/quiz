import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as copy from 'copy-to-clipboard'

import '../css/QuizList.css'
import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import COPY_IMG from '../assets/copy.png'
import { deleteById, getSimpleList } from '../repository/quiz.repository.js'
import dayjs from 'dayjs'
import { useUser } from '../contexts/AuthContext'
import Tooltip from '../components/Tooltip'
import { base_url_client_quiz } from '../utils/baseUrls'
import { checkPassword } from '../repository/user.repository'

const QuizList = (props) => {
    const [searchQuizText, setSearchQuizText] = useState('')
    const [completeListQuiz, setCompleteListQuiz] = useState([])
    const [listShowQuiz, setListShowQuiz] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, ,] = useUser()

    const [tooltipProps, setTooltipProps] = useState({
        text: '',
        show: false
    })

    const showTooltip = (text, duration) => {
        setTooltipProps({
            text,
            show: true
        })
        setTimeout(() => {
            setTooltipProps({
                text: '',
                show: false
            })
        },duration)
    }

    useEffect(() => {
        reloadQuizList()
    }, []);

    const reloadQuizList = async () => {
        setLoading(true)
        const res = await getSimpleList()
        setCompleteListQuiz(res)
        setLoading(false)
    }

    const deleteQuiz = async (id) => {
        const password = prompt('Digite sua senha para excluir o quiz: ')
        if (password === null) return
        else {
            try {
                const auth = await checkPassword(user.email, password)
                if (auth.status) {
                    await deleteById(id)
                    setListShowQuiz([])
                    reloadQuizList()
                } else alert('Senha incorreta!')
            } catch (error) {
                alert('Falha ao excluir Quiz')
                console.log('Falha ao excluir Quiz - ', error)
            }
        }
    }
      
    useEffect(() => {
        if(searchQuizText){
            setListShowQuiz(completeListQuiz.filter(quiz => (quiz.nome.toLowerCase()).includes(searchQuizText.toLowerCase())))}
        else
        setListShowQuiz(completeListQuiz)
    },[searchQuizText, completeListQuiz])

    return (
        <div className="QuizList-container">
            <div className="QuizList-options">
                <input className="QuizList-searchQuizField" placeholder="Pesquisar Quiz pelo nome" onChange={(event) => setSearchQuizText(event.target.value)} />
                <Link to='create-quiz' className="QuizList-newQuizButton">Criar um novo Quiz</Link>
            </div>
            <div className="QuizList-listQuizArea">
                {!loading ?
                    listShowQuiz.map((quiz, index) => {
                        return(
                            <div key={index} className="QuizList-quizArea">
                                <h4 className="QuizList-nome">{quiz.nome}</h4>
                                <p className="QuizList-quizDate">{dayjs(quiz.lastModified).format('DD/MM/YYYY HH:mm:ss')}</p>
                                <div className="QuizList-iconsArea">
                                    <button type="button" className="QuizList-copyQuizUrl" onClick={() => {
                                        copy(base_url_client_quiz + quiz._id)
                                        showTooltip('Endereço copiado!', 3000)
                                        }}>
                                        <p>copiar endereço</p>
                                        <img src={COPY_IMG} alt="copy_img" className="QuizList-iconCopy" />
                                    </button>
                                    <img src={PEN_IMG} alt="pen_img" className="QuizList-icon" onClick={() => props.history.push('create-quiz', { id_quiz: quiz._id })}/>
                                    <img src={DELETE_IMG} alt="delete_img" className="QuizList-icon" onClick={() => deleteQuiz(quiz._id)}/> 
                                </div>
                            </div>
                        )
                    })
                :
                    <div className="QuizList-LoaderArea">
                        <div className="QuizList-loader" />
                    </div>
                }
            </div>
            <Tooltip {...tooltipProps}/>
        </div>
    );
};

export default QuizList;