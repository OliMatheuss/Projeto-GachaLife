const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes'); // Importa as rotas da API

dotenv.config();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Importa as rotas da API
app.use('/api', apiRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});