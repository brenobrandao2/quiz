import React from 'react';
import '../css/CreateQuiz.css'  

import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import PLUS_IMG from '../assets/plus.png'

const mountQuestion = () => {
    return(
        <div className="CreateQuiz-questionArea">
            <h4>Quiz sobre cartão de crédito</h4>
            <div className="CreateQuiz-iconsArea">
                <img src={PEN_IMG} alt="pen_img" className="CreateQuiz-icon"/>
                <img src={DELETE_IMG} alt="delete_img" className="CreateQuiz-icon"/>
            </div>
        </div>
    )
}

const mountFinalCard = () => {
    return(
        <div className="CreateQuiz-questionArea">
            <h4>Quiz sobre cartão de crédito</h4>
                <img src={PEN_IMG} alt="pen_img" className="CreateQuiz-icon"/>
        </div>
    )
}

const CreateQuiz = () => {
    return (
        <div className="CreateQuiz-container">
            <form>
                <div className="CreateQuiz-inputArea">
                    <label>Nome do Quiz:</label>
                    <input className="CreateQuiz-input"></input>
                </div>
                <div className="CreateQuiz-inputArea">
                    <label>Título da página:</label>
                    <input className="CreateQuiz-input"></input>
                </div>
                <div className="CreateQuiz-inputArea">
                    <label>Subtítulo da página:</label>
                    <input className="CreateQuiz-input"></input>
                </div>
                <div className="CreateQuiz-inputArea">
                    <label>Imagem:</label>
                    <input type="file" className="CreateQuiz-input"></input>
                </div>
                <div className="CreateQuiz-questionList">
                    <label className="CreateQuiz-questionListTitle">Cards:</label>
                    {mountQuestion()}
                    {mountQuestion()}
                    <button className="CreateQuiz-addQuestionButton">
                        <img src={PLUS_IMG} alt="plus_img" className="CreateQuiz-icon"/>
                    </button>
                    {mountFinalCard()}
                    <div className="CreateQuiz-finalButtonsArea">
                        <button className="CreateQuiz-button">
                            Configurar resultados
                        </button>
                        <button className="CreateQuiz-button">
                            Salvar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateQuiz;