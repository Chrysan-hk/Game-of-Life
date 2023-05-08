const unitLength = 20;
let boxColor = 150;
let strokeColor = 200; 
let columns;
let rows;
let currentBoard;
let nextBoard;

let startGame = true;
let reset = document.querySelector(".resetGame")
let randomOn = document.querySelector(".randomOn")
let stopScreen = document.querySelector(".stop")
let startMoving = document.querySelector(".startMoving")
let startDrawing = document.querySelector(".startDrawing")
let rubber = document.querySelector(".rubber")
let randomColour = document.querySelector(".randomColour")
let drawingMode = false
let speed = document.querySelector("#speed")
let loneliness = document.querySelector("#loneliness")
let reproduction = document.querySelector("#reproduction")
let overpopulation = document.querySelector("#overpopulation")
let fancyColor = document.querySelector(".fancy")
let normalColorMode = true
let sel;
let helloween = document.querySelector("#helloween")
let christmas = document.querySelector("#christmas")
let helloweenMode = false
let christmasMode = false
let glasses = document.querySelector("#glasses")
let grayCounter = document.querySelector("#grayCounter")
let simkingGliderGun = document.querySelector("#simkingGliderGun")





function setup() {
    const canvas = createCanvas(windowWidth - 180, windowHeight - 150);
    canvas.parent(document.querySelector("#canvas"));

    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }
    initBoard();
}

function initBoard() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
    fillColorToBox()
};

function fillColorToBox() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                if (normalColorMode) {
                    fill(boxColor);
                } else if (helloweenMode){
                    fill(255,165,0)
                } else if (christmasMode){
                    fill(0,100,0)
                } else {
                    let fancyColourArray = [
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256),
                    ]
                    fancyColor = `rgb(${fancyColourArray[0]},${fancyColourArray[1]},${fancyColourArray[2]})`
                    fill(fancyColor)
                }
            } else {
                if (helloweenMode){
                    fill(1)
                } else if (christmasMode){
                    fill(139,0,0)
                } else {
                    fill(255)
            };
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function draw() {
    background(255);
    frameRate(+speed.value)
    generate();
    fillColorToBox()
}

function generate() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {

            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    neighbors +=
                        currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            // Rules of Life
            if (currentBoard[x][y] === 1 && neighbors < loneliness.value) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] === 1 && neighbors > overpopulation.value) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] === 0 && neighbors == reproduction.value) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = floor(mouseX / unitLength);
    const y = floor(mouseY / unitLength);
    if (drawingMode) {
        currentBoard[x][y] = 1;
        if(helloweenMode){
            fill(255,165,0)
        }else if(christmasMode){
            fill(0,100,0)
        }else{
            fill(boxColor);
        }
    } else {
        currentBoard[x][y] = 0;
        fill('rgb(255,255,255)');
    }
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

// OK Reset 
reset.addEventListener("click", function () {
    boxColor = 150
    strokeColor = 200
    drawingMode = false
    normalColorMode = true
    helloweenMode = false
    christmasMode = false
    initBoard();
});

// OK Lonliness + Overpopulation + Reproduction Slider
loneliness.onchange = function (event) {
    let lonelinessValue = document.querySelector("#lonelinessValue")
    lonelinessValue.innerHTML = loneliness.value;
}

reproduction.onchange = function (event) {
    let reproductionValue = document.querySelector("#reproductionValue")
    reproductionValue.innerHTML = reproduction.value;
}

overpopulation.onchange = function (event) {
    let overpopulationValue = document.querySelector("#overpopulationValue")
    overpopulationValue.innerHTML = overpopulation.value;
}

// OK Speed
speed.onchange = function (event) {
    let speedValue = document.querySelector("#speedValue")
    speedValue.innerHTML = speed.value;
}

// OK RandomOn
randomOn.addEventListener("click", function () {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = Math.random() > 0.8 ? 1 : 0;
        }
    }
    loop()
})

// OK Stop
stopScreen.addEventListener("click", function () {
    noLoop()
})

// OK Start Moving
startMoving.addEventListener("click", function () {
    loop();
})

// OK Drawing Mode
startDrawing.addEventListener("click", function () {
    drawingMode = true
    noLoop()
})

// OK randomColour
randomColour.addEventListener("click", function () {
    normalColorMode = true
    background(255);
    let randomColourArray = [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
    ]
    boxColor = `rgb(${randomColourArray[0]},${randomColourArray[1]},${randomColourArray[2]})`
    fillColorToBox()
})

// OK rubber
rubber.addEventListener("click", function () {
    drawingMode = false
    noLoop()
})

// OK fancyColor
fancyColor.addEventListener("click", function () {
    normalColorMode = false

})

// OK resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// OK Theme Style
helloween.addEventListener("click", function () {
    strokeColor = 1  
    normalColorMode = false
    helloweenMode = true
})

christmas.addEventListener("click", function () {
    strokeColor = `rgb(139,0,0)`
    normalColorMode = false
    helloweenMode = false
    christmasMode = true
})

// Select Pattern
glasses.addEventListener("click", function (){
    const pattern = patternlist["glasses"].split("\n");
    console.log(pattern)
    let startX = Math.floor(columns/2);
    let startY = Math.floor(rows/2);
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        console.log(row, col, pattern[row][col]);
        currentBoard[startX + col][startY + row] = +(pattern[row][col] === "O");
      }
    }
    fillColorToBox()
    noLoop()
})

grayCounter.addEventListener("click", function (){
    const pattern = patternlist["grayCounter"].split("\n");
    console.log(pattern)
    let startX = Math.floor(columns/2);
    let startY = Math.floor(rows/2);
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        console.log(row, col, pattern[row][col]);
        currentBoard[startX + col][startY + row] = +(pattern[row][col] === "O");
      }
    }
    fillColorToBox()
    noLoop()
})

simkingGliderGun.addEventListener("click", function (){
    const pattern = patternlist["simkingGliderGun"].split("\n");
    console.log(pattern)
    let startX = Math.floor(columns/4);
    let startY = Math.floor(rows/4);
    for (let row = 0; row < pattern.length; row++) {
      for (let col = 0; col < pattern[row].length; col++) {
        console.log(row, col, pattern[row][col]);
        currentBoard[startX + col][startY + row] = +(pattern[row][col] === "O");
      }
    }
    fillColorToBox()
    noLoop()
})

