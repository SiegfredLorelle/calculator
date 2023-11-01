const resetAll = () => {
  mainDisplay.textContent = "0";
  hasDeciPoint = false;
  console.log("resetting");
  // TODO: Fetch current memory
} 

const deleteLastInput = () => {
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
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
      // plusBtn.click();
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


mainDisplay.addEventListener("change", (e) => {
  console.log("CHNAGED", e.target.value);
});



prevInputLength = 1;
// Create a new instance of MutationObserver and pass a callback function
const observer = new MutationObserver((mutationsList, observer) => {
  // Handle the changes here
  console.log('InnerHTML changed:', mainDisplay.innerHTML);
  if (prevInputLength > mainDisplay.textContent.length) {
    console.log("Deleted");
  }
  else {
    console.log("Added");
  }
  prevInputLength = mainDisplay.textContent.length;
});

// Define what to observe (in this case, changes to the subtree and the innerHTML property)
const config = { subtree: true, childList: true, characterData: true };

// Start observing the target element with the specified configuration
observer.observe(mainDisplay, config);

// Later, you can disconnect the observer when you no longer need it
// observer.disconnect();
