// script.js

let currentInput = '';
let operator = null;
let previousInput = '';
const historyLog = [];

function appendNumber(number) {
  if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
  currentInput += number;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '') return; // Ignore if no number is entered
  if (previousInput !== '') calculateResult(); // Auto-calculate if there's a pending operation
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function calculateResult() {
  if (operator === null || currentInput === '') return; // Ignore if no operator or second number
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error'; // Handle division by zero
      break;
    case '%':
      result = (prev * current) / 100;
      break;
    case 'sqrt':
      result = Math.sqrt(prev);
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateDisplay();
  addToHistory(`${previousInput} ${operator} ${currentInput} = ${result}`);
}

function clearDisplay() {
  currentInput = '';
  operator = null;
  previousInput = '';
  updateDisplay();
  document.getElementById('history').innerHTML = '';
}

function updateDisplay() {
  document.getElementById('display').value = currentInput || '0';
}

function addToHistory(entry) {
  historyLog.push(entry);
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = historyLog.join('<br>');
}