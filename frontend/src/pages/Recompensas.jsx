// src/pages/Recompensas.js
import React, { useEffect, useState } from 'react';
import { getRecompensas } from '../services/recompensaService';

const Recompensas = () => {
  const [recompensas, setRecompensas] = useState([]);

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

  return (
    <div>
      <h1>Recompensas</h1>
      <ul>
        {recompensas.map((recompensa) => (
          <li key={recompensa.id}>{recompensa.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recompensas;