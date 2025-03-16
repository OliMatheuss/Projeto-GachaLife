// src/services/usuarioService.js
import api from './api';

export const signUp = async (usuario) => {
  try {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
};

export const login = async (credenciais) => {
  try {
    const response = await api.post('/login', credenciais); // Ajuste a rota conforme o backend
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};