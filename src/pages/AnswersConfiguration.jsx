import React from 'react';
import '../css/AnswersConfiguration.css'

const css = 'AnswersConfiguration-'
const possibilityComponent = () => {
    return(
        <div className={`${css}possibilityComponent`}>
            <div className={`${css}titleArea`}>
                <label className={`${css}title`}>Pergunta</label>
                <label className={`${css}title`}>Resposta</label>
            </div>
            <div className={`${css}answerArea`}>
                <label className={`${css}label`}>O que é mais importante para você?</label>
                <label className={`${css}label2`}>Limite de crédito</label>
            </div>
            <div className={`${css}answerArea`}>
                <label className={`${css}label`}>O que é mais importante para você?</label>
                <label className={`${css}label2`}>Limite de crédito</label>
            </div>
            <div className={`${css}answerArea`}>
                <label className={`${css}label`}>O que é mais importante para você?</label>
                <label className={`${css}label2`}>Limite de crédito</label>
            </div>
            <form>
                <div className={`${css}inputArea`}>
                    <label>Redirecionamento:</label>
                    <input className={`${css}input`}></input>
                </div>
            </form>
        </div>
    )
}

const AnswersConfiguration = () => {
    return (
        <div className={`${css}container`}>
            <h3 className={`${css}pageTitle`}>Configuração dos resultados - "Nome do Quiz"</h3>
            {possibilityComponent()}
            {possibilityComponent()}
            {possibilityComponent()}
            {possibilityComponent()}
            <button className={`${css}button`}>
                    Salvar
            </button>
        </div>
    );
};

export default AnswersConfiguration;