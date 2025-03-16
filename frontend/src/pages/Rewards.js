// src/pages/Rewards.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Busca a lista de recompensas ao carregar a página
    api.get('/recompensas')
      .then(response => setRewards(response.data))
      .catch(error => console.error('Erro ao buscar recompensas:', error));
  }, []);

  return (
    <div>
      <h1>Recompensas</h1>
      <ul>
        {rewards.map(reward => (
          <li key={reward.id}>
            {reward.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;