// backend/models/Missao.js

const db = require('../config/db'); // Importa a conexão com o banco de dados

class Missao {
  // Método para buscar todas as missões
  static getAll(callback) {
    db.query('SELECT * FROM missoes', callback);
  }

  // Método para buscar uma missão por ID
  static getById(id, callback) {
    db.query('SELECT * FROM missoes WHERE id = ?', [id], callback);
  }

  // Método para criar uma nova missão
  static create(missao, callback) {
    const { usuario_id, descricao, pontos_recompensa, data_conclusao } = missao;
    db.query(
      'INSERT INTO missoes (usuario_id, descricao, pontos_recompensa, data_conclusao) VALUES (?, ?, ?, ?)',
      [usuario_id, descricao, pontos_recompensa, data_conclusao],
      callback
    );
  }

  // Método para atualizar uma missão existente
  static update(id, missao, callback) {
    const { usuario_id, descricao, pontos_recompensa, data_conclusao } = missao;
    db.query(
      'UPDATE missoes SET usuario_id = ?, descricao = ?, pontos_recompensa = ?, data_conclusao = ? WHERE id = ?',
      [usuario_id, descricao, pontos_recompensa, data_conclusao, id],
      callback
    );
  }

  // Método para excluir uma missão
  static delete(id, callback) {
    db.query('DELETE FROM missoes WHERE id = ?', [id], callback);
  }
}

module.exports = Missao;