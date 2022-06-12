const etchContainer = document.querySelector(".draw-container");

const changeColor = document.querySelector("input#default");
const changeBackground = document.querySelector("input#background");

const pen = document.querySelector("#pen");
const rainbow = document.querySelector("#rainbow");
const shade = document.querySelector("#shade");
const toggleGrid = document.querySelector("#grid-toggle");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");

const buttons = document.querySelectorAll("button");
function toggleButton(element) {
    buttons.forEach(button => {
        button.style.backgroundColor = "#cfcfcf";
        button.style.boxShadow = "none";
    });

    element.style.backgroundColor = "#696969";
    element.style.boxShadow = "0 0 20px black";
}

pen.addEventListener("click", () => {
    currMode = "default";
    toggleButton(pen);
});

rainbow.addEventListener("click", () => {
    currMode = "rainbow";
    toggleButton(rainbow);
});

shade.addEventListener("click", () => {
    currMode = "shade";
    toggleButton(shade);
});

eraser.addEventListener("click", () => {
    currMode = "eraser";
    toggleButton(eraser);
});

toggleGrid.addEventListener("click", gridToggle);

clear.addEventListener("click", () => {
    gridSize = 16;
    size.innerHTML = "16 x 16";
    slider.value = "16";
    changeBackground.value = "#ffffff";
    resetGrid();
});

const backgroundWheel = document.querySelector("#bg-wheel");
const penWheel = document.querySelector("#pen-wheel");

let backgroundColor = "#cfcfcf";
changeBackground.oninput = function() {
    backgroundColor = this.value;
    backgroundWheel.style.backgroundColor = this.value;
    const divs = document.querySelectorAll(".draw-container > div");
    divs.forEach(div => {
        if (!div.classList.contains("colored")) {
            div.style.backgroundColor = backgroundColor;
            if (!grid) {
                div.style.border = `1px solid ${backgroundColor}`;
            }
        }
    });
};


let grid = true;

function gridToggle() {
    const divs = document.querySelectorAll(".draw-container > div");
    if (grid) {
        grid = false;
        divs.forEach(div => div.style.border = `1px solid ${div.classList.contains("colored") ? div.style.backgroundColor : backgroundColor}`);
    } else {
        grid = true;
        divs.forEach(div => div.style.border = `1px solid grey`);
    }
}

let gridSize = 16;
let slider = document.querySelector("#size");
let size = document.querySelector("#grid-size");

slider.oninput = function() {
    size.innerHTML = `${slider.value} x ${slider.value}`;
    gridSize = this.value;
    resetGrid();
};

function updateGrid() {
    etchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    etchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement("div");
        div.style.border = "1px solid grey"
        div.addEventListener("mouseover", fill);
        div.addEventListener("mousedown", fill);
        etchContainer.appendChild(div);
    }
}

function resetGrid() {
    etchContainer.innerHTML = "";
    currMode = "default";
    grid = true;
    currColor = "#000000";
    penWheel.style.backgroundColor = "#000000";
    backgroundColor = "#cfcfcf";
    backgroundWheel.style.backgroundColor = "#cfcfcf";
    toggleButton(pen);
    updateGrid();
}

let currMode = "default";

let currColor = "black";
changeColor.oninput = () => {
    currColor = changeColor.value;
    penWheel.style.backgroundColor = currColor;
}


let mousePressed = false;
etchContainer.addEventListener("mousedown", (e) => { mousePressed = true; e.preventDefault(); });
etchContainer.addEventListener("mouseup", (e) => { mousePressed = false; e.preventDefault(); });

function fill(e) {
    e.preventDefault();
    if (e.type === ("mouseover") && !mousePressed) {
        return;
    } else {
        this.classList.add("colored");
        if (currMode === "default") {
            this.style.backgroundColor = currColor;
            if (!grid) {
                this.style.border = `1px solid ${currColor}`;
            }
        } else if (currMode === "rainbow") {
            let color = randomColor();
            this.style.backgroundColor = color;
            if (!grid) {
                this.style.border = color;
            }
        } else if (currMode === "shade") {
            //this.style.backgroundColor = "red";
            shadeSquare(this);
        } else {
            this.style.backgroundColor = backgroundColor;
            if (!grid) {
                this.style.border = `1px solid ${backgroundColor}`;
            } else {
                this.style.border = "1px solid grey";
            }
            this.classList.remove("colored");
            this.classList.remove("shaded");
        }
    }
}

function randomColor() {
    let letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shadeSquare(square) {
    if (!square.classList.contains("shaded")) {
        square.classList.add("shaded");
        square.classList.add("255");
    }
    let currVal = parseInt(square.classList[2]);
    square.classList.remove(`${currVal}`);
    currVal = Math.round(currVal * 0.85);
    square.classList.add(`${currVal}`);
    square.style.backgroundColor = `rgb(${currVal}, ${currVal}, ${currVal}`;
    if (!grid) {
        square.style.border = `1px solid rgb(${currVal}, ${currVal}, ${currVal}`;
    }
}

const boxes = document.querySelectorAll(".draw-container > div");


const test = document.querySelector(".box11");

updateGrid();