import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null); // Estado para armazenar erro
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpa o erro antes da tentativa

    try {
      await login(email, senha); // Chama a função de login do contexto de autenticação
      navigate('/inicio'); // Redireciona após login
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      // Verifica se o erro tem resposta do backend
      if (error.response) {
        if (error.response.status === 401) {
          setError('Email ou senha incorretos.');
        } else {
          setError('Erro ao tentar fazer login. Tente novamente mais tarde.');
        }
      } else {
        setError('Erro de conexão com o servidor.');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro */}
      <form onSubmit={handleLogin}>
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
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;