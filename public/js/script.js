const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/**
 * Nonogram Grid Keys
 */

// 0 = empty; 1 = yes; 2 = no

/**
 * Globals!
 */
let currentGrid;
let grid, size;

// mouse positions
let x, y;
let startGridX, endGridX, startGridY, endGridY;

// HARD CODED GRIDS
let innerEasy1 = [2,1,1,1,2, 2,2,2,2,1, 2,1,2,1,1, 1,2,1,1,2, 2,1,1,1,1];
let clueEasy1 = {rows: [[0, 0, 3], [0, 0, 1], [0, 1, 2], [0, 1, 2], [0, 0, 4]], cols: [[0, 0, 1], [1, 1, 1], [0, 1, 2], [0, 1, 3], [0, 2, 1]]};

let innerEasy2 = [1,1,2,1,2, 1,1,1,2,2, 2,2,1,2,1, 2,1,1,1,1, 2,2,1,1,1];
let clueEasy2 = {rows: [[0, 2, 1], [0, 0, 3], [0, 1, 1], [0, 0, 4], [0, 0, 3]], cols: [[0, 0, 2], [0, 2, 1], [0, 0, 4], [0, 1, 2], [0, 0, 3]]};

let innerEasy3 = [2,1,2,1,2, 1,1,1,2,1, 1,2,1,2,2, 2,2,1,2,1, 1,1,1,2,2];
let clueEasy3 = {rows: [[0, 1, 1], [0, 3, 1], [0, 1, 1], [0, 1, 1], [0, 0, 3]], cols: [[0, 2, 1], [0, 2, 1], [0, 0, 4], [0, 0, 1], [0, 1, 1]]};

let innerEasy4 = [1,2,1,2,2, 1,2,2,2,1, 2,1,1,1,1, 1,2,1,1, 1,2,1,2,1,1];
let clueEasy4 = {rows: [[0, 1, 1], [0, 1, 1], [0, 0, 4], [0, 1, 3], [0, 1, 2]], cols: [[0, 2, 1], [0, 1, 1], [0, 1, 2], [0, 0, 3], [0, 0, 4]]};

let innerEasy5 = [1,2,1,2,2, 1,1,1,2,2, 1,1,2,2,1, 2,1,1,1,2, 1,2,1,2,2];
let clueEasy5 = {rows: [[0, 1, 1], [0, 0, 3], [0, 2, 1], [0, 0, 3], [0, 1, 1]], cols: [[0, 3, 1], [0, 0, 3], [0, 2, 2], [0, 0, 1], [0, 0, 1]]};

let innerMedium1 = [1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,2,2,2,1,1,2,1,1,1,1,2,2,1,2,1,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1];
let clueMedium1 = {rows: [[0, 2, 4], [0, 2, 2], [0, 2, 1], [0, 1, 4], [1, 2, 1], [1, 1, 2], [0, 2, 4]],    cols: [[1, 2, 1], [0, 3, 3], [0, 1, 1], [0, 1, 4], [2, 2, 1], [2, 1, 2], [1, 1, 3]]}

let innerMedium2 = [1,1,2,1,1,1,1, 2,1,1,2,1,1,2,1,1,2,2,2,2,1,1,2,1,1,1,1,2,2,1,2,1,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1];
let clueMedium2 = {rows: [[0, 1, 5], [0, 3, 3], [0, 1, 2], [1, 3, 1], [0, 0, 6], [0, 3, 1], [0, 4, 1]],    cols: [[0, 2, 4], [0, 1, 3], [0, 2, 4], [1, 3, 1], [0, 2, 2], [0, 3, 2], [0, 4, 1]]}

let innerMedium3 = [1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,2,1,1,2,2,1,1,1,1,1,2,1,1,2,2,1,2,2,2,1,1,1,1,1,2,2,2,1,1,2,2,1,1];
let clueMedium3 = {rows: [[0, 4, 2], [0, 3, 3], [0, 1, 2], [0, 5, 1], [0, 1, 1], [0, 0, 5], [0, 2, 2]],    cols: [[0, 2, 3], [0, 4, 2], [2, 1, 2], [0, 1, 4], [0, 3, 1], [0, 2, 1], [2, 1, 1]]}

let innerMedium4 = [2,2,1,1,1,2,2,1,2,1,2,2,2,1,2,1,1,2,2,2,1,1,1,2,1,1,1,1,2,2,1,2,1,1,1,1,1,2,2,1,2,2,1,1,2,1,1,2,1];
let clueMedium4 = {rows: [[0, 0, 3], [1, 1, 1], [0, 2, 1], [0, 2, 4], [0, 1, 3], [0, 2, 1], [2, 2, 1]],    cols: [[1, 1, 2], [0, 2, 2], [0, 3, 1], [1, 1, 1], [0, 1, 4], [0, 0, 2], [0, 4, 1]]}

