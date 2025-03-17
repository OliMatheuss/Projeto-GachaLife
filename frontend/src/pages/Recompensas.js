// src/pages/Recompensas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecompensas, excluirRecompensa } from '../services/recompensaService';

const Recompensas = () => {
    const navigate = useNavigate();
    const [recompensas, setRecompensas] = useState([]);
    const [isExclusaoLiberada, setIsExclusaoLiberada] = useState(false);

    useEffect(() => {
        const fetchRecompensas = async () => {
            try {
                const data = await getRecompensas();
                setRecompensas(data);
            } catch (error) {
                console.error('Erro ao buscar recompensas:', error);
            }
        };
        fetchRecompensas();
    }, []);

    const toggleExclusao = () => setIsExclusaoLiberada(!isExclusaoLiberada);

    const handleExcluirRecompensa = async (id) => {
        try {
            await excluirRecompensa(id);
            setRecompensas(recompensas.filter((rec) => rec.id !== id));
        } catch (error) {
            console.error('Erro ao excluir recompensa:', error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/inicio')}>Voltar</button>
            <button onClick={toggleExclusao}>
                {isExclusaoLiberada ? 'Desabilitar Exclusão' : 'Liberar Exclusão'}
            </button>

            <h3>Minhas Recompensas</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {recompensas.length > 0 ? (
                        recompensas.map((recompensa) => (
                            <tr key={recompensa.id}>
                                <td>{recompensa.descricao}</td>
                                <td>
                                    {isExclusaoLiberada && (
                                        <button onClick={() => handleExcluirRecompensa(recompensa.id)}>Excluir</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Sem recompensas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Recompensas;
