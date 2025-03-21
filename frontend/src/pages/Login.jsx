import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples dos campos
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Ativa o estado de carregamento

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, senha });
      const { token } = response.data;

      console.log('Token recebido do backend:', token); // Log para depuração

      login(token); // Salva o token no contexto e localStorage
      navigate('/inicio'); // Redireciona para a página "Inicio"
    } catch (err) {
      console.error('Erro durante o login:', err);
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;