import React, { useState } from 'react';
import '../css/Login.css'

import Tooltip from '../components/Tooltip'
import { tryLogin } from '../repository/user.repository';
import { useHistory } from 'react-router';
import { useUser } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [, saveUser] = useUser()
    const [feedback, setFeedback] = useState('Entrar')
    const [fail, setFail] = useState(false)
    const history = useHistory()

    const [tooltipProps, setTooltipProps] = useState({
        text: '',
        show: false
    })

    const showTooltip = (text) => {
        setTooltipProps({
            text,
            show: true
        })
        setTimeout(() => {
            setTooltipProps({
                text: '',
                show: false
            })
        },5000)
    }

    const logar = async () => {
        setFeedback('Aguarde...')
        const isLogged = await tryLogin(email, senha)
        if (isLogged?.status) {
            setFail(false)
            await saveUser(isLogged.user)
            history.push('/')
        } else {
            setFail(true)
            showTooltip('E-mail e/ou senha incorretos')
        }
        setFeedback('Entrar')
    }

    const inputStyle = () => {
        if (fail) {
            return { 'borderColor': 'red'}
        }
    }

    return (
        <div className="Login-container">
            <div className="Login-card">
                <label className="Login-label">E-mail:</label>
                <input type="text" className="Login-input" style={inputStyle()} onChange={(e) => setEmail(e.target.value)} />
                <label className="Login-label">Senha:</label>
                <input type="password" className="Login-input" style={inputStyle()} onChange={(e) => setSenha(e.target.value)} />
                <input type="button" className="Login-button" value={feedback} onClick={() => logar()} />
            </div>
            <Tooltip {...tooltipProps}/>
        </div>
    );
};

export default Login;