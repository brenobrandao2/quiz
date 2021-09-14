import React, { useState, useEffect } from 'react';

import '../css/QuizList.css'
import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'

const mockListaQuiz = [
    {
        nome: "Quiz sobre cartão de crédito"
    },
    {
        nome: "Quiz sobre investimentos"
    },
    {
        nome: "Quiz sobre reserva de emergência"
    }
]

const QuizList = () => {
    const [searchQuizText, setSearchQuizText] = useState('')
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        if(searchQuizText){
            setListQuiz(mockListaQuiz.filter(quiz => (quiz.nome.toLowerCase()).includes(searchQuizText.toLowerCase())))}
        else
            setListQuiz(mockListaQuiz)
    },[searchQuizText])

    return (
        <div className="QuizList-container">
            <div className="QuizList-options">
                <input className="QuizList-searchQuizField" placeholder="Pesquisar Quiz pelo nome" onChange={(event) => setSearchQuizText(event.target.value)} />
                <button className="QuizList-newQuizButton">Criar um novo Quiz</button>
            </div>
            <div className="QuizList-listQuizArea">
                {listQuiz.map(quiz => {
                    return(
                        <div className="QuizList-quizArea">
                            <h4>{quiz.nome}</h4>
                            <div className="QuizList-iconsArea">
                                <img src={PEN_IMG} alt="pen_img" className="QuizList-icon"/>
                                <img src={DELETE_IMG} alt="delete_img" className="QuizList-icon"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default QuizList;