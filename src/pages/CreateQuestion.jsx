import React from 'react';
import '../css/CreateQuestion.css'

import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import PLUS_IMG from '../assets/plus.png'

const mountAnswer = () => {
    return(
        <div className="CreateQuestion-answerArea">
            <h4>Quiz sobre cartão de crédito</h4>
            <div className="CreateQuestion-iconsArea">
                <img src={PEN_IMG} alt="pen_img" className="CreateQuestion-icon"/>
                <img src={DELETE_IMG} alt="delete_img" className="CreateQuestion-icon"/>
            </div>
        </div>
    )
}

const CreateQuestion = () => {
    return (
        <div className="CreateQuestion-container">
            <form>
                <div className="CreateQuestion-inputArea">
                    <label>Pergunta:</label>
                    <input className="CreateQuestion-input"></input>
                </div>
                <div className="CreateQuestion-answerList">
                    <label className="CreateQuestion-answerListTitle">Respostas:</label>
                    {mountAnswer()}
                    {mountAnswer()}
                    <button className="CreateQuestion-addAnswerButton">
                        <img src={PLUS_IMG} alt="plus_img" className="CreateQuestion-icon"/>
                    </button>
                    <button className="CreateQuestion-button">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateQuestion;