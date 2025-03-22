import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Inicio() {
  const [username, setUsername] = useState('Carregando...');
  const [pontos, setPontos] = useState(0);
  const [loading, setLoading] = useState(true);
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('Usuário não autenticado. Redirecionando para login.');
      navigate('/login'); // Redireciona para login se o usuário não estiver autenticado
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log('Iniciando requisição para buscar dados do usuário...');
        const response = await fetch('http://localhost:5000/api/usuarios/me', {
          method: 'GET',
          credentials: 'include', // Inclui cookies na requisição
        });
    
        console.log('Status da resposta:', response.status);
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erro do backend:', errorData);
    
          if (response.status === 401 || response.status === 403) {
            console.log('Erro de autenticação. Redirecionando para login.');
            logout();
            navigate('/login');
          }
    
          throw new Error('Erro ao buscar dados do usuário');
        }
    
        const data = await response.json();
        console.log('Dados do usuário recebidos:', data);
    
        setUsername(data.username);
        setPontos(data.pontos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
    
        if (!loading) {
          logout();
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate, logout]);

  const handleLogout = async () => {
    try {
      await logout(); // Chama a função de logout do contexto
      navigate('/login'); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h3>Olá, {username}</h3>
      <h3>Pontos Totais: {pontos}</h3>
      <nav>
        <button>
          <Link to="/missoes">Missões</Link>
        </button>
        <button>
          <Link to="/recompensas">Recompensas</Link>
        </button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default Inicio;