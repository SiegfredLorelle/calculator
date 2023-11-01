memoryDisplay = document.querySelector(".memory-display > span");
mainDisplay = document.querySelector(".main-display > span");
numBtns = document.querySelectorAll(".num-btn");
allClearBtn = document.querySelector(".ac-btn");
backBtn = document.querySelector(".back-btn");

// console.log(numBtns);
// console.log(memoryDisplay);
// console.log(mainDisplay);

memoryDisplay.text = "0";
mainDisplay.text = "0";

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

allClearBtn.addEventListener("click", () => {
  mainDisplay.textContent = "0";
});

backBtn.addEventListener("click", () => {
  mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  if (!mainDisplay.textContent) {
    mainDisplay.textContent = 0;
  }
});

