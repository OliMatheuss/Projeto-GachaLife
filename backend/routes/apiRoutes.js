// backend/routes/apiRoutes.js

// Importação dos módulos necessários
const express = require('express'); // Framework para criar o servidor
const router = express.Router(); // Cria um roteador para definir as rotas

// Rota raiz para verificar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API está funcionando!'); // Responde com uma mensagem simples
});

// Rota para testar a conexão com o banco de dados
router.get('/test-db', (req, res) => {
  // Acessa a conexão com o banco de dados diretamente do app (index.js)
  const db = req.app.get('db'); // Obtém a conexão com o MySQL

  // Executa uma query simples (ex: selecionar a versão do MySQL)
  db.query('SELECT VERSION() AS mysql_version', (err, results) => {
    if (err) {
      // Se houver erro, retorna uma mensagem de erro
      return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
    // Se a query for bem-sucedida, retorna a versão do MySQL
    res.json({ message: 'Conexão com o banco de dados bem-sucedida!', version: results[0].mysql_version });
  });
});

// Aqui você pode adicionar mais rotas relacionadas às tabelas do banco de dados
// Exemplo:
// router.get('/usuarios', usuarioController.getAllUsuarios);
// router.post('/usuarios', usuarioController.createUsuario);

// Exporta o roteador para ser usado no index.js
module.exports = router;