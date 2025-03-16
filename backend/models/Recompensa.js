// backend/models/Recompensa.js

const db = require('../config/db'); // Importa a conexão com o banco de dados

class Recompensa {
  // Método para buscar todas as recompensas
  static getAll(callback) {
    db.query('SELECT * FROM recompensas', callback);
  }

  // Método para buscar uma recompensa por ID
  static getById(id, callback) {
    db.query('SELECT * FROM recompensas WHERE id = ?', [id], callback);
  }

  // Método para criar uma nova recompensa
  static create(recompensa, callback) {
    const { usuario_id, descricao } = recompensa;
    db.query(
      'INSERT INTO recompensas (usuario_id, descricao) VALUES (?, ?)',
      [usuario_id, descricao],
      callback
    );
  }

  // Método para atualizar uma recompensa existente
  static update(id, recompensa, callback) {
    const { usuario_id, descricao } = recompensa;
    db.query(
      'UPDATE recompensas SET usuario_id = ?, descricao = ? WHERE id = ?',
      [usuario_id, descricao, id],
      callback
    );
  }

  // Método para excluir uma recompensa
  static delete(id, callback) {
    db.query('DELETE FROM recompensas WHERE id = ?', [id], callback);
  }
}

module.exports = Recompensa;