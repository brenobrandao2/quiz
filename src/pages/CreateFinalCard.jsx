import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import '../css/CreateFinalCard.css'
import { CardFinal } from '../repository/cardFinal.repository';

const CreateFinalCard = (props) => {
    const [quiz, setQuiz] = useState()
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [buttonTxt, setButtonTxt] = useState('')

    useEffect(() => {
        const quiz = props.location.state?.quiz || {}
        const cardFinal = quiz?.cardFinal || new CardFinal()
        const { titulo, subtitulo, botao } = cardFinal
        setTitle(titulo)
        setSubtitle(subtitulo)
        setButtonTxt(botao)
        setQuiz(quiz)
    },[props.location.state])

    const saveFinalCard = () => {
        const newQuiz = {...quiz}
        console.log(newQuiz)
        newQuiz.cardFinal.titulo = title
        newQuiz.cardFinal.subtitulo = subtitle
        newQuiz.cardFinal.botao = buttonTxt
        
        props.history.push('/create-quiz', { quiz })
    }

    return (
        <div className="CreateFinalCard-container">
             <form>
                <div className="CreateFinalCard-inputArea">
                    <label>Título:</label>
                    <input className="CreateFinalCard-input" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Subtítulo:</label>
                    <input className="CreateFinalCard-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Texto do botão:</label>
                    <input className="CreateFinalCard-input" value={buttonTxt} onChange={(e) => setButtonTxt(e.target.value)}></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Imagem:</label>
                    <input type="file" className="CreateFinalCard-input" onChange={(e) => quiz.imagem = e.target.files[0]}></input>
                </div>
                <div className="CreateFinalCard-buttonArea">
                    <input type="button" className="CreateFinalCard-button" value="Salvar" onClick={() => saveFinalCard()}></input>
                </div>
            </form>
        </div>
    );
};

export default CreateFinalCard;