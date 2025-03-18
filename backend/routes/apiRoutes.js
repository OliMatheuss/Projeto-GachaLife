// backend/routes/apiRoutes.js

const express = require('express'); // Framework para criar o servidor
const router = express.Router(); // Cria um roteador para definir as rotas

// Importa os controladores
const usuarioController = require('../controllers/usuarioController');
const missaoController = require('../controllers/missaoController');
const recompensaController = require('../controllers/recompensaController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware de autenticação

// Rota raiz para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API está funcionando!'); // Responde com uma mensagem simples
});

// Rotas para a tabela "usuarios"
router.get('/usuarios', usuarioController.getAllUsuarios); // Listar todos os usuários
router.get('/usuarios/:id', usuarioController.getUsuarioById); // Buscar um usuário por ID
router.post('/usuarios', usuarioController.createUsuario); // Criar um novo usuário
router.put('/usuarios/:id', usuarioController.updateUsuario); // Atualizar um usuário existente
router.delete('/usuarios/:id', usuarioController.deleteUsuario); // Excluir um usuário

// Rotas para a tabela "missoes"
router.get('/missoes', authenticateToken, missaoController.getMissoesByUser); // Listar todas as missões do usuário logado
router.get('/missoes/:id', missaoController.getMissaoById); // Buscar uma missão por ID
router.post('/missoes', authenticateToken, missaoController.createMissao); // Criar uma nova missão
router.put('/missoes/:id', authenticateToken, missaoController.updateMissao); // Atualizar uma missão existente
router.delete('/missoes/:id', authenticateToken, missaoController.deleteMissao); // Excluir uma missão

// Rotas para a tabela "recompensas"
router.get('/recompensas', recompensaController.getAllRecompensas); // Listar todas as recompensas
router.get('/recompensas/:id', recompensaController.getRecompensaById); // Buscar uma recompensa por ID
router.post('/recompensas', recompensaController.createRecompensa); // Criar uma nova recompensa
router.put('/recompensas/:id', recompensaController.updateRecompensa); // Atualizar uma recompensa existente
router.delete('/recompensas/:id', recompensaController.deleteRecompensa); // Excluir uma recompensa

// Exporta o roteador para ser usado no index.js
module.exports = router;