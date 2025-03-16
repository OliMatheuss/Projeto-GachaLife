// src/pages/SignUp.js

// Importando hooks e funções necessárias do React e da biblioteca react-router-dom
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importando a função signUp do serviço de usuário
import { signUp } from '../services/usuarioService';

const SignUp = () => {
  // Definindo o estado do formulário com os campos: email, username, senha e confirmação de senha
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    senha: '',
    confirmSenha: '', // Campo para confirmação da senha
  });

  // Navegador para redirecionar após o cadastro
  const navigate = useNavigate();

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Atualiza o estado do formulário com o nome e valor do campo alterado
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas são iguais antes de prosseguir com o cadastro
    if (formData.senha !== formData.confirmSenha) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return; // Interrompe o cadastro caso as senhas não sejam iguais
    }

    try {
      // Chama a função signUp para realizar o cadastro
      await signUp(formData);
      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // Redireciona para a página de login após o cadastro bem-sucedido
    } catch (error) {
      alert('Erro ao cadastrar usuário. Tente novamente.'); // Exibe uma mensagem de erro caso o cadastro falhe
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} // Chama a função handleChange quando o valor do campo mudar
            required // Campo obrigatório
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange} // Chama a função handleChange quando o valor do campo mudar
            required // Campo obrigatório
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange} // Chama a função handleChange quando o valor do campo mudar
            required // Campo obrigatório
          />
        </div>
        <div>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            name="confirmSenha"
            value={formData.confirmSenha}
            onChange={handleChange} // Chama a função handleChange quando o valor do campo mudar
            required // Campo obrigatório
          />
        </div>
        {/* Botão para submeter o formulário */}
        <button type="submit">Cadastrar</button>
      </form>
      {/* Link para a página de login, caso o usuário já tenha uma conta */}
      <p>
        Já tem uma conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
};

export default SignUp;
