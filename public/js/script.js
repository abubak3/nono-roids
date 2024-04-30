const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/**
 * Nonogram Grid Keys
 */

// 0 = empty; 1 = yes; 2 = no

// CURRENT

// HARD CODED GRIDS
// Inner Grid
let innerEasy = [2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1]; // 1D array

// Clues
let rowClueEasy = [[0, 0, 3], [0, 0, 1], [0, 1, 2], [0, 1, 2], [0, 0, 4]];

let colClueEasy = [[0, 0, 1], [1, 1, 1], [0, 1, 2], [0, 1, 3], [0, 2, 1]];

let clueEasy = {
    rows: rowClueEasy, // [5 sub arrays [3 indexes max]]
    cols: colClueEasy
};

let innerHard = [];
let rowClueHard = [[0, 4, 1], [0, 4, 2], [1, 1, 2], [0, 3, 4], [0, 4, 3], [0, 6, 2], [0, 1, 7], [0, 2, 4], [0, 1, 5], [2, 3, 1]];

let colClueHard = [[1, 3, 1], [0, 1, 7], [0, 6, 1], [0, 2, 3], [1, 3, 1], [1, 1, 5], [0, 1, 4], [0, 2, 6], [0, 6, 1], [3, 1, 2]];

let clueHard = {
    rows: rowClueHard,
    cols: colClueHard
};

let innerMedium = [];
let rowClueMedium = [[0, 1, 1], [0, 3, 1], [0, 2, 1], [0, 1, 2], [0, 3, 1], [0, 1, 3], [0, 0, 5]];
let colClueMedium = [[2, 1, 1], [0, 4, 1], [0, 1, 3], [0, 1, 1], [0, 2, 2], [1, 1, 1], [0, 1, 2]];

let clueMedium = {
    rows: rowClueMedium,
    cols: colClueMedium
}

class Grid {
    constructor(solution, clues, size) {
        this.solution = solution;
        this.clues = clues;
        this.size = size;
    }

    checkGrid() { }

    drawClues() {
        ctx.font = "18px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        let startX, startY;

        switch (this.size) {
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
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < 3; j++) {
                const x = (i * 30) + startX + 100;
                const y = (j * 30) + startY + 5;
                ctx.fillText(this.clues.cols[i][j], x, y);
            }
        }

        // draw rowClues
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < 3; j++) {
                const x = (j * 30) + startX + 10;
                const y = (i * 30) + startY + 97; // Adjust y-coordinate for row clues
                ctx.fillText(this.clues.rows[i][j], x, y);
            }
        }
    }
}


$(() => {
    // Extract difficulty level from URL
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');

    // Call the appropriate drawing function based on difficulty level
    switch (difficulty) {
        case 'easy':
            drawEasy();
            let gridEasy = new Grid(innerEasy, clueEasy, 5);
            gridEasy.drawClues();
            break;
        case 'medium':
            drawMedium();
            let gridMedium = new Grid(innerMedium, clueMedium, 7);
            gridMedium.drawClues();
            break;
        case 'hard':
            drawHard();
            let gridHard = new Grid(innerHard, clueHard, 10);
            gridHard.drawClues();
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


$("#gameCanvas").leftClick((e) => {
    x = e.clientX;
    y = e.clientY;
    selectedCol = Math.floor(x / 50);
    selectedRow = Math.floor(y / 50);
});
