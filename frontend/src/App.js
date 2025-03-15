// Importa as bibliotecas necessárias
import React, { useEffect, useState } from 'react'; // React e hooks (useEffect, useState)
import axios from 'axios'; // Biblioteca para fazer requisições HTTP

// Define o componente principal da aplicação
function App() {
  // Cria um estado chamado 'message' com um valor inicial vazio
  const [message, setMessage] = useState('');

  // Usa o hook useEffect para executar código quando o componente é montado
  useEffect(() => {
    // Faz uma requisição GET para o backend (rota '/')
    axios.get('/')
      .then(response => {
        // Se a requisição for bem-sucedida, atualiza o estado 'message' com os dados da resposta
        setMessage(response.data);
      })
      .catch(error => {
        // Se ocorrer um erro, exibe uma mensagem de erro no console
        console.error('Erro ao conectar ao backend:', error);
      });
  }, []); // O array vazio [] significa que o useEffect só será executado uma vez, quando o componente for montado

  // Retorna o JSX que será renderizado na tela
  return (
    <div className="App">
      <h1>Frontend React</h1> {/* Título da aplicação */}
      <p>Mensagem do Backend: {message}</p> {/* Exibe a mensagem recebida do backend */}
    </div>
  );
}

// Exporta o componente App para ser usado em outros arquivos
export default App;
