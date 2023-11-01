memoryDisplay = document.querySelector(".memory-display > span");
mainDisplay = document.querySelector(".main-display > span");
numBtns = document.querySelectorAll(".num-btn");

console.log(numBtns);
console.log(memoryDisplay);
console.log(mainDisplay);
memoryDisplay.text = "";
mainDisplay.text = "";

numBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log(btn.textContent);
    mainDisplay.textContent += btn.textContent;
  })
});