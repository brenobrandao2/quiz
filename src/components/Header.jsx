import React from 'react';
import '../css/Header.css'
import logo from '../assets/LogoLifeAndMoney.png'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="Header-container">
            <div className="Header-linksArea">
                <Link to="/" className="Header-link">Quiz</Link>
                <Link to="/create-quiz" className="Header-link">Create Quiz</Link>
            </div>
            <img src={logo} alt="Logo" className="Header-logo"/>
        </div>
    );
};

export default Header;