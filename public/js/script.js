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


// let grid = {
//   solution: inner,
//   clue: clue,
// };

class Grid {
  constructor(solution, clues, size) {
    this.solution = solution;
    this.clues = clues;
    this.size = size;
  }

  checkGrid() {}

  drawClues() {
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    // draw colClues
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(this.clues.cols);
        if (this.clues.cols[i][j] !== 0)  // Check if value is not 0
          ctx.fillText(this.clues.cols[i][j], i * 30 + 100, j * 30 + 10);
      }
    }

    // draw rowClues
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.clues.rows[i][j] !== 0)  // Check if value is not 0
          ctx.fillText(this.clues.rows[i][j], j * 30 + 10, i * 30 + 100);
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
function drawEasy() {
  // Draw Lines
  ctx.beginPath();
  ctx.moveTo(0, 0);

  // outside lines
  ctx.lineTo(240, 0);
  ctx.lineTo(240, 240);
  ctx.lineTo(0, 240);
  ctx.lineTo(0, 0);

  ctx.moveTo(0, 90);
  ctx.lineTo(240, 90);
  ctx.moveTo(90, 0);
  ctx.lineTo(90, 240);

  for (let x = 90; x < 240; x += 30) {
    ctx.moveTo(x, 90);
    ctx.lineTo(x, 240);
  }

  for (let y = 90; y < 240; y += 30) {
    ctx.moveTo(90, y);
    ctx.lineTo(240, y);
  }

  ctx.stroke();
}

function drawMedium() {
  // Draw Lines
  ctx.beginPath();
  ctx.moveTo(0, 0);

  // outside lines
  ctx.lineTo(300, 0);
  ctx.lineTo(300, 300);
  ctx.lineTo(0, 300);
  ctx.lineTo(0, 0);

  ctx.moveTo(0, 90);
  ctx.lineTo(300, 90);
  ctx.moveTo(90, 0);
  ctx.lineTo(90, 300);

  for (let x = 90; x < 300; x += 30) {
    ctx.moveTo(x, 90);
    ctx.lineTo(x, 300);
  }

  for (let y = 90; y < 300; y += 30) {
    ctx.moveTo(90, y);
    ctx.lineTo(300, y);
  }

  ctx.stroke();
}

function drawHard() {
  // Draw Lines
  ctx.beginPath();
  ctx.moveTo(0, 0);

  // outside lines
  ctx.lineTo(390, 0);
  ctx.lineTo(390, 390);
  ctx.lineTo(0, 390);
  ctx.lineTo(0, 0);

  ctx.moveTo(0, 90);
  ctx.lineTo(390, 90);
  ctx.moveTo(90, 0);
  ctx.lineTo(90, 390);

  for (let x = 90; x < 390; x += 30) {
    ctx.moveTo(x, 90);
    ctx.lineTo(x, 390);
  }

  for (let y = 90; y < 390; y += 30) {
    ctx.moveTo(90, y);
    ctx.lineTo(390, y);
  }
  ctx.stroke();
}

$("#gameCanvas").leftClick((e) => {
  x = e.clientX;
  y = e.clientY;
  selectedCol = Math.floor(x / 50);
  selectedRow = Math.floor(y / 50);
});
