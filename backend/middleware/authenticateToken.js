const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token não fornecido.');
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('Token inválido ou expirado:', err);
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    console.log('Token válido. Usuário autenticado:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;