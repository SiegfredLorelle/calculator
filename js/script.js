const resetAll = () => {
  mainDisplay.textContent = "0";
  answerDisplay.textContent = "=";
  hasDeciPoint = false;
  console.log("resetting");
  // TODO: Fetch current memory
} 

const deleteLastInput = () => {
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
}

const solveAnswer = () => {
  let expression = "";
  for (const char of mainDisplay.textContent) {
    if (char === "−") expression += "-";
    else if (char === "×") expression += "*";
    else if (char === "÷") expression += "/";
    else expression += char;
  }
  ans = parseFloat(eval(expression).toPrecision(12));
  answerDisplay.textContent = `=${ans}`;
  return ans;
}

const answerDisplay = document.querySelector(".answer-display");
const mainDisplay = document.querySelector(".main-display");
const numBtns = document.querySelectorAll(".num-btn");
const allClearBtn = document.querySelector(".ac-btn");
const backBtn = document.querySelector(".back-btn");
const deciPointBtn = document.querySelector(".deci-point-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const plusBtn = document.querySelector(".plus-btn");
const percBtn = document.querySelector(".perc-btn");
const sqrRootBtn = document.querySelector(".sqr-root-btn");
const sqrBtn = document.querySelector(".sqr-btn");
const reciprocalBtn = document.querySelector(".reciprocal-btn");
const changeSignBtn = document.querySelector(".change-sign-btn");
const binaryBtn = document.querySelector(".binary-btn");
const solveBtn = document.querySelector(".solve-btn");


const additionOperators = ["+", "−"];
const multiplicationOperators = ["×", "÷",];
const operators = additionOperators.concat(multiplicationOperators);

resetAll();

numBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
    if (mainDisplay.textContent == "0") {
      mainDisplay.textContent = btn.textContent;
    }
    else {
      mainDisplay.textContent += btn.textContent;
    }
  })
});

operatorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lastInput = mainDisplay.textContent.at(-1);
    mainDisplay.textContent += btn.textContent;
  });
})

solveBtn.addEventListener("click", () => {
  // console.log("Solving");
  
  ans = solveAnswer();
  mainDisplay.textContent = ans;
});

binaryBtn.addEventListener("click", () => { 
  // TODO: solve first before converting to binary
  mainDisplay.textContent = parseFloat(mainDisplay.textContent).toString(2);
});


changeSignBtn.addEventListener("click", () => {
  const prevInput = mainDisplay.textContent.at(-1);
  if (operators.includes(prevInput)) return;

  const lastTerm = findLastTerm(mainDisplay.textContent);
  // console.log(parseFloat(lastTerm));
  if (parseFloat(lastTerm) === 0) return;

  
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -lastTerm.length);
  
  if (mainDisplay.textContent[0] === "−") {
    mainDisplay.textContent = lastTerm;
    return;
  }
  // const sqredTerm = parseFloat(Math.pow(lastTerm, 2).toPrecision(12));
  // mainDisplay.textContent += `${sqredTerm}`;
  addTextInDisplay(`−`); 
  simplifyOperators();
  mainDisplay.textContent += lastTerm;
  // addTextInDisplay("-"); 

});

sqrBtn.addEventListener("click", () => {
  const prevInput = mainDisplay.textContent.at(-1);
  if (operators.includes(prevInput)) return;

  lastTerm = findLastTerm(mainDisplay.textContent);
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -lastTerm.length);

  const sqredTerm = parseFloat(Math.pow(lastTerm, 2).toPrecision(12));
  mainDisplay.textContent += `${sqredTerm}`;
  
});

sqrRootBtn.addEventListener("click", () => {
  console.log("squarerooting!");
  const prevInput = mainDisplay.textContent.at(-1);
  if (operators.includes(prevInput)) return;

  lastTerm = findLastTerm(mainDisplay.textContent);
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -lastTerm.length);

  const sqrRootedTerm = parseFloat(Math.sqrt(lastTerm).toPrecision(12));
  mainDisplay.textContent += `${sqrRootedTerm}`;
});


