const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Certifique-se de ter o db configurado corretamente
const winston = require('winston'); // Para logs

// Importa os controladores
const usuarioController = require('../controllers/usuarioController');
const missaoController = require('../controllers/missaoController');
const recompensaController = require('../controllers/recompensaController');

// Importa o middleware de autenticação
const authenticateToken = require('../middleware/authenticateToken');

// Configuração do logger (Winston)
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Rota raiz para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Rotas de autenticação
router.get('/auth/verify', authenticateToken, (req, res) => {
  logger.info('Rota /auth/verify acessada');
  res.json({ isAuthenticated: true, user: req.user });
});

router.post('/logout', (req, res) => {
  logger.info('Rota /logout acessada');
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logout bem-sucedido!' });
});

// Rotas para a tabela "usuarios"
router.get('/usuarios', authenticateToken, usuarioController.getAllUsuarios);
router.get('/usuarios/:id', authenticateToken, usuarioController.getUsuarioById);

router.post(
  '/usuarios',
  [
    body('email')
      .isEmail().withMessage('Email inválido')
      .custom(async (value) => {
        const user = await db.query('SELECT * FROM usuarios WHERE email = ?', [value]);
        if (user.length > 0) {
          throw new Error('Este e-mail já está em uso.');
        }
        return true;
      }),
    body('senha')
      .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    body('username')
      .notEmpty().withMessage('O nome de usuário é obrigatório')
      .custom(async (value) => {
        const user = await db.query('SELECT * FROM usuarios WHERE username = ?', [value]);
        if (user.length > 0) {
          throw new Error('Este nome de usuário já está em uso.');
        }
        return true;
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error('Erros de validação ao criar usuário:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    usuarioController.create(req, res);
  }
);

router.put('/usuarios/:id', authenticateToken, usuarioController.updateUsuario);
router.delete('/usuarios/:id', authenticateToken, usuarioController.deleteUsuario);

// Rota de login
router.post('/login', (req, res) => {
  logger.info('Rota /login acessada');
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) {
      logger.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];
    const senhaCorreta = bcrypt.compareSync(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta.' });
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

    res.json({ message: 'Login bem-sucedido!', token });
  });
});

// Rota para buscar os dados do usuário autenticado
router.get('/usuarios/me', authenticateToken, (req, res) => {
  logger.info('Rota /usuarios/me acessada');
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    pontos: user.pontos,
  });
});

// Rotas para a tabela "missoes"
router.get('/missoes', authenticateToken, missaoController.getAllMissoes);
router.get('/missoes/:id', authenticateToken, missaoController.getMissaoById);
router.post('/missoes', authenticateToken, missaoController.createMissao);
router.put('/missoes/:id', authenticateToken, missaoController.updateMissao);
router.delete('/missoes/:id', authenticateToken, missaoController.deleteMissao);

// Rotas para a tabela "recompensas"
router.get('/recompensas', authenticateToken, recompensaController.getAllRecompensas);
router.get('/recompensas/:id', authenticateToken, recompensaController.getRecompensaById);
router.post('/recompensas', authenticateToken, recompensaController.createRecompensa);
router.put('/recompensas/:id', authenticateToken, recompensaController.updateRecompensa);
router.delete('/recompensas/:id', authenticateToken, recompensaController.deleteRecompensa);

// Exporta o roteador para ser usado no index.js
module.exports = router;
