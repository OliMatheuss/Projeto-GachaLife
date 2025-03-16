// src/components/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;