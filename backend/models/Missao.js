const db = require('../config/db');

const Missao = {
  getAll: (callback) => {
    db.query('SELECT * FROM missoes', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM missoes WHERE id = ?', [id], callback);
  },
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM missoes WHERE usuario_id = ?', [userId], callback);
  },
  create: (missao, callback) => {
    console.log('Criando missão:', missao); // Adiciona log para depuração
    db.query('INSERT INTO missoes SET ?', missao, (err, result) => {
      if (err) {
        console.error('Erro ao criar missão:', err); // Adiciona log para depuração
        return callback(err);
      }
      console.log('Missão criada com sucesso:', result); // Adiciona log para depuração
      callback(null, result);
    });
  },
  update: (id, missao, callback) => {
    db.query('UPDATE missoes SET ? WHERE id = ?', [missao, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM missoes WHERE id = ?', [id], callback);
  },
};

module.exports = Missao;