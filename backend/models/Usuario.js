// backend/models/Usuario.js

const db = require('../config/db'); // Importa a conexão com o banco de dados

class Usuario {
  // Método para buscar todos os usuários
  static getAll(callback) {
    db.query('SELECT * FROM usuarios', callback);
  }

  // Método para buscar um usuário por ID
  static getById(id, callback) {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
  }

  // Método para criar um novo usuário
  static create(usuario, callback) {
    const { email, username, senha, pontos, status } = usuario;
    db.query(
      'INSERT INTO usuarios (email, username, senha, pontos, status) VALUES (?, ?, ?, ?, ?)',
      [email, username, senha, pontos, status],
      callback
    );
  }

  // Método para atualizar um usuário existente
  static update(id, usuario, callback) {
    const { email, username, senha, pontos, status } = usuario;
    db.query(
      'UPDATE usuarios SET email = ?, username = ?, senha = ?, pontos = ?, status = ? WHERE id = ?',
      [email, username, senha, pontos, status, id],
      callback
    );
  }

  // Método para excluir um usuário
  static delete(id, callback) {
    db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
  }
}

module.exports = Usuario;