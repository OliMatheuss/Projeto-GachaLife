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

  // Método para resgatar uma recompensa, deduzindo pontos do usuário
  static resgatar(id, usuario_id, callback) {
    // 1. Buscar a recompensa pelo ID
    db.query('SELECT * FROM recompensas WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err);

      const recompensa = result[0];
      if (!recompensa) {
        return callback(new Error('Recompensa não encontrada.'));
      }

      // 2. Verificar se o usuário tem pontos suficientes
      db.query('SELECT pontos FROM usuarios WHERE id = ?', [usuario_id], (err, result) => {
        if (err) return callback(err);

        const usuario = result[0];
        if (!usuario) {
          return callback(new Error('Usuário não encontrado.'));
        }

        if (usuario.pontos >= 500) {
          // 3. Deduzir os pontos do usuário
          const novosPontos = usuario.pontos - 500;

          db.query(
            'UPDATE usuarios SET pontos = ? WHERE id = ?',
            [novosPontos, usuario_id],
            (err) => {
              if (err) return callback(err);

              // 4. Retornar a recompensa resgatada
              callback(null, recompensa);
            }
          );
        } else {
          return callback(new Error('Pontos insuficientes.'));
        }
      });
    });
  }
}

module.exports = Recompensa;
