const resetAll = () => {
  mainDisplay.textContent = "0";
  hasDeciPoint = false;
  console.log("resetting");
  // TODO: Fetch current memory
} 

const deleteLastInput = () => {
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
}

memoryDisplay = document.querySelector(".memory-display > span");
mainDisplay = document.querySelector(".main-display > span");
numBtns = document.querySelectorAll(".num-btn");
allClearBtn = document.querySelector(".ac-btn");
backBtn = document.querySelector(".back-btn");
deciPointBtn = document.querySelector(".deci-point-btn");
operatorBtns = document.querySelectorAll(".operator-btn");

additionOperators = ["+", "−"];
multiplicationOperators = ["×", "÷",];
operators = additionOperators.concat(multiplicationOperators);

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
  
    if (!operators.includes(lastInput)) {
      mainDisplay.textContent += btn.textContent;
      return;
    }

    if (multiplicationOperators.includes(btn.textContent)) {
      deleteLastInput();
      mainDisplay.textContent += btn.textContent;
    }
    
    else if (btn.textContent == lastInput) {
      deleteLastInput();
      mainDisplay.textContent += "+";
    }
    else if (btn.textContent == "+") {}

    else mainDisplay.textContent += btn.textContent;
  });
})


deciPointBtn.addEventListener("click", () => {
  if (hasDeciPoint) return;
  mainDisplay.textContent += ".";
  hasDeciPoint = true;
});

allClearBtn.addEventListener("click", resetAll);

backBtn.addEventListener("click", () => {
  console.log();
  if (mainDisplay.textContent.at(-1)) {
    hasDeciPoint = false;
  }
  deleteLastInput();
  if (!mainDisplay.textContent) {
    mainDisplay.textContent = 0;
  }
});

