// src/pages/Missoes.js
import React, { useEffect, useState } from 'react';
import { getMissoes } from '../services/missaoService';

const Missoes = () => {
  const [missoes, setMissoes] = useState([]);

  useEffect(() => {
    const fetchMissoes = async () => {
      try {
        const data = await getMissoes();
        setMissoes(data);
      } catch (error) {
        console.error('Erro ao buscar missões:', error);
      }
    };
    fetchMissoes();
  }, []);

  return (
    <div>
      <h1>Missões</h1>
      <ul>
        {missoes.map((missao) => (
          <li key={missao.id}>{missao.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Missoes;