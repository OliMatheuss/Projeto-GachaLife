// src/services/missaoService.js
import api from './api';

export const getMissoes = async () => {
  try {
    const response = await api.get('/missoes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar missões:', error);
    throw error;
  }
};

export const createMissao = async (missao) => {
  try {
    const response = await api.post('/missoes', missao);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar missão:', error);
    throw error;
  }
};