// src/pages/Missions.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Missions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Busca a lista de missões ao carregar a página
    api.get('/missoes')
      .then(response => setMissions(response.data))
      .catch(error => console.error('Erro ao buscar missões:', error));
  }, []);

  return (
    <div>
      <h1>Missões</h1>
      <ul>
        {missions.map(mission => (
          <li key={mission.id}>
            {mission.descricao} - {mission.pontos_recompensa} pontos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Missions;