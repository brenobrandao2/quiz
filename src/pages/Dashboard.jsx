import React, { useState, useEffect } from 'react'
import * as copy from 'copy-to-clipboard'

import '../css/Dashboard.css'
import COPY_IMG from '../assets/copy.png'
import { getById, getSimpleList } from '../repository/quiz.repository.js'
import { getQuizMetrics } from '../repository/metric.repository'
import dayjs from 'dayjs'
import Tooltip from '../components/Tooltip'
import { base_url_client_quiz } from '../utils/baseUrls'
import { funilColors, getRandomColor } from '../utils/colors'

const Dashboard = (props) => {
    const [searchQuizText, setSearchQuizText] = useState('')
    const [completeListQuiz, setCompleteListQuiz] = useState([])
    const [listShowQuiz, setListShowQuiz] = useState([])
    const [loading, setLoading] = useState(false)
    const [inicio, setInicio] = useState('')
    const [fim, setFim] = useState('')

    const [dashboardLoading, setDashboardLoading] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState()
    const [quizMetrics, setQuizMetrics] = useState([])
    const [filteredMetrics, setFilteredMetrics] = useState([])
    const [quizAccess, setQuizAccess] = useState(0)
    const [dashboardData, setDashboardData] = useState({})
    const [totalLeads, setTotalLeads] = useState(0)

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

    useEffect(() => {
        loadQuizFiltered()
    },[inicio, fim])

    const mountBar = () => {
        let totalAnterior = quizAccess
        return Object.keys(dashboardData).map((key, index) => {
            const engajamento = ((dashboardData[key].ocorrencias * 100) / totalAnterior).toFixed(0)
            // totalAnterior = dashboardData[key].ocorrencias

            const customStyle = {
                width: `${engajamento}%`,
                backgroundColor: dashboardData[key].color,
            }

            return(
                <div key={index} className="Dashboard-funilBar" style={customStyle}>
                    <p className="Dashboard-porcentagem">{engajamento}%</p>
                </div>
            )
        })
    }

    const mountLegenda = () => {
        return Object.keys(dashboardData).map((key, index) => {
            const text = key === 'Leads' ? key + ` (${totalLeads})` : key
            
            return (
                <div key={index} className="Dashboard-legendItem">
                    <div className="Dashboard-legendColor" style={{backgroundColor: dashboardData[key].color}}/>
                    <p className="Dashboard-txtLegend">{text}</p>
                </div>
            )
        })
    }

    const loadQuiz = async (quiz) => {
        setDashboardLoading(true)
        
        const quizMetrics = await getQuizMetrics(quiz._id)
        
        setQuizMetrics(quizMetrics)
        getDashboardData(quizMetrics)
        
        const completeQuiz = await getById(quiz._id)
        setSelectedQuiz(completeQuiz[0])

        setDashboardLoading(false)
    }

    const loadQuizFiltered = () => {
        setDashboardLoading(true)

        const filteredMetrics = quizMetrics.filter(metric => {
            let result = true
            if(inicio) {
                if (dayjs(metric.data) < dayjs(inicio))
                    result = false
            }
            if (fim) {
                if (dayjs(metric.data) > dayjs(fim).set('hour', 23).set('minute', 59).set('second', 59))
                    result = false
            }
            return result
        })

        setFilteredMetrics(filteredMetrics)
        getDashboardData(filteredMetrics)

        setDashboardLoading(false)
    }

    const getDashboardData = (quizMetrics) => {
        let access = 0
        let totalLeads = 0
        let colorIndex = 0

        const result = quizMetrics.reduce((acc, cur) => {
            if (cur.acesso) {
                access++
                return acc
            }
            
            if (cur.lead) totalLeads++

            const key = cur.lead ? 'Leads' : cur.pergunta

            acc[key] = acc[key] || {}
            
            acc[key].ocorrencias = acc[key].ocorrencias || 0
            acc[key].ocorrencias++

            acc[key].metricas = acc[key].metricas || []
            acc[key].metricas.push(cur)

            acc[key].color = acc[key].color || funilColors[colorIndex] || getRandomColor()
            
            colorIndex++
            return acc
        },{})
        
        if (result['Leads']) {
            const leads = result['Leads']
            delete result['Leads']
            result['Leads'] = leads
        }
        
        setTotalLeads(totalLeads)
        setDashboardData(result)
        setQuizAccess(access)
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
                                    <h4 className="Dashboard-nome" onClick={() => loadQuiz(quiz)}>{quiz.nome}</h4>
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
            {
                dashboardLoading ?
                    <div className="Dashboard-LoaderAreaDash">
                        <div className="Dashboard-loader" />
                    </div>
                :
                    Object.keys(dashboardData).length > 0 || (inicio || fim) ?
                        <div className="Dashboard-quizInfo">
                            <div className="Dashboard-periodoArea">
                                <input type="date" id="inicio" className="Dashboard-btnPeriodo" onChange={(e) => setInicio(e.target.value)}/>
                                <input type="date" id="fim" className="Dashboard-btnPeriodo" onChange={(e) => setFim(e.target.value)}/>
                            </div>
                            <div className="Dashboard-titleArea">
                                {
                                    Object.keys(dashboardData).length === 0 && (inicio || fim) ?
                                        <h2 className="Dashboard-quizTitleFunil">Sem resultados para esse período</h2>
                                    :
                                        <h2 className="Dashboard-quizTitleFunil">{selectedQuiz.nome}</h2>
                                }
                            </div>
                            <div className="Dashboard-funilArea">
                                {mountBar()}
                            </div>
                            <div className="Dashboard-legendaArea">
                                {mountLegenda()}
                            </div>
                            <p className="Dashboard-duplicacoes">Quantidade de duplicações do Quiz: {selectedQuiz.duplicidade}</p>
                        </div>
                    :
                        <div className="Dashboard-quizInfo Dashboard-selectQuiz">
                            <h3>{selectedQuiz ? 'Este Quiz ainda não possui registros' : 'Selecione um Quiz'}</h3>
                        </div>
            }
        </div>
    );
};

export default Dashboard;