import React, { useEffect, useState } from 'react';
import '../css/Header.css'
// import logo from '../assets/LogoLifeAndMoney.png'
import back from '../assets/back.png'
import { Link, useHistory } from 'react-router-dom';

import LOGOUT_IMG from '../assets/logout.png'
import { useUser } from '../contexts/AuthContext';
import { getImages } from '../repository/quiz.repository';

const Header = () => {
    const history = useHistory()
    const [user, ,cleanUser] = useUser()
    const [logo, setLogo] = useState()

    useEffect(() => {
        const setImages = async () => {
          const allImages = await getImages()
          const logoDoc = allImages && allImages.length > 0 ? allImages.find(image => image.tipo === 'logo') : ''
          
          if (logoDoc) {
            setLogo(`data:${logoDoc.logo.mimetype};base64,${logoDoc.logo.buffer}`)
          }
      }
    
      setImages()
      },[])

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
                    <Link to="/dashboard" className="Header-link">Dashboard</Link>
                    <Link to="/configurations" className="Header-link">Configurações</Link>
                </div>}
            { logo ? <img src={logo} alt="Logo" className="Header-logo"/> : null}
            {user && <p className="Header-user">Olá, {user.nome}!</p>}
            {user && <img src={LOGOUT_IMG} alt="logout_img" className="Header-logoutIcon" onClick={() => logout()} />}
        </div>
    );
};

export default Header;