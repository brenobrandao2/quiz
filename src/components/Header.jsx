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
                <Link to="/create-question" className="Header-link">Create Question</Link>
                <Link to="/create-final-card" className="Header-link">Create Final Card</Link>
                <Link to="/answers-configuration" className="Header-link">Answers Configuration</Link>
            </div>
            <img src={logo} alt="Logo" className="Header-logo"/>
        </div>
    );
};

export default Header;