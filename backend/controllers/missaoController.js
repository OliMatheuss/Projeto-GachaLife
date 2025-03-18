const Missao = require('../models/Missao'); // Importa o modelo de missão

// Controlador para listar todas as missões do usuário logado
exports.getMissoesByUser = (req, res) => {
  const userId = req.user.id; // Supondo que o middleware de autenticação adiciona o ID do usuário ao req.user
  Missao.getByUserId(userId, (err, results) => {
    if (err) {
      console.error('Erro ao buscar missões:', err);
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
      console.error('Erro ao buscar missão por ID:', err);
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
  const novaMissao = { ...req.body, usuario_id: req.user.id }; // Adiciona o ID do usuário à nova missão
  console.log('Criando nova missão:', novaMissao); // Log para depuração
  Missao.create(novaMissao, (err, result) => {
    if (err) {
      console.error('Erro ao criar missão:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Missão criada com sucesso:', result); // Log para depuração
    res.status(201).json({ id: result.insertId, ...novaMissao });
  });
};

// Controlador para atualizar uma missão existente
exports.updateMissao = (req, res) => {
  const missaoId = req.params.id;
  const missaoAtualizada = req.body;
  Missao.update(missaoId, missaoAtualizada, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar missão:', err);
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
      console.error('Erro ao excluir missão:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Missão excluída com sucesso' });
  });
};