import axios from 'axios';

export const getMissoes = async () => {
  try {
    const response = await axios.get('/api/missoes', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar missões:', error);
    throw error;
  }
};

export const createMissao = async (missao) => {
  try {
    const response = await axios.post('/api/missoes', missao, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar missão:', error);
    throw error;
  }
};

export const updateMissao = async (id, missao) => {
  try {
    const response = await axios.put(`/api/missoes/${id}`, missao, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar missão:', error);
    throw error;
  }
};