reciprocalBtn.addEventListener("click", () => {
  const prevInput = mainDisplay.textContent.at(-1);
  if (operators.includes(prevInput)) return;

  lastTerm = findLastTerm(mainDisplay.textContent);

  mainDisplay.textContent = mainDisplay.textContent.slice(0, -lastTerm.length);

  const reciprocaledTerm = parseFloat((1/lastTerm).toPrecision(12));
  mainDisplay.textContent += `${reciprocaledTerm}`;
});


deciPointBtn.addEventListener("click", () => {
  // Ensures that there is only one decimal point per term
  if (hasDeciPoint) return;
  mainDisplay.textContent += ".";
  hasDeciPoint = true;
});

percBtn.addEventListener("click", () => {
  const prevInput = mainDisplay.textContent.at(-1);
  if (operators.includes(prevInput)) return;
  // mainDisplay.textContent
  lastTerm = findLastTerm(mainDisplay.textContent);
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -lastTerm.length);
  // 
  percentedTerm = `${parseFloat(preciseMultiplication(lastTerm, 0.01).toPrecision(12))}`;
  mainDisplay.textContent += percentedTerm;
  // console.log(lastTerm, percentedTerm);
  // const reversedInput = reverseString(mainDisplay.textContent);
  
});

allClearBtn.addEventListener("click", resetAll);
backBtn.addEventListener("click", deleteLastInput);


const findLastTerm = (input) => {
  let lastTerm = "";
  for (let i = input.length - 1; i >= 0; i--) {
    if (operators.includes(input[i])) return lastTerm;
    lastTerm = input[i] + lastTerm;
  }
  return lastTerm;
}

const preciseMultiplication = (num1, num2) => {
  const multiplier = 10**12;
  const result = (num1 * multiplier) * (num2 * multiplier);
  return result / (multiplier**2);
}


let prevInputLength = 1;
// Create a new instance of MutationObserver and pass a callback function
const observer = new MutationObserver(() => {
  let currentDisplayLength = mainDisplay.textContent.length;
  let currentInput = mainDisplay.textContent.at(-1);

  // An input has been deleted
  if (prevInputLength > currentDisplayLength) {
    console.log("Deleted");
    // Ensures that there is always a 0 in display
    if (!mainDisplay.textContent) mainDisplay.textContent = 0;
    // Ensures that has decimal point state is correct
    if (currentInput == ".") hasDeciPoint = false;
  }

  // An input has been added
  else {
    console.log("Added");
    // Detect added operators
    if (operators.includes(currentInput)) {
      // Allow decimal point since this is a new term
      hasDeciPoint = false;
      // Try to simplify operators to prevent syntax error
      simplifyOperators();
    }

    solveAnswer();
  }
  // Update prev input length
  prevInputLength = currentDisplayLength;
});

// Define what to observe (in this case, changes to the subtree and the innerHTML property)
const config = { subtree: true, childList: true, characterData: true };
// Start observing the target element with the specified configuration
observer.observe(mainDisplay, config);
// Later, you can disconnect the observer when you no longer need it
// observer.disconnect();


const addTextInDisplay = (textToAdd) => {
  mainDisplay.textContent += textToAdd;
}

const simplifyOperators = (indexOfCurrentOperator = -1) => {
  if (mainDisplay.textContent.length <= 1) return;
  const currentInput = mainDisplay.textContent.at(indexOfCurrentOperator);
  const prevInput = mainDisplay.textContent.at(indexOfCurrentOperator - 1);
  // console.log(prevInput, currentInput);

  if (!operators.includes(prevInput)) return;
  

  if (multiplicationOperators.includes(currentInput)) {
    deleteLastInput();
    deleteLastInput();
    addTextInDisplay(currentInput);
    simplifyOperators();
  }
  
  else if (prevInput == currentInput) {
    console.log("TO BA?");
    deleteLastInput();
    deleteLastInput();
    addTextInDisplay("+");
    simplifyOperators();
  }
  else if (currentInput == "+") {
    deleteLastInput();
  }
}