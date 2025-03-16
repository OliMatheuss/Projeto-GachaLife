// src/pages/SignUp.js

import React, { useState } from 'react';
import api from '../services/api';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios', { email, username, senha });
      console.log('Usuário criado:', response.data);
      // Redirecionar para a página de login após o cadastro
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div>
      <h1>Criar Cadastro</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUp;