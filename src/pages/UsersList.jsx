import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../css/UsersList.css'
import PEN_IMG from '../assets/pen.png'
import DELETE_IMG from '../assets/delete.png'
import { getAll, deleteById } from '../repository/user.repository.js'

const UsersList = (props) => {
    const [searchNameText, setSearchNameText] = useState('')
    const [completeListUsers, setCompleteListUsers] = useState([])
    const [listShowUsers, setListShowUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        reloadUsersList()
    }, []);

    const reloadUsersList = async () => {
        setLoading(true)
        const res = await getAll()
        console.log(res)
        setCompleteListUsers(res)
        setLoading(false)
    }

    const deleteUser = async (id) => {
        const res = window.confirm('Clique em OK para confirmar a exclusão do usuário')
        if (res === true) {
            await deleteById(id)
            setListShowUsers([])
            reloadUsersList()
        }
    }
      
    useEffect(() => {
        if(searchNameText){
            setListShowUsers(completeListUsers.filter(quiz => (quiz.nome.toLowerCase()).includes(searchNameText.toLowerCase())))}
        else
        setListShowUsers(completeListUsers)
    },[searchNameText, completeListUsers])

    return (
        <div className="UsersList-container">
            <div className="UsersList-options">
                <input className="UsersList-searchUserField" placeholder="Pesquisar usuário pelo nome" onChange={(event) => setSearchNameText(event.target.value)} />
                <Link to='create-user' className="UsersList-newUserButton">Criar um novo usuário</Link>
            </div>
            <div className="UsersList-listUsersArea">
                {!loading ?
                    listShowUsers.map((user, index) => {
                        return(
                            <div key={index} className="UsersList-userArea">
                                <h4 className="UsersList-nome">{user.nome}</h4>
                                <div className="UsersList-iconsArea">
                                    <img src={PEN_IMG} alt="pen_img" className="UsersList-icon" onClick={() => props.history.push('create-user', { userInfo: user })}/>
                                    <img src={DELETE_IMG} alt="delete_img" className="UsersList-icon" onClick={() => deleteUser(user._id)}/> 
                                </div>
                            </div>
                        )
                    })
                :
                    <div className="UsersList-LoaderArea">
                        <div className="UsersList-loader" />
                    </div>
                }
            </div>
        </div>
    );
};

export default UsersList;