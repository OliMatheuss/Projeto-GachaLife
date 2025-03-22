import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext); // Atualiza o estado de autenticação
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { email, senha },
        { withCredentials: true } // Inclui cookies na requisição
      );
  
      console.log('Login bem-sucedido:', response.data);
  
      setIsAuthenticated(true);
      navigate('/inicio');
    } catch (err) {
      console.error('Erro durante o login:', err);
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
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