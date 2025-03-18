import React, { useContext } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Missoes from './Missoes';
import Recompensas from './Recompensas';  // Alterado para RecompensasPage
import './Inicio.css';

function Inicio() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            {user && (
                <>
                    <h3>Olá, {user.username}</h3>
                    <h3>Pontos Totais: {user.pontos}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
            <nav>
                <button><Link to="/missoes">Missões</Link></button>
                <button><Link to="/recompensas">Recompensas</Link></button>  {/* Alterado para Recompensas */}
            </nav>
            <Routes>
                <Route path="/missoes" element={<Missoes />} />
                <Route path="/recompensas" element={<Recompensas />} />  {/* Alterado para RecompensasPage */}
            </Routes>
        </div>
    );
}

export default Inicio;