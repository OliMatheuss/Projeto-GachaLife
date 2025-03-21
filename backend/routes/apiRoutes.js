const express = require('express'); // Framework para criar o servidor
const router = express.Router(); // Cria um roteador para definir as rotas
const { body, validationResult } = require('express-validator');
// Importa os controladores
const usuarioController = require('../controllers/usuarioController');
const missaoController = require('../controllers/missaoController');
const recompensaController = require('../controllers/recompensaController');

// Importa o middleware de autenticação
const authenticateToken = require('../middleware/authenticateToken');

// Rota raiz para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API está funcionando!'); // Responde com uma mensagem simples
});

// Rotas para a tabela "usuarios"
router.get('/usuarios', authenticateToken, usuarioController.getAllUsuarios); // Listar todos os usuários (protegido)
router.get('/usuarios/:id', authenticateToken, usuarioController.getUsuarioById); // Buscar um usuário por ID (protegido)
router.post('/usuarios', usuarioController.createUsuario); // Criar um novo usuário (não protegido)
router.put('/usuarios/:id', authenticateToken, usuarioController.updateUsuario); // Atualizar um usuário existente (protegido)
router.delete('/usuarios/:id', authenticateToken, usuarioController.deleteUsuario); // Excluir um usuário (protegido)
// Rota de login
router.post('/login', usuarioController.login);

// Rotas para a tabela "missoes"
router.get('/missoes', authenticateToken, missaoController.getAllMissoes); // Listar todas as missões (protegido)
router.get('/missoes/:id', authenticateToken, missaoController.getMissaoById); // Buscar uma missão por ID (protegido)
router.post('/missoes', authenticateToken, missaoController.createMissao); // Criar uma nova missão (protegido)
router.put('/missoes/:id', authenticateToken, missaoController.updateMissao); // Atualizar uma missão existente (protegido)
router.delete('/missoes/:id', authenticateToken, missaoController.deleteMissao); // Excluir uma missão (protegido)

// Rotas para a tabela "recompensas"
router.get('/recompensas', authenticateToken, recompensaController.getAllRecompensas); // Listar todas as recompensas (protegido)
router.get('/recompensas/:id', authenticateToken, recompensaController.getRecompensaById); // Buscar uma recompensa por ID (protegido)
router.post('/recompensas', authenticateToken, recompensaController.createRecompensa); // Criar uma nova recompensa (protegido)
router.put('/recompensas/:id', authenticateToken, recompensaController.updateRecompensa); // Atualizar uma recompensa existente (protegido)
router.delete('/recompensas/:id', authenticateToken, recompensaController.deleteRecompensa); // Excluir uma recompensa (protegido)

// Exporta o roteador para ser usado no index.js
module.exports = router;