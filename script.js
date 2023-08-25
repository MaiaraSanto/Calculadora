let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let history = [];

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  let expression = display.value;
  let result;

  try {
    result = eval(expression);

    history.unshift({
      expression: expression,
      result: result,
      timestamp: new Date()
    });

    if (history.length > 4) {
      history.pop();
    }

    updateHistory();
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}


function updateHistory() {
  historyList.innerHTML = '';

  for (let entry of history) {
    let row = document.createElement('tr');
    let exprCell = document.createElement('td');
    let resultCell = document.createElement('td'); 
    let timeCell = document.createElement('td');

    let timestamp = new Date(entry.timestamp);
    let dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][timestamp.getDay()];
    let month = ('0' + (timestamp.getMonth() + 1)).slice(-2); 

    exprCell.textContent = entry.expression;
    resultCell.textContent = entry.result; 
    timeCell.textContent = `${dayOfWeek}, ${timestamp.getDate()}/${month}/${timestamp.getFullYear()}, ${timestamp.toLocaleTimeString()}`;

    row.appendChild(exprCell);
    row.appendChild(resultCell); 
    row.appendChild(timeCell);

    row.onclick = () => {
      display.value = entry.expression;
    };
    historyList.appendChild(row);
  }
}
