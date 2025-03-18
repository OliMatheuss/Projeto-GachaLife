const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario'); // Importa a classe Usuario
const authenticateToken = require('./middleware/authenticateToken'); // Middleware de autenticação
const Missao = require('./models/Missao'); // Importa a classe Missao

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rota de Login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Usa o método login da classe Usuario
  Usuario.login(email, senha, (err, result) => {
    if (err) {
      console.error('Erro durante o login:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (result.message === 'Usuário não encontrado.' || result.message === 'Senha incorreta.') {
      return res.status(401).json({ message: result.message });
    }

    // Se o login for bem-sucedido, gera um token de autenticação
    const user = result.user;
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Retorna os dados do usuário e o token de autenticação
    res.status(200).json({ message: 'Login bem-sucedido!', user, token });
  });
});

// Importa as rotas da API
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});