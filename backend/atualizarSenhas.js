const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); // Use a versão Promise do mysql2

// Configuração do banco de dados
const db = mysql.createPool({
  host: 'localhost', // Substitua pelo host do seu banco de dados
  user: 'root', // Substitua pelo usuário do seu banco de dados
  password: '', // Substitua pela senha do seu banco de dados
  database: 'dbgachalife', // Substitua pelo nome do seu banco de dados
});

const atualizarSenhas = async () => {
  try {
    // Busca todos os usuários no banco de dados
    const [usuarios] = await db.query('SELECT id, senha FROM usuarios');

    for (const usuario of usuarios) {
      const { id, senha } = usuario;

      // Verifica se a senha já está hasheada (os hashes do bcrypt começam com "$2b$")
      if (!senha.startsWith('$2b$')) {
        console.log(`Atualizando senha do usuário com ID ${id}...`);

        // Gera o hash da senha
        const hashedPassword = bcrypt.hashSync(senha, 10);

        // Atualiza a senha no banco de dados
        await db.query('UPDATE usuarios SET senha = ? WHERE id = ?', [hashedPassword, id]);
        console.log(`Senha do usuário com ID ${id} atualizada com sucesso.`);
      }
    }

    console.log('Todas as senhas foram verificadas e atualizadas.');
  } catch (err) {
    console.error('Erro ao atualizar senhas:', err);
  } finally {
    process.exit(); // Encerra o script
  }
};

atualizarSenhas();