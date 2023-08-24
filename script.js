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
    let div = document.createElement('div');
    let timestamp = new Date(entry.timestamp);
    let dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][timestamp.getDay()];
    let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'][timestamp.getMonth()];

    div.textContent = `[${entry.expression} = ${entry.result}] [${dayOfWeek}, ${timestamp.getDate()} / ${month} / ${timestamp.getFullYear()}, ${timestamp.toLocaleTimeString()}]` ;
    div.onclick = () => {
      display.value = entry.expression;
    };
    historyList.appendChild(div);
  }
}


