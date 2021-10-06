import React, { useState, useEffect } from 'react';
import { insert, update, User } from '../repository/user.repository';
import '../css/CreateUser.css'
import Tooltip from '../components/Tooltip';
import { userValidation } from '../utils/userValidation';
import { useHistory } from 'react-router';
import { useUser } from '../contexts/AuthContext';

const CreateUser = (props) => {
    const [userInfo, setUserInfo] = useState(new User())
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [notNew, setNotNew] = useState(false)
    const [user, saveUser,] = useUser()
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
        },10000)
    }

    useEffect(() => {
        const { userInfo } = props.location.state || {}
        if (userInfo) {
            setNotNew(true)
            setNome(userInfo.nome)
            setEmail(userInfo.email)
            // setSenha(userInfo.senha)
            setUserInfo(userInfo)
        }
    },[props])

    const updateUser = () => {
        const newUser = {...userInfo}
        newUser.nome = nome
        newUser.email = email
        newUser.senha = senha
        return newUser
    }

    const saveUserInfo = async () => {
        const newUser = updateUser()
        const validation = userValidation(newUser)
        
        if (validation){
            showTooltip(validation)
            return
        }

        try {
            console.log(userInfo._id)
            if (userInfo._id) await update(newUser)
            else await insert(newUser)
            updateLocalUser()
            history.push('/users')
        } catch (error) {
            alert(`Falha ao registrar usuário \n ${error}`)
        }
    }

    const updateLocalUser = (newUser) => {
        if (user.email === newUser.email) {
            const newLocalUser = {...user}
            newLocalUser.nome = newUser.nome
            newLocalUser.senha = newUser.senha
            saveUser(newLocalUser)
        }
    }

    return (
        <div className='CreateUser-container'>
            <div className="CreateUser-inputArea">
                <label>Nome:</label>
                <input value={nome} className="CreateUser-input" onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div className="CreateUser-inputArea">
                <label>E-mail:</label>
                <input disabled={notNew} value={email} className="CreateUser-input" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="CreateUser-inputArea">
                <label>Senha:</label>
                <input value={senha} className="CreateUser-input" onChange={(e) => setSenha(e.target.value)}/>
            </div>
            <input type="button" value="Salvar" className="CreateUser-button" onClick={() => saveUserInfo()} />
            <Tooltip {...tooltipProps}/>
        </div>
    );
};

export default CreateUser;