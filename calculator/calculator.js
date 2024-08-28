let lastInputWasOperator = false;

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
        lastInputWasOperator = false;
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === '.') {
        appendToDisplay('.');
        lastInputWasOperator = false;
    }
});

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function handleOperator(operator) {
    const display = document.getElementById('display');
    if (lastInputWasOperator) {
        // Replace the last operator
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
        lastInputWasOperator = true;
    }
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
        lastInputWasOperator = false;
    } catch (e) {
        display.value = "Error";
    }
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
    lastInputWasOperator = false;
}

// Update the onclick handlers for operator buttons in your HTML
// For example:
// <button onclick="handleOperator('+')">+</button>
// <button onclick="handleOperator('-')">-</button>
// <button onclick="handleOperator('*')">*</button>
// <button onclick="handleOperator('/')">/</button>