// src/pages/Missoes.js
import React, { useEffect, useState } from 'react';
import { getMissoes } from '../services/missaoService';

const Missoes = () => {
  const [missoes, setMissoes] = useState([]);

  useEffect(() => {
    const fetchMissoes = async () => {
      try {
        const data = await getMissoes();
        setMissoes(data);
      } catch (error) {
        console.error('Erro ao buscar missões:', error);
      }
    };
    fetchMissoes();
  }, []);


  /*function Missoes() {
    const [missoes, setMissoes] = useState([]); // Estado para armazenar as missões
    const [novaMissao, setNovaMissao] = useState(''); // Estado para armazenar o texto da nova missão
    const [isExclusaoLiberada, setIsExclusaoLiberada] = useState(false); // Estado para controlar se a exclusão de missões está liberada
    const [isAddingMissao, setIsAddingMissao] = useState(false); // Estado para controlar se o formulário de adição de missões está visível
    const [pontosTotais, setPontosTotais] = useState(0); // Estado para armazenar os pontos totais acumulados

    const handleAddMissao = () => {
        if (novaMissao) { // Verifica se o campo da missão não está vazio
            const novaMissaoObj = {
                id: Date.now(), // Atribui um ID único para a missão com base no tempo atual
                descricao: novaMissao, // A descrição da missão
                concluida: false, // Inicializa a missão como não concluída
                pontos: 100, // Define os pontos da missão
                ultimaConclusao: null, // Data da última conclusão da missão começa como null
            };
            setMissoes([...missoes, novaMissaoObj]); // Adiciona a nova missão à lista de missões
            setNovaMissao(''); // Limpa o campo de entrada da missão
            setIsAddingMissao(false); // Fecha o formulário de adição após salvar a missão
        }
    };

    const handleConcluirMissao = (id) => {
        setMissoes(missoes.map(missao => {
            const tempoDesdeConclusao = missao.ultimaConclusao ? Date.now() - missao.ultimaConclusao : Infinity;

            if (missao.id === id && (missao.concluida === false || tempoDesdeConclusao > 86400000)) {
                const novaMissao = { ...missao, concluida: true, ultimaConclusao: Date.now() }; // Marca a missão como concluída
                setPontosTotais(prevPontos => prevPontos + novaMissao.pontos); // Atualiza os pontos totais
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
    }; */


  return (
    <div>
      <h1>Missões</h1>
      <ul>
        {missoes.map((missao) => (
          <li key={missao.id}>{missao.nome}</li>
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

      <ul>
        {missoes.map((missao) => ( // Mapeia e exibe todas as missões
          <li key={missao.id}>
            <div>
              <p>Missão: {missao.descricao} | Pontos: {missao.pontos}</p> {/* Exibe a descrição e os pontos da missão */}
              <button
                onClick={() => handleConcluirMissao(missao.id)} // Chama a função para concluir a missão
                disabled={missao.concluida && missao.ultimaConclusao && Date.now() - missao.ultimaConclusao < 86400000}
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

    </div>
  );
};

export default Missoes;