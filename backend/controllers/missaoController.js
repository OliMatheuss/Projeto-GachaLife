// backend/controllers/missaoController.js

const Missao = require('../models/Missao'); // Importa o modelo de missão

// Controlador para listar todas as missões
exports.getAllMissoes = (req, res) => {
  Missao.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Controlador para buscar uma missão por ID
exports.getMissaoById = (req, res) => {
  const missaoId = req.params.id;
  Missao.getById(missaoId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result) {
      return res.status(404).json({ error: 'Missão não encontrada' });
    }
    res.json(result);
  });
};

// Controlador para criar uma nova missão
exports.createMissao = (req, res) => {
  const novaMissao = req.body;
  Missao.create(novaMissao, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...novaMissao });
  });
};

// Controlador para atualizar uma missão existente
exports.updateMissao = (req, res) => {
  const missaoId = req.params.id;
  const missaoAtualizada = req.body;
  Missao.update(missaoId, missaoAtualizada, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: missaoId, ...missaoAtualizada });
  });
};

// Controlador para excluir uma missão
exports.deleteMissao = (req, res) => {
  const missaoId = req.params.id;
  Missao.delete(missaoId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Missão excluída com sucesso' });
  });
};