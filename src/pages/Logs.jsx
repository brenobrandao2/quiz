import React, { useEffect, useState } from 'react';
import { getAll } from '../repository/logs.repository';
import '../css/Logs.css'
import dayjs from 'dayjs';

import ARROW_LEFT from '../assets/left-arrow.png'
import ARROW_RIGHT from '../assets/right-arrow.png'

const pageSize = 15

const Logs = () => {
    const [allLogs, setAllLogs] = useState([])
    const [logsToShow, setLogsToShow] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getLogs = async () => {
            setLoading(true)
            const allLogs = await getAll()
            const logsToShow = paginate(allLogs, pageSize, 1)
            setLogsToShow(logsToShow)
            setLoading(false)
            console.log(allLogs)
            setAllLogs(allLogs)
        }
        
        getLogs()
    },[])

    const repaginate = (pageNumber) => {
        if (pageNumber > 0) {
            const logsToShow = paginate(allLogs, pageSize, pageNumber)
            if (logsToShow && logsToShow.length > 0) {
                setLogsToShow(logsToShow)
                setPageNumber(pageNumber)
            }
        }
    }

    function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const getLogsRows = () => {
        return logsToShow.map(log => {
            return(
                <tr key={log._id}>
                    <td>{dayjs(log.data).format('MM/DD/YYYY HH:mm:ss')}</td>
                    <td>{log.usuario}</td>
                    <td>{log.descricao}</td>
                    <td className="Logs-tdDetalhes">{log.detalhes}</td>
                </tr>
            )
        })
    }

    const changePage = (isNext) => {
        if (isNext) repaginate(pageNumber + 1)
        else repaginate(pageNumber - 1)

    }

    return (
        <div className="Logs-container">
            {loading ?
                <div className="Logs-LoaderArea">
                    <div className="Logs-loader"/>
                </div>
            :
                <table className="Logs-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Usuário</th>
                            <th>Descrição</th>
                            <th>Log</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getLogsRows()}
                    </tbody>
                </table>
            }
            <div className="Logs-pagination">
                <img src={ARROW_LEFT} alt="arrow_left_img" className="Logs-arrowLeft" onClick={() => changePage(false)} />
                <p className="Logs-pageNumber">{pageNumber}</p>
                <img src={ARROW_RIGHT} alt="arrow_right_img" className="Logs-arrowRight" onClick={() => changePage(true)} />
            </div>
        </div>
    );
};

export default Logs;