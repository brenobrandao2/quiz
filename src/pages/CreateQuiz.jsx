import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import '../css/CreateQuiz.css'
import '../css/global.css'
import { useUser } from '../contexts/AuthContext'

import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import X_IMG from '../assets/x.png'

import { getById, insert, update, Quiz } from '../repository/quiz.repository'
import { Pergunta } from '../repository/pergunta.repository'
import { quizValidation } from '../utils/quizValidation';
import Tooltip from '../components/Tooltip'
import { getLists } from '../repository/activeCampaign.repository'

const CreateQuiz = (props) => {
    const [user, ,] = useUser()
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState(new Quiz())
    const [quizName, setQuizName] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pageSubtitle, setPageSubtitle] = useState('')
    const [image, setImage] = useState()
    const [token, setToken] = useState('')
    const [apiUrl, setApiUrl] = useState('')
    const [listName, setListName] = useState('')
    const [listId, setListId] = useState(undefined)
    const [availableLists, setAvailableLists] = useState([])
    const [preview, setPreview] = useState()
    const history = useHistory()

    
    const [tooltipProps, setTooltipProps] = useState({
        text: '',
        show: false
    })

    const showTooltip = (text, duration = 10000) => {
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

    const getPreview = (imagem) => {
        if (imagem) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imagem)
            fileReader.addEventListener('load', (e) => {
                setPreview(e.target.result)
            })
        }
    }

    const updatedQuiz = () => {
        const newQuiz = {...quiz}
        newQuiz.nome = quizName
        newQuiz.titulo = pageTitle
        newQuiz.subtitulo = pageSubtitle
        newQuiz.imagem = image
        newQuiz.token = token
        newQuiz.apiUrl = apiUrl
        newQuiz.listName = listName
        newQuiz.listId = listId
        return newQuiz
    } 

    useEffect(() => {
        const { quiz, id_quiz } = props.location.state || {}

        const loadQuiz = async (quiz_id) => {
            setLoading(true)
            const listQuiz = await getById(quiz_id)
            const quiz = listQuiz[0]
            setQuizName(quiz.nome)
            setPageTitle(quiz.titulo)
            setPageSubtitle(quiz.subtitulo)
            setImage(quiz.imagem)
            if (quiz?.imagem?.type) {
                getPreview(quiz.imagem)
            } else if (quiz?.imagem?.mimetype) {
                setPreview(`data:${quiz.imagem.mimetype};base64,${quiz.imagem.buffer}`)
            }
            setToken(quiz.token)
            setApiUrl(quiz.apiUrl)
            loadLists(quiz.apiUrl, quiz.token)
            setListName(quiz.listName)
            setListId(quiz.listId)
            setQuiz(quiz)
            setLoading(false)
        }

        if (quiz) {
            const { nome, titulo, subtitulo, token, imagem, listName, listId, apiUrl } = quiz
            setQuizName(nome)
            setPageTitle(titulo)
            setPageSubtitle(subtitulo)
            if (imagem) {
                setImage(imagem)
                if (imagem.type) {
                    getPreview(imagem)
                } else if (imagem.mimetype) {
                    setPreview(`data:${imagem.mimetype};base64,${imagem.buffer}`)
                }
            }
            setToken(token)
            setApiUrl(apiUrl)
            loadLists(apiUrl, token)
            setListName(listName)
            setListId(listId)
            setQuiz(quiz)
        }
        else if (id_quiz) 
            loadQuiz(id_quiz)
    }, [props.location.state])


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
                        <img src={DELETE_IMG} alt="delete_img" className="CreateQuiz-icon" onClick={() => deleteQuestion(index)} />
                    </div>
                </div>
            )
        })
    }

    const addNewQuestion = () => {
        if (quiz.fluxos) {
            const res = window.confirm('Os redirecionamentos já foram definidos. Ao adicionar uma pergunta, os fluxos serão recalculados e os redirecionamentos atuais serão excluidos. Deseja continuar?')
            if (res === true) {
                const newQuiz = updatedQuiz()
                newQuiz.perguntas.push(new Pergunta())
                newQuiz.fluxos = undefined
                setQuiz(newQuiz)
            }
        } else {
            const newQuiz = updatedQuiz()
            newQuiz.perguntas.push(new Pergunta())
            setQuiz(newQuiz)
        }
    }

    const deleteQuestion = (index) => {
        const newQuiz = updatedQuiz()
        if (newQuiz.perguntas.length > 1) {
            if (quiz.fluxos) {
                const res = window.confirm('Os redirecionamentos já foram definidos. Ao exluir uma pergunta, os fluxos serão recalculados e os redirecionamentos atuais serão excluidos. Deseja continuar?')
                if (res === true) {
                    newQuiz.perguntas.splice(index, 1)
                    newQuiz.fluxos = undefined
                    setQuiz(newQuiz)
                }
            } else {
                newQuiz.perguntas.splice(index, 1)
                setQuiz(newQuiz)
            }
        }
        else {
            showTooltip('Você atingiu a quantidade mínima de perguntas', 4000)
        }
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
        setLoading(true)
        const newQuiz = updatedQuiz()

        const validation = quizValidation(newQuiz)
        if (validation){
            showTooltip(validation)
            setLoading(false)
            return
        }

        try {
            if (quiz._id) await update(newQuiz, user.email)
            else await insert(newQuiz, user.email)
            setLoading(false)
            history.push('/', { quiz })
        } catch (error) {
            setLoading(false)
            alert(`Falha ao registrar quiz \n ${error}`)
        }
    }

    const loadApiUrl = async (apiUrl) => {
        setApiUrl(apiUrl)
        if (apiUrl && token) {
            const acLists = await getLists(apiUrl, token)
            setAvailableLists(acLists)
        }
    }

    const loadToken = async (token) => {
        setToken(token)
        if (token && apiUrl) {
            const acLists = await getLists(apiUrl, token)
            setAvailableLists(acLists)
        }
    }

    const loadLists = async (apiUrl, token) => {
        if (apiUrl && token) {
            const acLists = await getLists(apiUrl, token)
            setAvailableLists(acLists)
        }
    }

    const mountLists = () => {
        return availableLists.map(list => {
            const strValue = JSON.stringify({name: list.name, id: list.id})
            return(
                <option 
                    key={list.id}
                    selected={list.id === listId}
                    value={strValue}
                >
                    {list.name}
                </option>            
            )
        })
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
                        <label>URL:</label>
                        <input value={apiUrl} className="CreateQuiz-input" onChange={(e) => loadApiUrl(e.target.value)}/>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Token:</label>
                        <input value={token} className="CreateQuiz-input" onChange={(e) => loadToken(e.target.value)}/>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Lista:</label>
                        <select 
                            name="select"
                            className="CreateQuiz-select"
                            onChange={(e) => {
                                const objValue = JSON.parse(e.target.value)
                                setListName(objValue.name)
                                setListId(objValue.id)
                            }}
                        >
                            {mountLists()}
                        </select>
                    </div>
                    <div className="CreateQuiz-inputArea">
                        <label>Imagem:</label>
                        <div className="CreateQuiz-imageArea">
                            {preview && <img alt='quiz_img' src={preview} className="CreateQuiz-image"/>}
                            { image ?
                                <img alt='x_img' src={X_IMG} className="CreateQuiz-xBtn" onClick={() => {
                                    setImage(undefined)
                                    setPreview(undefined)
                                }}/>
                                :
                                <input type="file" accept="image/png, image/jpeg" name="image" onChange={(e) => { 
                                    setImage(e.target.files[0])
                                    getPreview(e.target.files[0])
                                }} />
                            }
                        </div>
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
            <Tooltip {...tooltipProps}/>
        </div>
    );
};

export default CreateQuiz;