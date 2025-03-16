// backend/controllers/recompensaController.js

const Recompensa = require('../models/Recompensa'); // Importa o modelo de recompensa

// Controlador para listar todas as recompensas
exports.getAllRecompensas = (req, res) => {
  Recompensa.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Controlador para buscar uma recompensa por ID
exports.getRecompensaById = (req, res) => {
  const recompensaId = req.params.id;
  Recompensa.getById(recompensaId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result) {
      return res.status(404).json({ error: 'Recompensa não encontrada' });
    }
    res.json(result);
  });
};

// Controlador para criar uma nova recompensa
exports.createRecompensa = (req, res) => {
  const novaRecompensa = req.body;
  Recompensa.create(novaRecompensa, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...novaRecompensa });
  });
};

// Controlador para atualizar uma recompensa existente
exports.updateRecompensa = (req, res) => {
  const recompensaId = req.params.id;
  const recompensaAtualizada = req.body;
  Recompensa.update(recompensaId, recompensaAtualizada, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: recompensaId, ...recompensaAtualizada });
  });
};

// Controlador para excluir uma recompensa
exports.deleteRecompensa = (req, res) => {
  const recompensaId = req.params.id;
  Recompensa.delete(recompensaId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Recompensa excluída com sucesso' });
  });
};