let innerMedium5 = [1,2,2,1,2,1,1,2,1,2,1,2,2,2,1,1,2,1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,1,2,1,2,1,1,1,1,1,1,1,1,1,2,2,1,2];
let clueMedium5 = {rows: [[1, 1, 2], [0, 1, 1], [0, 2, 4], [0, 1, 3], [2, 1, 1], [0, 0, 6], [0, 3, 1]],    cols: [[1, 3, 1], [0, 2, 3], [0, 0, 2], [0, 3, 1], [0, 0, 4], [1, 2, 2], [0, 1, 4]]}

// #440152
let innerHard1 = [2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2,2,1,1,1,2,2,1,1,1,2,2,1,1,1,1,2,1,1,1,2,2,2,1,1,2,2,1,1,2,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,2,2,1,2,2,2,2,2,2,2,2,1,2,2,1,1,1,1,1,1,2,1,2,2,1,1,2,2,2,1,1,1,1,1];
let clueHard1 = {rows: [[0, 0, 4], [0, 3, 2], [1, 3, 2], [1, 4, 2], [1, 2, 2], [0, 3, 2], [0, 6, 1], [0, 0, 1], [0, 6, 1], [0, 2, 5]],    cols: [[4, 1, 2], [1, 1, 2], [1, 1, 1], [2, 2, 1], [0, 5, 1], [0, 5, 2], [1, 1, 1], [0, 1, 3], [0, 7, 1], [0, 6, 1]]};

let innerHard2 = [1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,1,1,1,2,1,1,1,2,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,2,2,1,2,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,2,1,1,1,2,2,2,1,2,2,1,1,1,1,1,2,2,1,1,2,1,1,2,2,1];
let clueHard2 = {rows: [[0, 0, 2], [0, 5, 3], [0, 3, 4], [0, 0, 5], [0, 1, 5], [0, 1, 6], [0, 0, 4], [0, 5, 3], [0, 1, 5], [2, 2, 1]],    cols: [[2, 1, 2], [0, 3, 2], [0, 2, 5], [2, 2, 1], [1, 1, 1], [0, 4, 2], [0, 4, 3], [0, 5, 2], [0, 5, 2], [1, 3, 2]]};

let innerHard3 = [2,2,2,2,2,2,2,1,1,2,2,2,2,2,1,1,1,1,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,1,2,2,2,1,1,1,1,2,2,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,2,2,1,2,2,2,2,2,1,2,1,1,1,2,1,2,1,1,1,1,1,1,2,2,2,2,1,1,2];
let clueHard3 = {rows: [[0, 0, 2], [0, 4, 1], [0, 1, 2], [0, 3, 3], [0, 1, 3], [0, 1, 4], [0, 2, 5], [1, 1, 1], [3, 1, 3], [0, 3, 2]],    cols: [[1, 4, 1], [1, 1, 2], [0, 1, 2], [0, 1, 2], [0, 0, 1], [2, 1, 1], [0, 2, 2], [2, 4, 2], [1, 4, 2], [0, 1, 6]]};

// #127847
let innerHard4 = [2,2,2,1,1,1,1,2,1,1,1,2,2,2,2,1,1,2,1,1,1,1,2,2,2,2,1,1,1,1,2,2,1,1,2,2,1,1,1,2,1,1,1,2,2,2,2,1,2,2,2,2,2,2,1,2,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,2,2,1,2,1,1,2,2,2,2,2,2,2,2];
let clueHard4 = {rows: [[0, 4, 2], [1, 2, 2], [0, 2, 4], [0, 2, 3], [0, 3, 1], [0, 1, 2], [0, 0, 2], [0, 0, 4], [0, 6, 1], [0, 0, 2]],    cols: [[2, 1, 2], [1, 1, 2], [0, 2, 1], [1, 1, 1], [1, 2, 1], [0, 2, 3], [4, 1, 1], [0, 4, 1], [0, 4, 2], [0, 0, 3]]};

// 
let innerHard5 = [2,2,1,1,2,2,2,2,2,2,1,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,2,2,2,2,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2,1,2,2,2,2,2,2,2,2,2];
let clueHard5 = {rows: [[0, 0, 2], [0, 1, 7], [0, 1, 2], [0, 1, 5], [0, 1, 7], [0, 5, 2], [0, 0, 4], [0, 0, 8], [0, 1, 3], [0, 0, 1]],    cols: [[0, 6, 2], [0, 0, 2], [0, 1, 3], [0, 2, 4], [1, 2, 1], [1, 2, 1], [1, 2, 2], [1, 2, 2], [0, 5, 2], [0, 5, 1]]};

