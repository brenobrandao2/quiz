import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Configurations.css'

const Configurations = () => {
    return (
        <div className="Configuration-container">
            <Link className="Configuration-item" to="/users">Gerenciar usuários</Link>
            <Link className="Configuration-item" to="/dashboard">Dashboard</Link>
            <Link className="Configuration-item" to="/logs">Registros</Link>
            <Link className="Configuration-item" to="/logo">Logo</Link>
        </div>
    );
};

export default Configurations;