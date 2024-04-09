let num1;
let num2;

function addition(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

function operate(operation, num1, num2) {
  switch (operation) {
    case "addition":
      return addition(num1, num2);
    case "subtraction":
      return subtract(num1, num2);
    case "multiplication":
      return multiply(num1, num2);
    case "division":
      return division(num1, num2);
    default:
      console.log("Invalid Operation..");
      return NaN;
  }
}

const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const button = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperation) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  addDigit(digit) {
    if (digit == "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperation(operation) {
    if (this.currentOperationText.innerText === "" && operation != "C") {
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    console.log(previous);
    const current = +this.currentOperationText.innerText;
    console.log(current);

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1);
  }

  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  processClearOperation(){
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
  }

  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }


  changeOperation(operation) {
    const mathOperation = ["*", "+", "-", "/"];
    if (!mathOperation.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    console.log(operationValue, operation, current, previous);
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      console.log("current and previous occured....");
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText; // capturing buttons in value variable
    console.log(value);
    if (value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
