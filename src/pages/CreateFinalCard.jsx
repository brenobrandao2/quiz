import React from 'react';
import '../css/CreateFinalCard.css'

const CreateFinalCard = () => {
    return (
        <div className="CreateFinalCard-container">
             <form>
                <div className="CreateFinalCard-inputArea">
                    <label>Título:</label>
                    <input className="CreateFinalCard-input"></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Subtítulo:</label>
                    <input className="CreateFinalCard-input"></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Texto do botão:</label>
                    <input className="CreateFinalCard-input"></input>
                </div>
                <div className="CreateFinalCard-inputArea">
                    <label>Imagem:</label>
                    <input type="file" className="CreateFinalCard-input"></input>
                </div>
                <div className="CreateFinalCard-buttonArea">
                    <button className="CreateFinalCard-button">
                            Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFinalCard;