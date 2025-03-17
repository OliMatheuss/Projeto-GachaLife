import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MissoesPage from '../pages/MissoesPage';
import LojaPage from '../pages/LojaPage';

function Inicio() {
    const [username, setUsername] = useState('');
    const [pontos, setPontos] = useState(0);

    useEffect(() => {
        // Simula um ID de usuário logado (isso deve vir da autenticação real)
        const userId = 1;

        fetch(`http://localhost:3001/usuarios/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username);
                setPontos(data.pontos);
            })
            .catch((error) => console.error('Erro ao buscar usuário:', error));
    }, []);

    return (
        <div>
            <h3>Olá, {username || 'Carregando...'}</h3>
            <h3>Pontos Totais: {pontos}</h3>
            <nav>
                <button><Link to="/missoes">Missões</Link></button>
                <button><Link to="/loja">Loja</Link></button>
            </nav>
            <Routes>
                <Route path="/missoes" element={<MissoesPage />} />
                <Route path="/loja" element={<LojaPage />} />
            </Routes>
        </div>
    );
}

export default Inicio;
