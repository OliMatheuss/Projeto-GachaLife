// src/pages/Recompensas.js
import React, { useEffect, useState } from 'react';
import { getRecompensas } from '../services/recompensaService';

const Recompensas = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [pontosTotais, setPontosTotais] = useState(1000);
  const [novaRecompensa, setNovaRecompensa] = useState('');
  const [isExclusaoLiberada, setIsExclusaoLiberada] = useState(false);
  const [isAddingRecompensa, setIsAddingRecompensa] = useState(false);

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

  const handleAddRecompensa = () => {
    if (novaRecompensa.trim()) {
      setRecompensas(prev => [...prev, { id: Date.now(), descricao: novaRecompensa }]);
      setNovaRecompensa('');
      setIsAddingRecompensa(false);
    } else {
      alert("Descrição não pode estar vazia!");
    }
  };

  const handleBaú = () => {
    if (pontosTotais >= 500 && recompensas.length > 0) {
      setPontosTotais(prev => prev - 500);
      alert(`Você ganhou: ${recompensas[Math.floor(Math.random() * recompensas.length)].descricao}`);
    } else {
      alert(pontosTotais < 500 ? 'Pontos insuficientes!' : 'Sem recompensas!');
    }
  };

  const handleExcluirRecompensa = (id) => {
    setRecompensas(prev => prev.filter(recompensa => recompensa.id !== id));
  };

  const toggleExclusao = () => setIsExclusaoLiberada(prev => !prev);

  return (
    <div>
      <h1>Recompensas</h1>
      <h3>Pontos: {pontosTotais}</h3>

      <button onClick={() => window.location.href = "./Inicio"}>Voltar</button>
      <button onClick={toggleExclusao}>{isExclusaoLiberada ? 'Desabilitar Exclusão' : 'Liberar Exclusão'}</button>
      <button onClick={() => setIsAddingRecompensa(!isAddingRecompensa)}>{isAddingRecompensa ? 'Cancelar' : 'Adicionar Recompensa'}</button>

      {isAddingRecompensa && (
        <div>
          <input value={novaRecompensa} onChange={e => setNovaRecompensa(e.target.value)} placeholder="Descrição" />
          <button onClick={handleAddRecompensa}>Salvar</button>
        </div>
      )}

      {pontosTotais >= 500 && recompensas.length > 0 && <button onClick={handleBaú}>Abrir Baú (500 pontos)</button>}

      <ul>
        {recompensas.length > 0 ? (
          recompensas.map(recompensa => (
            <li key={recompensa.id}>
              {recompensa.descricao}
              {isExclusaoLiberada && <button onClick={() => handleExcluirRecompensa(recompensa.id)}>Excluir</button>}
            </li>
          ))
        ) : (
          <p>Sem recompensas.</p>
        )}
      </ul>
    </div>
  );
};

export default Recompensas;