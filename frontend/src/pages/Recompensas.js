// src/pages/Recompensas.js
import React, { useEffect, useState } from 'react';
import { getRecompensas } from '../services/recompensaService';

const Recompensas = () => {
  const [recompensas, setRecompensas] = useState([]);

  useEffect(() => {
    const fetchRecompensas = async () => {
      try {
        const data = await getRecompensas();
        setRecompensas(data);
      } catch (error) {
        console.error('Erro ao buscar recompensas:', error);
      }
    };
    fetchRecompensas();
  }, []);

/*
  function Recompensa() {
    // Declara os estados do componente usando o useState
    const [pontosTotais, setPontosTotais] = useState(1000);  // Guarda a quantidade de pontos do usuário, começa com 1000.
    const [recompensas, setRecompensas] = useState([]);  // Lista de recompensas que o usuário possui.
    const [novaRecompensa, setNovaRecompensa] = useState('');  // Descrição da nova recompensa que o usuário quer adicionar.
    const [isExclusaoLiberada, setIsExclusaoLiberada] = useState(false);  // Controle para saber se a exclusão de recompensas está permitida.
    const [isAddingRecompensa, setIsAddingRecompensa] = useState(false);  // Controle para saber se o usuário está no modo de adicionar recompensa.

    const handleAddRecompensa = () => {
      if (novaRecompensa.trim()) {  // Verifica se a descrição da recompensa não está vazia.
        // Adiciona a nova recompensa à lista de recompensas, criando um novo objeto com um id único.
        setRecompensas(prev => [...prev, { id: Date.now(), descricao: novaRecompensa }]);
        setNovaRecompensa('');  // Limpa o campo de descrição.
        setIsAddingRecompensa(false);  // Desativa o modo de adição de recompensa.
      } else {
        alert("Descrição não pode estar vazia!");  // Alerta caso a descrição da recompensa esteja vazia.
      }
    };

    const handleBaú = () => {
      if (pontosTotais >= 500 && recompensas.length > 0) {  // Verifica se o usuário tem pontos suficientes e se existem recompensas.
        setPontosTotais(prev => prev - 500);  // Deduz 500 pontos do total de pontos do usuário.
        // Exibe uma recompensa aleatória da lista de recompensas.
        alert(`Você ganhou: ${recompensas[Math.floor(Math.random() * recompensas.length)].descricao}`);
      } else {
        // Exibe alerta caso o usuário não tenha pontos suficientes ou não haja recompensas.
        alert(pontosTotais < 500 ? 'Pontos insuficientes!' : 'Sem recompensas!');
      }
    };

    const handleExcluirRecompensa = (id) => {
      // Remove a recompensa com o ID especificado da lista de recompensas.
      setRecompensas(prev => prev.filter(recompensa => recompensa.id !== id));
    };

    const toggleExclusao = () => setIsExclusaoLiberada(prev => !prev);  // Alterna o estado da exclusão de recompensas.


*/
    return (
      <div>
        <h1>Recompensas</h1>
        <ul>
          {recompensas.map((recompensa) => (
            <li key={recompensa.id}>{recompensa.nome}</li>
          ))}
        </ul>


        <h3>Pontos: {pontosTotais}</h3>  {/* Exibe os pontos totais do usuário.*/}
        <button onClick={() => window.location.href = "./Inicio"}>Voltar</button>  {/* Botão para redirecionar o usuário para a página inicial.*/}
        <button onClick={toggleExclusao}>{isExclusaoLiberada ? 'Desabilitar Exclusão' : 'Liberar Exclusão'}</button>  {/* Alterna entre habilitar ou desabilitar a exclusão de recompensas.*/}
        <button onClick={() => setIsAddingRecompensa(!isAddingRecompensa)}>{isAddingRecompensa ? 'Cancelar' : 'Adicionar Recompensa'}</button>  {/* Alterna entre adicionar ou cancelar a adição de uma recompensa.*/}

        {isAddingRecompensa && (
          <div>
            <input value={novaRecompensa} onChange={e => setNovaRecompensa(e.target.value)} placeholder="Descrição" />  {/* Campo para o usuário digitar a descrição da nova recompensa.*/}
            <button onClick={handleAddRecompensa}>Salvar</button>  {/* Botão para salvar a nova recompensa.*/}
          </div>
        )}

        {pontosTotais >= 500 && recompensas.length > 0 && <button onClick={handleBaú}>Abrir Baú (500 pontos)</button>}  {/* Exibe o botão para abrir o baú se o usuário tiver pontos suficientes e recompensas disponíveis.*/}

        <div>
          {recompensas.length > 0 ? (
            recompensas.map(recompensa => (
              <div key={recompensa.id}>
                <p>{recompensa.descricao}</p>  {/* Exibe a descrição de cada recompensa.*/}
                {isExclusaoLiberada && <button onClick={() => handleExcluirRecompensa(recompensa.id)}>Excluir</button>}   {/*Exibe o botão de exclusão se a exclusão estiver liberada.*/}
              </div>
            ))
          ) : (
            <p>Sem recompensas.</p>  // Exibe mensagem caso não haja recompensas.
          )}
        </div>

      </div>
    );
  };

  export default Recompensas;