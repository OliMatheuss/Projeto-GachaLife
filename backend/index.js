// backend/index.js

// Importação dos módulos necessários
const express = require('express'); // Framework para criar o servidor
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens (CORS)
const dotenv = require('dotenv'); // Módulo para carregar variáveis de ambiente a partir de um arquivo .env
const mysql = require('mysql2'); // Módulo para conectar e interagir com o banco de dados MySQL

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o aplicativo Express
const app = express();

// Define a porta do servidor, usando a variável de ambiente PORT ou 5000 como padrão
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite que o servidor interprete corpos de requisição no formato JSON

// Conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Endereço do host do banco de dados
  user: process.env.DB_USER, // Usuário do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  database: process.env.DB_NAME, // Nome do banco de dados
  port: process.env.DB_PORT || 3306, // Porta do MySQL (3306 é o padrão)
});

// Tenta conectar ao banco de dados
db.connect((err) => {
  if (err) {
    // Se houver erro na conexão, exibe o erro no console
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso
    console.log('Conectado ao MySQL');
  }
});

// Compartilha a conexão com o MySQL para ser usada nas rotas
app.set('db', db); // Adicione esta linha para compartilhar a conexão

// Importa as rotas da API
const apiRoutes = require('./routes/apiRoutes');

// Define o prefixo '/api' para todas as rotas da API
app.use('/api', apiRoutes);

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe uma mensagem quando o servidor estiver rodando
});