// backend/config/db.js

const mysql = require('mysql2'); // Importa o módulo mysql2
const dotenv = require('dotenv'); // Importa o módulo dotenv para carregar variáveis de ambiente

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a conexão com o banco de dados
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
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Exporta a conexão com o banco de dados
module.exports = db;