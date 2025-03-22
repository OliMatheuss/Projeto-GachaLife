// backend/controllers/usuarioController.js

const Usuario = require('../models/Usuario'); // Importa o modelo de usuário
const jwt = require('jsonwebtoken');
const db = require('../config/db'); 

exports.getUsuarioById = (req, res) => {
  const usuarioId = req.params.id;

  db.query('SELECT id, email, username, pontos FROM usuarios WHERE id = ?', [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(results); // Retorna os dados do usuário como um array
  });
};

// Controlador para listar todos os usuários
exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
//Criar um usuario 
const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
  const { email, username, senha } = req.body;

  // Gera o hash da senha
  const hashedPassword = bcrypt.hashSync(senha, 10);

  db.query(
    'INSERT INTO usuarios (email, username, senha) VALUES (?, ?, ?)',
    [email, username, hashedPassword],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar usuário:', err);
        return res.status(500).json({ message: 'Erro no servidor.' });
      }
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }
  );
};

// Controlador para atualizar um usuário existente
exports.updateUsuario = (req, res) => {
  const usuarioId = req.params.id;
  const usuarioAtualizado = req.body;
  Usuario.update(usuarioId, usuarioAtualizado, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: usuarioId, ...usuarioAtualizado });
  });
};

// Controlador para excluir um usuário
exports.deleteUsuario = (req, res) => {
  const usuarioId = req.params.id;
  Usuario.delete(usuarioId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  });
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = results[0];
    const senhaCorreta = bcrypt.compareSync(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, pontos: user.pontos },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });

    res.json({ message: 'Login bem-sucedido!' });
  });
};
