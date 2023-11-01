const resetAll = () => {
  mainDisplay.textContent = "0";
  hasDeciPoint = false;
  console.log("resetting");
  // TODO: Fetch current memory
} 


memoryDisplay = document.querySelector(".memory-display > span");
mainDisplay = document.querySelector(".main-display > span");
numBtns = document.querySelectorAll(".num-btn");
allClearBtn = document.querySelector(".ac-btn");
backBtn = document.querySelector(".back-btn");
deciPointBtn = document.querySelector(".deci-point-btn");

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
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  if (!mainDisplay.textContent) {
    mainDisplay.textContent = 0;
  }
});

