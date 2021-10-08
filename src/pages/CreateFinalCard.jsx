import React, { useEffect, useState } from 'react';
import '../css/CreateFinalCard.css'
import { CardFinal } from '../repository/cardFinal.repository.js';

const CreateFinalCard = (props) => {
    const [quiz, setQuiz] = useState()
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [image, setImage] = useState('')
    const [buttonTxt, setButtonTxt] = useState('')
    const [preview, setPreview] = useState()

    useEffect(() => {
        const quiz = props.location.state?.quiz || {}
        const cardFinal = quiz?.cardFinal || new CardFinal()
        const { titulo, subtitulo, botao, imagem } = cardFinal
        setTitle(titulo)
        setSubtitle(subtitulo)
        setButtonTxt(botao)
        setImage(imagem)
        if (imagem && imagem.type) {
            getPreview(imagem)
        } else if (imagem && imagem.mimetype) {
            setPreview(`data:${imagem.mimetype};base64,${imagem.buffer}`)
        }
        setQuiz(quiz)
    },[props.location.state])

    const getPreview = (imagem) => {
        if (imagem) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imagem)
            fileReader.addEventListener('load', (e) => {
                setPreview(e.target.result)
            })
        }
    }

    const saveFinalCard = () => {
        const newQuiz = {...quiz}
        console.log(newQuiz)
        newQuiz.cardFinal.titulo = title
        newQuiz.cardFinal.subtitulo = subtitle
        newQuiz.cardFinal.botao = buttonTxt
        newQuiz.cardFinal.imagem = image
        
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
                    <div className="CreateQuiz-imageArea">
                        <input type="file" name="image" onChange={(e) => {
                            setImage(e.target.files[0])
                            getPreview(e.target.files[0])
                            }}/>
                        <img alt='quiz_img' src={preview} className="CreateQuiz-image"/>
                    </div>
                </div>
                <div className="CreateFinalCard-buttonArea">
                    <input type="button" className="CreateFinalCard-button" value="Salvar" onClick={() => saveFinalCard()}></input>
                </div>
            </form>
        </div>
    );
};

export default CreateFinalCard;