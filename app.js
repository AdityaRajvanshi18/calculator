const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll("[data-number]");
const opButtons = document.querySelectorAll("[data-op]");
const clearButton = document.querySelector("[name=clear]");
const equalsButton = document.querySelector("[name=equals]");
const signButton = document.querySelector("[name=sign]");
const percentButton = document.querySelector("[name=percent]");
const pointButton = document.querySelector("[name=decimal]");

let firstNum = "";
let secondNum = "";
let currOperation = null;
let isResetScreen = false;

numberButtons.forEach((button) =>
  button.addEventListener("click", () => concatNumber(button.textContent))
);

opButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

clearButton.addEventListener("click", clearDisplay);
equalsButton.addEventListener("click", evaluate);
signButton.addEventListener("click", changeSign);
percentButton.addEventListener("click", makePercent);
pointButton.addEventListener("click", concatPoint);


function setOperation(operator){
    if(currOperation !== null){
        evaluate();
    }
    firstNum = display.textContent;
    currOperation = operator;
    isResetScreen = true;
}

function evaluate(){
    if (currOperation === null || isResetScreen){
        return;
    }
    if (currOperation === "/" && display.textContent === "0"){
        alert("What do you think you're trying to do?");
        clearDisplay();
        return;
    }
    secondNum = display.textContent;
    display.textContent = operate(currOperation, firstNum, secondNum);
    currOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

function concatNumber(number){
    if(display.textContent === "0" || isResetScreen){
        emptyDisplay();
    }

    //VERY TEMP SOLUTION FOR NO OVERFLOW
    if(display.textContent.length > 6){
        return;
    }
    display.textContent += number;
}

function concatPoint() {
    if (isResetScreen) emptyDisplay();
    if (display.textContent === "") display.textContent = "0";
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
  }

function changeSign(){
    display.textContent *= -1
}

function makePercent(){
    display.textContent /= 100;
}

function emptyDisplay(){
    display.textContent = "";
    isResetScreen = false;
}

function clearDisplay(){
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(op, a, b){
    a = Number(a);
    b = Number(b);
    switch (op){
        case "+":
            return add(a,b);
            
        case "-":
            return subtract(a,b);
        
        case "x":
            return multiply(a,b);
            
        case "/":
            return divide(a,b);
    }
}