class Grid {
    constructor(solution, clues) {
        this.solution = solution;
        this.clues = clues;
        this.stringSolution = JSON.stringify(solution);
    }

    checkGrid() {
        if (JSON.stringify(currentGrid) == (this.stringSolution)) {
            console.log("nongram is correct!");
            ctx.beginPath();
            ctx.rect(0, 0, 1000, 600);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.stroke();
            // Wait for 5 seconds before redirecting to index.html
        setTimeout(function() {
          window.location.href = "index.html"; // Replace "index.html" with your actual index file path
      }, 5000);
        }
    }

    drawClues() {
        ctx.fillStyle = "white";      
        ctx.font = "18px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        let startX, startY;

        switch (size) {
            case 5: // Easy
                startX = 380;
                startY = 180;
                break;
            case 7: // Medium
                startX = 350;
                startY = 150;
                break;
            case 10: // Hard
                startX = 305;
                startY = 105;
                break;
            default:
                startX = 0;
                startY = 0;
        }

        // draw colClues
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < 3; j++) {
              if (this.clues.cols[i][j] !== 0) {
                const x = (i * 30) + startX + 100;
                const y = (j * 30) + startY + 5;
                ctx.fillText(this.clues.cols[i][j], x, y);
              }
            }
        }

        // draw rowClues
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < 3; j++) {
              if (this.clues.rows[i][j] !== 0) {
                const x = (j * 30) + startX + 10;
                const y = (i * 30) + startY + 97; // Adjust y-coordinate for row clues
                ctx.fillText(this.clues.rows[i][j], x, y);
              }
            }
        }
    }
}


$(() => {
    // Extract difficulty level from URL
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');

    ctx.rect(0, 0, 1000, 600);
    ctx.fillStyle = "black";
    ctx.fill();

    // Call the appropriate drawing function based on difficulty level
    switch (difficulty) {
        case 'easy':
            drawEasy();
            size = 5;

            // pick a grid 1 to 5  

            grid = new Grid(innerEasy1, clueEasy1);
            grid.drawClues();

            startGridX = 470;
            endGridX = 620;
            startGridY = 270;
            endGridY = 420;

            currentGrid = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0];
            break;
        case 'medium':
            drawMedium();
            size = 7;

            grid = new Grid(innerMedium1, clueMedium1);
            grid.drawClues();

            startGridX = 440;
            endGridX = 650;
            startGridY = 240;
            endGridY = 450;

            currentGrid = [0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0];
            break;
        case 'hard':
            drawHard();
            size = 10;
            
            grid = new Grid(innerHard1, clueHard1);
            grid.drawClues();

            startGridX = 395;
            endGridX = 695;
            startGridY = 195;
            endGridY = 495;

            currentGrid = [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0];
            break;
        default:
            // Handle invalid difficulty level or default to easy
            drawEasy();
    }
});


// for easy we need to start at (380,180)
// for medium we need to start at (350, 150)
// for hard we need to start at (305, 105)
function drawEasy() {
    ctx.strokeStyle = "#DCD0FF";

    // Draw Lines
    ctx.beginPath();
    ctx.moveTo(380, 180);

    // outside lines
    ctx.lineTo(620, 180); // x: 380 + 240, y: 180
    ctx.lineTo(620, 420); // x: 380 + 240, y: 180 + 240
    ctx.lineTo(380, 420); // x: 380, y: 180 + 240
    ctx.lineTo(380, 180); // x: 380, y: 180

    ctx.moveTo(380, 270); // x: 380, y: 180 + 90
    ctx.lineTo(620, 270); // x: 380 + 240, y: 180 + 90
    ctx.moveTo(470, 180); // x: 380 + 90, y: 180
    ctx.lineTo(470, 420); // x: 380 + 90, y: 180 + 240

    for (let x = 470; x < 620; x += 30) { // x: 380 + 90, end at 380 + 240
        ctx.moveTo(x, 270); // y: 180 + 90
        ctx.lineTo(x, 420); // y: 180 + 240
    }

    for (let y = 270; y < 420; y += 30) { // y: 180 + 90, end at 180 + 240
        ctx.moveTo(470, y); // x: 380 + 90
        ctx.lineTo(620, y); // x: 380 + 240
    }

    ctx.stroke();
}


