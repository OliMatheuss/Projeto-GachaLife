import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function Inicio() {
  const [username, setUsername] = useState('Carregando...');
  const [pontos, setPontos] = useState(0);
  const [loading, setLoading] = useState(true);
  const { logout, token, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      console.log('Usuário não autenticado. Redirecionando para login.');
      navigate('/login'); // Redireciona para login se o usuário não estiver autenticado
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      console.log('Token JWT:', token);
      console.log('ID do usuário extraído do token:', userId);

      fetch(`http://localhost:5000/api/usuarios/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      })
        .then((response) => {
          console.log('Resposta do backend:', response);
          if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Dados do usuário recebidos:', data);

          if (Array.isArray(data) && data.length > 0) {
            const user = data[0];
            setUsername(user.username);
            setPontos(user.pontos);
          } else {
            console.error('Resposta inesperada do backend:', data);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
          logout();
          navigate('/login');
        });
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      logout();
      navigate('/login');
    }
  }, [isAuthenticated, token, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
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