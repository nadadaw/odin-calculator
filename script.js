function add(a, b) {
  let result = +a + +b;
  return +result.toFixed(7); // "+" sign drops any extra zeros
}

function subtract(a, b) {
  let result = a - b;
  return +result.toFixed(7);
}

function multiply(a, b) {
  let result = a * b;
  return +result.toFixed(7);
}

function divide(a, b) {
  if (b != 0) {
    let result = a / b;
    return +result.toFixed(7);
  } else return "You can't divide by 0!";
}

function mod(a, b) {
  let result = a % b;
  return +result.toFixed(7);
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return mod(a, b);
  }
}

const numbers = document.getElementsByClassName("number");
const operations = document.getElementsByClassName("operation");
const displayText = document.getElementById("display-text");
const equalsButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const dotButton = document.getElementById("dot");
const deleteButton = document.getElementById("delete");
let enteredOperation = "";
let firstOperand = "";
let secondOperand = "";
let result = "";

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    if (enteredOperation === "") {
      let entered = numbers[i].innerText;
      displayText.append(entered);
      firstOperand += entered;
    } else if (result !== "") {
      displayText.innerText = "";
      secondOperand = "";
      enteredOperation = "";
      result = "";
      let entered = numbers[i].innerText;
      displayText.append(entered);
      firstOperand = entered;
    } else {
      let entered = numbers[i].innerText;
      displayText.append(entered);
      secondOperand += entered;
    }
  });
}

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", function () {
    if (enteredOperation === "" && firstOperand !== "") {
      enteredOperation = operations[i].innerText;
      displayText.append(enteredOperation);
    } else if (result !== "") {
      // use result of previous calculation as the first number in new calculation
      enteredOperation = operations[i].innerText;
      displayText.append(enteredOperation);
      firstOperand = result;
      secondOperand = "";
      result = "";
    }
  });
}

equalsButton.addEventListener("click", function () {
  if (enteredOperation !== "" && firstOperand !== "" && secondOperand !== "") {
    displayText.innerText = "";
    result = operate(enteredOperation, firstOperand, secondOperand);
    displayText.append(result);
  } else {
    displayText.innerText = "";
    firstOperand = "";
    secondOperand = "";
    enteredOperation = "";
    result = "";
  }
});

clearButton.addEventListener("click", function () {
  displayText.innerText = "";
  firstOperand = "";
  secondOperand = "";
  enteredOperation = "";
  result = "";
});

deleteButton.addEventListener("click", function () {
  if (enteredOperation === "") {
    firstOperand = firstOperand.substring(0, firstOperand.length - 1);
    displayText.removeChild(displayText.lastChild);
    return;
  } else if (
    ["+", "-", "×", "÷", "%"].includes(displayText.lastChild.textContent)
  ) {
    enteredOperation = "";
    displayText.removeChild(displayText.lastChild);
    return;
  } else if (result !== "") {
    displayText.innerText = "";
    firstOperand = "";
    secondOperand = "";
    enteredOperation = "";
    result = "";
    return;
  } else if (enteredOperation !== "") {
    secondOperand = secondOperand.substring(0, secondOperand.length - 1);
    displayText.removeChild(displayText.lastChild);
  }
});
