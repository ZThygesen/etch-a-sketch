// default settings
let gridSize = 16;
let grid = true;
let backgroundColor = "#cfcfcf";
let currMode = "pen";
let currColor = "black";

// canvas element
const etchContainer = document.querySelector(".draw-container");

// slider elements
let slider = document.querySelector("#size");
let size = document.querySelector("#grid-size");

// buttons
const buttons = document.querySelectorAll("button");
const pen = document.querySelector("#pen");
const rainbow = document.querySelector("#rainbow");
const shade = document.querySelector("#shade");
const toggleGrid = document.querySelector("#grid-toggle");
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");

// event listeners for each toggle button
pen.addEventListener("click", () => toggleButton(pen));
rainbow.addEventListener("click", () => toggleButton(rainbow));
shade.addEventListener("click", () => toggleButton(shade));
eraser.addEventListener("click", () => toggleButton(eraser));

// toggles correct button on and turns other button off
function toggleButton(element) {
    currMode = element.getAttribute("id");
    console.log(currMode);
    buttons.forEach(button => {
        button.style.backgroundColor = "#cfcfcf";
        button.style.boxShadow = "none";
    });

    element.style.backgroundColor = "#696969";
    element.style.boxShadow = "0 0 20px black";
}

// event listener and functionality for grid toggling
toggleGrid.addEventListener("click", gridToggle);

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

// event listener and functionality for clear
clear.addEventListener("click", () => {
    gridSize = 16;
    size.innerHTML = "16 x 16";
    slider.value = "16";
    changeBackground.value = "#ffffff";
    reset();
});

// resets to default settings and calls to create fresh grid
function reset() {
    etchContainer.innerHTML = "";
    grid = true;
    currColor = "black";
    penWheel.style.backgroundColor = "black";
    backgroundColor = "#cfcfcf";
    backgroundWheel.style.backgroundColor = "#cfcfcf";
    toggleButton(pen, "pen");
    createGrid();
}

// changing pen color functionality
const changeColor = document.querySelector("input#default");
const penWheel = document.querySelector("#pen-wheel");

changeColor.oninput = () => {
    currColor = changeColor.value;
    penWheel.style.backgroundColor = currColor;
}

// changing background color functionality
const changeBackground = document.querySelector("input#background");
const backgroundWheel = document.querySelector("#bg-wheel");

changeBackground.oninput = function() {
    backgroundColor = this.value;
    backgroundWheel.style.backgroundColor = this.value;

    // goes to each box on the grid and makes sure we only change the boxes that aren't currently colored
    const boxes = document.querySelectorAll(".draw-container > div");
    boxes.forEach(box => {
        if (!box.classList.contains("colored")) {
            box.style.backgroundColor = backgroundColor;
            if (!grid) {
                box.style.border = `1px solid ${backgroundColor}`;
            }
        }
    });
};

// slider functionality
slider.oninput = function() {
    size.innerHTML = `${slider.value} x ${slider.value}`;
    gridSize = this.value;
    reset();
};

// click-and-drag-to-draw functionality
let mousePressed = false;
etchContainer.addEventListener("mousedown", (e) => { mousePressed = true; e.preventDefault(); });
etchContainer.addEventListener("mouseup", (e) => { mousePressed = false; e.preventDefault(); });

// controls how the drawing happens
function fill(e) {
    e.preventDefault();
    // make sure the user is clicking and dragging at the same time
    if (e.type === ("mouseover") && !mousePressed) {
        return;
    }
    // if not, we can fill some squares! 
    else {
        // mark that the current square is now colored
        this.classList.add("colored");
        // fill the square with the desired background color
        // if the grid is OFF then we also need to fill its border with the background color

        // if current mode is the pen
        if (currMode === "pen") {
            this.style.backgroundColor = currColor;
            if (!grid) {
                this.style.border = `1px solid ${currColor}`;
            }
        // if current mode is rainbow
        } else if (currMode === "rainbow") {
            let color = randomColor();
            this.style.backgroundColor = color;
            if (!grid) {
                this.style.border = color;
            }
        // if current mode is shade
        } else if (currMode === "shade") {
            shadeSquare(this);
        }
        // if current mode is eraser 
        else {
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

// generates a random hex color for rainbow mode
function randomColor() {
    let letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// adds 15% shade to the current square
function shadeSquare(square) {
    // if square has not been shaded before, add a class to track it and another
    // to store its current rgb value
    if (!square.classList.contains("shaded")) {
        square.classList.add("shaded");
        square.classList.add("255");
    }
    // get the current shade value
    let currVal = parseInt(square.classList[2]);
    // calculate the new shade value and store it in its classes
    square.classList.remove(`${currVal}`);
    currVal = Math.round(currVal * 0.85);
    square.classList.add(`${currVal}`);
    // apply the newly calculated shade value to the square
    // if the grid is OFF need to color the border accordingly
    square.style.backgroundColor = `rgb(${currVal}, ${currVal}, ${currVal}`;
    if (!grid) {
        square.style.border = `1px solid rgb(${currVal}, ${currVal}, ${currVal}`;
    }
}

// creates a new grid given the grid size
function createGrid() {
    etchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    etchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    // applies event listeners to each square then adds them to the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement("div");
        div.style.border = "1px solid grey"
        div.addEventListener("mouseover", fill);
        div.addEventListener("mousedown", fill);
        etchContainer.appendChild(div);
    }
}

createGrid();