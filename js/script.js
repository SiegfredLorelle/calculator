const resetAll = () => {
  mainDisplay.value = "0";
  hasDeciPoint = false;
  console.log("resetting");
  // TODO: Fetch current memory
} 

const deleteLastInput = () => {
  mainDisplay.value = mainDisplay.value.slice(0, -1);
}

memoryDisplay = document.querySelector(".memory-display");
mainDisplay = document.querySelector(".main-display");
numBtns = document.querySelectorAll(".num-btn");
allClearBtn = document.querySelector(".ac-btn");
backBtn = document.querySelector(".back-btn");
deciPointBtn = document.querySelector(".deci-point-btn");
operatorBtns = document.querySelectorAll(".operator-btn");
plusBtn = document.querySelector(".plus-btn");
additionOperators = ["+", "−"];
multiplicationOperators = ["×", "÷",];
operators = additionOperators.concat(multiplicationOperators);

resetAll();

numBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
    if (mainDisplay.value == "0") {
      mainDisplay.value = btn.textContent;
    }
    else {
      mainDisplay.value += btn.textContent;
    }
  })
});

operatorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    lastInput = mainDisplay.value.at(-1);
  
    if (!operators.includes(lastInput)) {
      mainDisplay.value += btn.textContent;
      return;
    }

    if (multiplicationOperators.includes(btn.textContent)) {
      deleteLastInput();
      mainDisplay.value += btn.textContent;
    }
    
    else if (btn.textContent == lastInput) {
      deleteLastInput();
      mainDisplay.value += "+";
      // plusBtn.click();
    }
    else if (btn.textContent == "+") {}

    else mainDisplay.value += btn.textContent;
  });
})


deciPointBtn.addEventListener("click", () => {
  if (hasDeciPoint) return;
  mainDisplay.value += ".";
  hasDeciPoint = true;
});

allClearBtn.addEventListener("click", resetAll);

backBtn.addEventListener("click", () => {
  console.log();
  if (mainDisplay.value.at(-1)) {
    hasDeciPoint = false;
  }
  deleteLastInput();
  if (!mainDisplay.value) {
    mainDisplay.value = 0;
  }
});

