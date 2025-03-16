// backend/index.js

// Importação dos módulos necessários
const express = require('express'); // Framework para criar o servidor
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens (CORS)
const dotenv = require('dotenv'); // Módulo para carregar variáveis de ambiente a partir de um arquivo .env

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o aplicativo Express
const app = express();

// Define a porta do servidor, usando a variável de ambiente PORT ou 5000 como padrão
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite que o servidor interprete corpos de requisição no formato JSON

// Importa a conexão com o banco de dados
const db = require('./config/db');

// Compartilha a conexão com o MySQL para ser usada nas rotas
app.set('db', db);

// Importa as rotas da API
const apiRoutes = require('./routes/apiRoutes');

// Define o prefixo '/api' para todas as rotas da API
app.use('/api', apiRoutes);

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe uma mensagem quando o servidor estiver rodando
});