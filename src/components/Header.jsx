import React from 'react';
import '../css/Header.css'
import logo from '../assets/LogoLifeAndMoney.png'
import back from '../assets/back.png'
import { Link, useHistory } from 'react-router-dom';

import LOGOUT_IMG from '../assets/logout.png'
import { useUser } from '../contexts/AuthContext';

const Header = () => {
    const history = useHistory()
    const [user, ,cleanUser] = useUser()

    const logout = () => {
        cleanUser()
        history.push('/')
    }

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="Header-container">
            {user && <img src={back} alt="back_img" className="Header-back" onClick={() => goBack()} />}
            {user &&
                <div className="Header-linksArea">
                    <Link to="/" className="Header-link">Quiz</Link>
                    <Link to="/configurations" className="Header-link">Configurações</Link>
                </div>}
            <img src={logo} alt="Logo" className="Header-logo"/>
            {user && <img src={LOGOUT_IMG} alt="logout_img" className="Header-logoutIcon" onClick={() => logout()} />}
        </div>
    );
};

export default Header;