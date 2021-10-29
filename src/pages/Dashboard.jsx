import React, { useState, useEffect } from 'react'
import * as copy from 'copy-to-clipboard'

import '../css/Dashboard.css'
import COPY_IMG from '../assets/copy.png'
import { getSimpleList } from '../repository/quiz.repository.js'
import dayjs from 'dayjs'
import Tooltip from '../components/Tooltip'
import { base_url_client_quiz } from '../utils/baseUrls'
import { getRandomColor } from '../utils/colors'

const mockDados = [
    {
        legenda: 'O que é mais importante para você?',
        cliques: 100,
        color: getRandomColor(),
    },
    {
        legenda: 'Em qual grupo você se encaixa?',
        cliques: 85,
        color: getRandomColor(),
    },
    {
        legenda: 'Pergunta 3?',
        cliques: 80,
        color: getRandomColor(),
    },
    {
        legenda: 'Pergunta 4?',
        cliques: 75,
        color: getRandomColor(),
    },
    {
        legenda: 'Leads? (8540)',
        cliques: 70,
        color: getRandomColor(),
    },
]

const Dashboard = (props) => {
    const [searchQuizText, setSearchQuizText] = useState('')
    const [completeListQuiz, setCompleteListQuiz] = useState([])
    const [listShowQuiz, setListShowQuiz] = useState([])
    const [loading, setLoading] = useState(false)
    const [inicio, setInicio] = useState('')
    const [fim, setFim] = useState('')

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
      
    useEffect(() => {
        if(searchQuizText){
            setListShowQuiz(completeListQuiz.filter(quiz => (quiz.nome.toLowerCase()).includes(searchQuizText.toLowerCase())))}
        else
        setListShowQuiz(completeListQuiz)
    },[searchQuizText, completeListQuiz])

    const mountBar = () => {
        return mockDados.map((item, index) => {
            const customStyle = {
                width: `${item.cliques}%`,
                backgroundColor: item.color,
            }
            return(
                <div key={index} className="Dashboard-funilBar" style={customStyle}>
                    <p className="Dashboard-porcentagem">{item.cliques}%</p>
                </div>
            )
        })
    }

    const mountLegenda = () => {
        return mockDados.map((item, index) => {
            
            return (
                <div key={index} className="Dashboard-legendItem">
                    <div className="Dashboard-legendColor" style={{backgroundColor: item.color}}/>
                    <p className="Dashboard-txtLegend">{item.legenda}</p>
                </div>
            )
        })
    }

    return (
        <div className="Dashboard-container">
            <div className="Dashboard-quizList">
                <div className="Dashboard-options">
                    <input className="Dashboard-searchQuizField" placeholder="Pesquisar Quiz pelo nome" onChange={(event) => setSearchQuizText(event.target.value)} />
                </div>
                <div className="Dashboard-listQuizArea">
                    {!loading ?
                        listShowQuiz.map((quiz, index) => {
                            return(
                                <div key={index} className="Dashboard-quizArea">
                                    <h4 className="Dashboard-nome">{quiz.nome}</h4>
                                    <button type="button" className="Dashboard-copyQuizUrl" onClick={() => {
                                        copy(base_url_client_quiz + quiz._id)
                                        showTooltip('Endereço copiado!', 3000)
                                        }}>
                                        <p>copiar endereço</p>
                                        <img src={COPY_IMG} alt="copy_img" className="Dashboard-iconCopy" />
                                    </button>                                
                                </div>
                            )
                        })
                    :
                        <div className="Dashboard-LoaderArea">
                            <div className="Dashboard-loader" />
                        </div>
                    }
                </div>
                <Tooltip {...tooltipProps}/>
            </div>
            <div className="Dashboard-separator"/>
            <div className="Dashboard-quizInfo">
                    <div className="Dashboard-periodoArea">
                        <input type="date" id="inicio" className="Dashboard-btnPeriodo" onChange={(e) => setInicio(e.target.value)}/>
                        <input type="date" id="fim" className="Dashboard-btnPeriodo" onChange={(e) => setFim(e.target.value)}/>
                    </div>
                    <div className="Dashboard-titleArea">
                        <h2 className="Dashboard-quizTitleFunil">Nome do quiz selecionado</h2>
                    </div>
                    <div className="Dashboard-funilArea">
                        {mountBar()}
                    </div>
                    <div className="Dashboard-legendaArea">
                        {mountLegenda()}
                    </div>
                    <p>Quantidade de duplicações neste Quiz: 8</p>
            </div>
        </div>
    );
};

export default Dashboard;