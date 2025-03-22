import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log('Estado de autenticação no ProtectedRoute:', isAuthenticated);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    console.log('Usuário não autenticado. Redirecionando para login.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;