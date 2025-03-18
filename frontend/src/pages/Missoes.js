import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMissoes, createMissao, updateMissao } from '../services/missaoService'; // Certifique-se de que o caminho está correto

const Missoes = () => {
  const { user } = useContext(AuthContext);
  const [missoes, setMissoes] = useState([]);
  const [novaMissao, setNovaMissao] = useState(''); // Estado para armazenar o texto da nova missão
  const [isExclusaoLiberada, setIsExclusaoLiberada] = useState(false); // Estado para controlar se a exclusão de missões está liberada
  const [isAddingMissao, setIsAddingMissao] = useState(false); // Estado para controlar se o formulário de adição de missões está visível
  const [pontosTotais, setPontosTotais] = useState(0); // Estado para armazenar os pontos totais acumulados

  useEffect(() => {
    const fetchMissoes = async () => {
      try {
        const data = await getMissoes();
        setMissoes(data);
        const totalPontos = data.reduce((total, missao) => total + missao.pontos_recompensa, 0);
        setPontosTotais(totalPontos);
      } catch (error) {
        console.error('Erro ao buscar missões:', error);
      }
    };
    fetchMissoes();
  }, []);

  const handleAddMissao = async () => {
    if (novaMissao) { // Verifica se o campo da missão não está vazio
      const novaMissaoObj = {
        descricao: novaMissao, // A descrição da missão
        concluida: false, // Inicializa a missão como não concluída
        pontos_recompensa: 100, // Define os pontos da missão
        data_conclusao: null, // Data da última conclusão da missão começa como null
      };
      try {
        const createdMissao = await createMissao(novaMissaoObj);
        setMissoes([...missoes, createdMissao]); // Adiciona a nova missão à lista de missões
        setNovaMissao(''); // Limpa o campo de entrada da missão
        setIsAddingMissao(false); // Fecha o formulário de adição após salvar a missão
      } catch (error) {
        console.error('Erro ao criar missão:', error);
      }
    }
  };

  const handleConcluirMissao = async (id) => {
    setMissoes(missoes.map(missao => {
      const tempoDesdeConclusao = missao.data_conclusao ? Date.now() - new Date(missao.data_conclusao).getTime() : Infinity;

      if (missao.id === id && (missao.concluida === false || tempoDesdeConclusao > 86400000)) {
        const novaMissao = { ...missao, concluida: true, data_conclusao: new Date().toISOString() }; // Marca a missão como concluída
        setPontosTotais(prevPontos => prevPontos + novaMissao.pontos_recompensa); // Atualiza os pontos totais
        try {
          updateMissao(id, novaMissao);
        } catch (error) {
          console.error('Erro ao atualizar missão:', error);
        }
        return novaMissao; // Retorna a missão atualizada
      } else if (missao.id === id && tempoDesdeConclusao < 86400000) {
        alert('Você deve esperar 24 horas antes de concluir esta missão novamente.'); // Exibe alerta caso a missão não possa ser concluída
      }
      return missao; // Retorna a missão sem alterações caso não possa ser concluída
    }));
  };

  const handleExcluirMissao = (id) => {
    setMissoes(missoes.filter(missao => missao.id !== id)); // Remove a missão da lista filtrando pelo ID
  };

  const toggleExclusao = () => {
    setIsExclusaoLiberada(!isExclusaoLiberada); // Alterna entre liberar ou desabilitar a exclusão
  };

  return (
    <div>
      <h1>Missões</h1>
      <ul>
        {missoes.map((missao) => (
          <li key={missao.id}>
            <div>
              <p>Missão: {missao.descricao} | Pontos: {missao.pontos_recompensa}</p> {/* Exibe a descrição e os pontos da missão */}
              <button
                onClick={() => handleConcluirMissao(missao.id)} // Chama a função para concluir a missão
                disabled={missao.concluida && missao.data_conclusao && Date.now() - new Date(missao.data_conclusao).getTime() < 86400000}
              >
                {missao.concluida ? 'Missão Concluída' : 'Confirmar Conclusão'} {/* Exibe o texto dependendo do estado da missão */}
              </button>
              {isExclusaoLiberada && ( // Se a exclusão estiver liberada, exibe o botão de exclusão
                <button onClick={() => handleExcluirMissao(missao.id)}>Excluir</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h3>Pontos Totais: {pontosTotais}</h3> {/* Exibe os pontos totais acumulados */}
      </div>

      <button onClick={() => window.location.href = "./Inicio"}>Voltar</button> {/* Botão para voltar à página inicial */}

      <button onClick={() => setIsAddingMissao(!isAddingMissao)}>
        {isAddingMissao ? 'Cancelar Adição' : 'Adicionar Missão'} {/* Alterna entre adicionar ou cancelar adição de missão */}
      </button>

      <button onClick={toggleExclusao}>
        {isExclusaoLiberada ? 'Desabilitar Exclusão' : 'Liberar Exclusão'} {/* Alterna entre liberar ou desabilitar exclusão */}
      </button>

      {isAddingMissao && ( // Se o estado 'isAddingMissao' for verdadeiro, exibe o formulário para adicionar nova missão
        <div>
          <input
            type="text" // Tipo do campo de entrada
            value={novaMissao} // O valor do input é controlado pelo estado 'novaMissao'
            onChange={(e) => setNovaMissao(e.target.value)} // Atualiza o estado da missão conforme o usuário digita
            placeholder="Descrição da missão" // Texto de ajuda para o usuário
          />
          <button onClick={handleAddMissao}>Salvar Missão</button> {/* Botão para salvar a nova missão */}
        </div>
      )}
    </div>
  );
};

export default Missoes;