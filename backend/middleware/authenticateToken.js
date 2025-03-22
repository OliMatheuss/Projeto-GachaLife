const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('Cookies recebidos:', req.cookies);

  // Primeiro, tenta pegar o token do cookie
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('Token não fornecido.');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('Token expirado:', err.message);
        return res.status(401).json({ message: 'Token expirado. Faça login novamente.', error: err });
      }

      console.log('Token inválido:', err.message);
      return res.status(403).json({ message: 'Token inválido.', error: err });
    }

    console.log('Token válido. Usuário autenticado:', user);

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
