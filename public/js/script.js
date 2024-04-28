const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/**
 * Nonogram Grid Keys
 */

// 0 = empty; 1 = yes; 2 = no

// CURRENT

// Inner Grid
let inner = [
  2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1,
]; // 1D array

// Clues
let rowClue = [
  [0, 0, 3],
  [0, 0, 1],
  [0, 1, 2],
  [0, 1, 2],
  [0, 0, 4],
];

let colClue = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 1, 2],
  [0, 1, 3],
  [0, 2, 1],
];

let clue = {
  rows: rowClue, // [5 sub arrays [3 indexes max]]
  cols: colClue,
};

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
        ctx.fillText(this.clues.cols[i][j], i * 30 + 100, j * 30 + 10);
      }
    }

    // draw rowClues
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.fillText(this.clues.rows[i][j], j * 30 + 10, i * 30 + 100);
      }
    }
    // draw playGrid
  }
}

$(() => {
  drawEasy();
  let grid = new Grid(inner, clue, 5);
  grid.drawClues();
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
