// Obtém referências a elementos HTML por seus IDs e declara uma variável de histórico vazia
let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let clearHistoryButton = document.getElementById('clear-history-button');
let saveHistoryButton = document.getElementById('save-history-button');

let history = [];

// Função para adicionar um valor ao visor da calculadora
function appendToDisplay(value) {
  display.value += value;
}

// Função para limpar o visor da calculadora
function clearDisplay() {
  display.value = '';
}

// Função para calcular a expressão no visor
function calculate() {
  // Obtém a expressão do visor e declara variáveis para o resultado e o histórico
  let expression = display.value;
  let result;

  try {
    // Avalia a expressão usando a função eval
    result = eval(expression);

    // Adiciona a operação e o resultado ao histórico com um timestamp
    history.unshift({
      expression: expression,
      result: result,
      timestamp: new Date()
    });

    // Limita o histórico a 5 entradas, removendo a mais antiga, se necessário
    if (history.length > 4) {
      history.pop();
    }

    // Atualiza o histórico na página, define o resultado no visor e exibe ou oculta o botão de limpar histórico
    updateHistory();
    display.value = result;

    if (history.length > 0) {
      clearHistoryButton.style.display = 'block';
    } else {
      clearHistoryButton.style.display = 'button';
    }

  } catch (error) {
    // Em caso de erro na expressão, exibe "Error" no visor
    display.value = 'Error';
  }
}

// Função para limpar o histórico
function clearHistory() {
  history = [];
  updateHistory();
}

// Função para atualizar a exibição do histórico na página
function updateHistory() {
  historyList.innerHTML = '';

  for (let entry of history) {
    // Cria elementos HTML para cada entrada no histórico
    let row = document.createElement('tr');
    let exprCell = document.createElement('td');
    let resultCell = document.createElement('td');
    let timeCell = document.createElement('td');

    // Obtém informações de data e hora da entrada no histórico
    let timestamp = new Date(entry.timestamp);
    let dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][timestamp.getDay()];
    let month = ('0' + (timestamp.getMonth() + 1)).slice(-2);

    // Define o conteúdo dos elementos criados
    exprCell.textContent = entry.expression;
    resultCell.textContent = entry.result;
    timeCell.textContent = `${dayOfWeek}, ${timestamp.getDate()}/${month}/${timestamp.getFullYear()}, ${timestamp.toLocaleTimeString()}`;

    // Adiciona os elementos à linha do histórico e define um evento de clique para restaurar a expressão no visor
    row.appendChild(exprCell);
    row.appendChild(resultCell);
    row.appendChild(timeCell);

    row.onclick = () => {
      display.value = entry.expression;
    };
    historyList.appendChild(row);
  }
}

// Função para salvar o histórico em um arquivo de texto
function saveHistoryToFile() {
  let historyText = '';

  for (let entry of history) {
    let timestamp = new Date(entry.timestamp);
    let dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][timestamp.getDay()];
    let month = ('0' + (timestamp.getMonth() + 1)).slice(-2);

    // Formata o texto do histórico
    historyText += `Operação: ${entry.expression}\n`;
    historyText += `Resultado: ${entry.result}\n`;
    historyText += `Data: ${dayOfWeek}, ${timestamp.getDate()}/${month}/${timestamp.getFullYear()}, ${timestamp.toLocaleTimeString()}\n\n`;
  }

  // Cria um Blob (objeto binário) com o texto do histórico e cria um link para fazer o download
  let blob = new Blob([historyText], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);

  let a = document.createElement('a');
  a.href = url;
  a.download = 'history.txt';
  a.click();

  // Libera a URL do objeto após o download
  URL.revokeObjectURL(url);
}

// Função para apagar o último caractere do visor
function backspace() {
  display.value = display.value.slice(0, -1);
}
