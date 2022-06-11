const etchContainer = document.querySelector(".draw-container");

etchContainer.style.gridTemplateRows = "repeat(20, 1fr)";
etchContainer.style.gridTemplateColumns = "repeat(20, 1fr)";

for (let i = 0; i < 20*20; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add(`box${i}`);
    etchContainer.appendChild(newSquare);
    //newSquare.textContent = newSquare.classList;
    //console.log(newSquare.textContent);
}

function fill(e) {
    if (!mousePressed && e.type === "mouseover") {
        return;
    } else {
        this.style.backgroundColor = "black";
        this.style.border = "1px solid black";
    }
}

let mousePressed = false;
etchContainer.onmousedown = () => mousePressed = true;
etchContainer.onmouseup = () => mousePressed = false;


const boxes = document.querySelectorAll(".draw-container > div");

boxes.forEach(box => {
    
    box.addEventListener("mouseover", fill);
    box.addEventListener("mousedown", fill);
    console.log("HRE");
});

const test = document.querySelector(".box11");
console.log(test.className);

console.log(etchContainer.clientHeight);
