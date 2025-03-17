// Importa a conexão com o banco de dados
 const db = require('../config/db'); 

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

  // Método para autenticar um usuário (login) sem geração de token
  static login(email, senha, callback) {
    // Busca o usuário pelo email
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback(null, { message: 'Usuário não encontrado.' });
      }

      const user = results[0];

      // Compara a senha fornecida com a senha armazenada no banco de dados (sem criptografia)
      if (senha !== user.senha) {
        return callback(null, { message: 'Senha incorreta.' });
      }

      // Retorna os dados do usuário (exceto a senha)
      const userData = { ...user, senha: undefined }; // Remove a senha do objeto
      callback(null, { message: 'Login bem-sucedido!', user: userData });
    });
  }
}

module.exports = Usuario;
