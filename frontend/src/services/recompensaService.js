// src/services/recompensaService.js
import api from './api';

export const getRecompensas = async () => {
  try {
    const response = await api.get('/recompensas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    throw error;
  }
};

export const createRecompensa = async (recompensa) => {
  try {
    const response = await api.post('/recompensas', recompensa);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar recompensa:', error);
    throw error;
  }
};