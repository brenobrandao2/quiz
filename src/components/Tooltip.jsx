import React from 'react';
import '../css/Tooltip.css'

const Tooltip = (props) => {
    console.log(props)
    return (
        <div className="Tooltip-container" style={{ display: props.show ? 'flex' : 'none' }}>
            <div className="Tooltip-main">
                <p className="Tooltip-text">{props.text}</p>
            </div>
        </div>
    );
};

export default Tooltip;

/*

import Tooltip from '../components/Tooltip'

const [tooltipProps, setTooltipProps] = useState({
        text: '',
        show: false
    })

const showTooltip = () => {
    setTooltipProps({
        text: 'Mostrando mensagem por 3 segundos...',
        show: true
    })
    setTimeout(() => {
        setTooltipProps({
            text: '',
            show: false
        })
    },3000)
}

<Tooltip {...tooltipProps}/>

*/