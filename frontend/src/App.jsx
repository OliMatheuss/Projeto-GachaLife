import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Recompensas from './pages/Recompensas';
import Missoes from './pages/Missoes'; // Importa a página Missoes
import Inicio  from './pages/Inicio';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protege a rota de Recompensas */}
          <Route
            path="/recompensas"
            element={
              <ProtectedRoute>
                <Recompensas />
              </ProtectedRoute>
            }
          />
          
          {/* Protege a rota de Missoes */}
          <Route
            path="/missoes"
            element={
              <ProtectedRoute>
                <Missoes />
              </ProtectedRoute>
            }
          />
          
          {/* Protege a rota de Inicio */}
          <Route
            path="/inicio/*"
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