function drawMedium() {
    ctx.strokeStyle = "#DCD0FF";

    // Draw Lines
    ctx.beginPath();
    ctx.moveTo(350, 150);

    // outside lines
    ctx.lineTo(650, 150); // x: 350 + 300, y: 150
    ctx.lineTo(650, 450); // x: 350 + 300, y: 150 + 300
    ctx.lineTo(350, 450); // x: 350, y: 150 + 300
    ctx.lineTo(350, 150); // x: 350, y: 150

    ctx.moveTo(350, 240); // x: 350, y: 150 + 90
    ctx.lineTo(650, 240); // x: 350 + 300, y: 150 + 90
    ctx.moveTo(440, 150); // x: 350 + 90, y: 150
    ctx.lineTo(440, 450); // x: 350 + 90, y: 150 + 300

    for (let x = 440; x < 650; x += 30) { // x: 350 + 90, end at 350 + 300
        ctx.moveTo(x, 240); // y: 150 + 90
        ctx.lineTo(x, 450); // y: 150 + 300
    }

    for (let y = 240; y < 450; y += 30) { // y: 150 + 90, end at 150 + 300
        ctx.moveTo(440, y); // x: 350 + 90
        ctx.lineTo(650, y); // x: 350 + 300
    }

    ctx.stroke();
}


function drawHard() {
    ctx.strokeStyle = "#DCD0FF";

    // Draw Lines
    ctx.beginPath();
    ctx.moveTo(305, 105);

    // outside lines
    ctx.lineTo(695, 105); // x: 305 + 390, y: 105
    ctx.lineTo(695, 495); // x: 305 + 390, y: 105 + 390
    ctx.lineTo(305, 495); // x: 305, y: 105 + 390
    ctx.lineTo(305, 105); // x: 305, y: 105

    ctx.moveTo(305, 195); // x: 305, y: 105 + 90
    ctx.lineTo(695, 195); // x: 305 + 390, y: 105 + 90
    ctx.moveTo(395, 105); // x: 305 + 90, y: 105
    ctx.lineTo(395, 495); // x: 305 + 90, y: 105 + 390

    for (let x = 395; x < 695; x += 30) { // x: 305 + 90, end at 305 + 390
        ctx.moveTo(x, 195); // y: 105 + 90
        ctx.lineTo(x, 495); // y: 105 + 390
    }

    for (let y = 195; y < 495; y += 30) { // y: 105 + 90, end at 105 + 390
        ctx.moveTo(395, y); // x: 305 + 90
        ctx.lineTo(695, y); // x: 305 + 390
    }

    ctx.stroke();
}

canvas.oncontextmenu = function (e) {
    e.preventDefault();
};


/*
    1d -> 2d 
    (x%5) + (y*5)
*/

$("#gameCanvas").mousedown((e) => {
    getMousePos(e);
    if (x > startGridX && x < endGridX && y > startGridY && y < endGridY) {
        let selectedCol = Math.floor((x - startGridX) / 30);
        let selectedRow = Math.floor((y - startGridY) / 30);
        if (e.which == 1) { // left click - set block to white
            if (currentGrid[(selectedCol % size) + (selectedRow * size)] == 1) {
                currentGrid[(selectedCol % size) + (selectedRow * size)] = 0;
                drawSquare(selectedRow, selectedCol, 'black');
            } else {
                currentGrid[(selectedCol % size) + (selectedRow * size)] = 1;
                drawSquare(selectedRow, selectedCol, 'white');
            }
        } else if (e.which == 3) { // right click - set block to purple
            // currentGrid[(selectedCol % size) + (selectedRow * size)] = 2;
            // drawSquare(selectedRow, selectedCol, 'purple');

            if (currentGrid[(selectedCol % size) + (selectedRow * size)] == 2) {
                currentGrid[(selectedCol % size) + (selectedRow * size)] = 0;
                drawSquare(selectedRow, selectedCol, 'black');
            } else {
                currentGrid[(selectedCol % size) + (selectedRow * size)] = 2;
                drawSquare(selectedRow, selectedCol, 'purple');
            }

        }
        console.log(currentGrid);
        console.log(grid.solution);
        grid.checkGrid();
    }
});


function drawSquare(row, col, color) {
    ctx.beginPath();
    ctx.rect(startGridX + (col*30), startGridY +  (row * 30), 30, 30);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}


function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
}


function loseLife() {
  lives--; // Decrease the lives count
  
  // Update the menu bar <h2> to display the new lives count
  const lives = document.getElementById("lives");
  menuBar.innerText = "Lives: " + lives;

  // If lives reach 0, change the screen to red and return home after 5 seconds
  if (lives === 0) {
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "red";
      ctx.fill();

      setTimeout(() => {
          window.location.href = "index.html"; // Redirect to index.html after 5 seconds
      }, 5000); // 5000 milliseconds = 5 seconds
  }
}
