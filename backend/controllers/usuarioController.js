// backend/controllers/usuarioController.js

const Usuario = require('../models/Usuario'); // Importa o modelo de usuário

// Controlador para listar todos os usuários
exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Controlador para buscar um usuário por ID
exports.getUsuarioById = (req, res) => {
  const usuarioId = req.params.id;
  Usuario.getById(usuarioId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(result);
  });
};

// Controlador para criar um novo usuário
exports.createUsuario = (req, res) => {
  const novoUsuario = req.body;
  Usuario.create(novoUsuario, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...novoUsuario });
  });
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