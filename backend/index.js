const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes'); // Importa as rotas da API
const cookieParser = require('cookie-parser');
dotenv.config();

require('dotenv').config();




app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas o frontend
  credentials: true, // Permite o envio de cookies
}));


// Importa as rotas da API
app.use('/api', apiRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro no servidor.' });
});
console.log('Ambiente:', process.env.NODE_ENV); // Deve exibir "development"