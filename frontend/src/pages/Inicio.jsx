import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Missoes from './Missoes';
import Recompensas from './Recompensas';  // Alterado para RecompensasPage
import './Inicio.css';

function Inicio() {
    const [username, setUsername] = useState('Carregando...');  // Default como "Carregando..."
    const [pontos, setPontos] = useState(0);
    const [loading, setLoading] = useState(true);  // Controle de loading

    useEffect(() => {
        // Simula um ID de usuário logado (isso deve vir da autenticação real)
        const userId = localStorage.getItem('userId');  // Ou do contexto de autenticação

        if (userId) {
            fetch(`http://localhost:3001/usuarios/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setUsername(data.username || 'Usuário não encontrado');
                    setPontos(data.pontos || 0);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Erro ao buscar usuário:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);  // Se não tiver userId, apenas termina o loading
        }
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h3>Olá, {username}</h3>
            <h3>Pontos Totais: {pontos}</h3>
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
