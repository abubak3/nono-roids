const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/**
 * Nonogram Grid Keys
 */

// 0 = empty; 1 = yes; 2 = no

/**
 * Globals!
 */
let lives;
let currentGrid;
let grid, size;
let asteroidSize;

// mouse positions
let mouseX, mouseY;
let startGridX, endGridX, startGridY, endGridY;

// gborders
let gridBorderStartX,gridBorderEndX, gridBorderStartY, griBorderEndY;

let asteroids = [];
let speed = 0;

const asteroidImage1 = new Image();
const asteroidImage2 = new Image();

// HARD CODED GRIDS
// correct solution
let innerEasy1 = [
  2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1,
];
let clueEasy1 = {
  rows: [[0, 0, 3],[0, 0, 1],[0, 1, 2],[0, 1, 2],[0, 0, 4],],
  cols: [[0, 0, 1],[1, 1, 1],[0, 1, 2],[0, 1, 3],[0, 2, 1],],
};

// correct solution
let innerEasy2 = [1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1,];
let clueEasy2 = {
  rows: [[0, 2, 1],[0, 0, 3],[0, 1, 1],[0, 0, 4],[0, 0, 3]],
  cols: [[0, 0, 2],[0, 2, 1],[0, 0, 4],[0, 1, 2],[0, 0, 3],],
};

// correct solution
let innerEasy3 = [2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2,];
let clueEasy3 = {
  rows: [[0, 1, 1],[0, 3, 1],[0, 1, 1],[0, 1, 1],[0, 0, 3]],
  cols: [[0, 2, 1],[0, 2, 1],[0, 0, 4],[0, 0, 1],[0, 1, 1]],
};

// correct solution
let innerEasy4 = [1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1];
let clueEasy4 = {
  rows: [[0, 1, 1],[0, 1, 1],[0, 0, 4],[0, 1, 3],[0, 1, 2]],
  cols: [[0, 2, 1],[0, 1, 1],[0, 1, 2],[0, 0, 3],[0, 0, 4]],
};

// correct solution
let innerEasy5 = [1, 2, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2];
let clueEasy5 = {
  rows: [[0, 1, 1],[0, 0, 3],[0, 2, 1],[0, 0, 3],[0, 1, 1]],
  cols: [[0, 3, 1],[0, 0, 3],[0, 2, 2],[0, 0, 1],[0, 0, 1]],
};

const easyGrids = [
  { inner: innerEasy1, clue: clueEasy1 },
  { inner: innerEasy2, clue: clueEasy2 },
  { inner: innerEasy3, clue: clueEasy3 },
  { inner: innerEasy4, clue: clueEasy4 },
  { inner: innerEasy5, clue: clueEasy5 },
];

// correct solution
let innerMedium1 = [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1,1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1,];
let clueMedium1 = {
  rows: [[0, 2, 4],[0, 2, 2],[0, 2, 1],[0, 1, 4],[1, 2, 1],[1, 1, 2],[0, 2, 4]],
  cols: [[1, 2, 1],[0, 3, 3],[0, 1, 1],[0, 1, 4],[2, 2, 1],[2, 1, 2],[1, 1, 3]],
};

// correct solution
let innerMedium2 = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1];
let clueMedium2 = {
  rows: [[0, 1, 5],[0, 3, 3],[0, 1, 2],[1, 3, 1],[0, 0, 6],[0, 3, 1],[0, 4, 1]],
  cols: [[0, 2, 4],[0, 1, 3],[0, 2, 4],[1, 3, 1],[0, 2, 2],[0, 3, 2],[0, 4, 1]],
};

// correct solution
let innerMedium3 = [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1];
let clueMedium3 = {
  rows: [[0, 4, 2],[0, 3, 3],[0, 1, 2],[0, 5, 1],[0, 1, 1],[0, 0, 5],[0, 2, 2]],
  cols: [[0, 2, 3],[0, 4, 2],[2, 1, 2],[0, 1, 4],[0, 3, 1],[0, 2, 1],[2, 1, 1]],
};

// correct solution
let innerMedium4 = [2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1];
let clueMedium4 = {
  rows: [[0, 0, 3],[1, 1, 1],[0, 2, 1],[0, 2, 4],[0, 1, 3],[0, 2, 1],[2, 2, 1]],
  cols: [[1, 1, 2],[0, 2, 2],[0, 3, 1],[1, 1, 1],[0, 1, 4],[0, 0, 2],[0, 4, 1]],
};

// correct solution
let innerMedium5 = [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2];
let clueMedium5 = {
  rows: [[1, 1, 2],[0, 1, 1],[0, 2, 4],[0, 1, 3],[2, 1, 1],[0, 0, 6],[0, 3, 1]],
  cols: [[1, 3, 1],[0, 2, 3],[0, 0, 2],[0, 3, 1],[0, 0, 4],[1, 2, 2],[0, 1, 4]],
};

const mediumGrids = [
  { inner: innerMedium1, clue: clueMedium1 },
  { inner: innerMedium2, clue: clueMedium2 },
  { inner: innerMedium3, clue: clueMedium3 },
  { inner: innerMedium4, clue: clueMedium4 },
  { inner: innerMedium5, clue: clueMedium5 },
];

// correct solution
let innerHard1 = [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1];
let clueHard1 = {
  rows: [[0, 0, 4],[0, 3, 2],[1, 3, 2],[1, 4, 2],[1, 2, 2],[0, 3, 2],[0, 6, 1],[0, 0, 1],[0, 6, 1],[0, 2, 5]],
  cols: [[4, 1, 2],[1, 1, 2],[1, 1, 1],[2, 2, 1],[0, 5, 1],[0, 5, 2],[1, 1, 1],[0, 1, 3],[0, 7, 1],[0, 6, 1]],
};

// correct solution
let innerHard2 = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1];
let clueHard2 = {
  rows: [[0, 0, 2],[0, 5, 3],[0, 3, 4],[0, 0, 5],[0, 1, 5],[0, 1, 6],[0, 0, 4],[0, 5, 3],[0, 1, 5],[2, 2, 1]],
  cols: [[2, 1, 2],[0, 3, 2],[0, 2, 5],[2, 2, 1],[1, 1, 1],[0, 4, 2],[0, 4, 3],[0, 5, 2],[0, 5, 2],[1, 3, 2]],
};

// correct solution
let innerHard3 = [
  2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2];
let clueHard3 = {
  rows: [[0, 0, 2],[0, 4, 1],[0, 1, 2],[0, 3, 3],[0, 1, 3],[0, 1, 4],[0, 2, 5],[1, 1, 1],[3, 1, 3],[0, 3, 2]],
  cols: [[1, 4, 1],[1, 1, 2],[0, 1, 2],[0, 1, 2],[0, 0, 1],[2, 1, 1],[0, 2, 2],[2, 4, 2], [1, 4, 2],[0, 1, 6]],
};

// correct solution
let innerHard4 = [
  2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2];
let clueHard4 = {
  rows: [
    [0, 4, 2],[1, 2, 2],[0, 2, 4],[0, 2, 3], [0, 3, 1], [0, 1, 2],[0, 0, 2],[0, 0, 4],[0, 6, 1],[0, 0, 2]],
  cols: [[2, 1, 2],[1, 1, 2],[0, 2, 1],[1, 1, 1],[1, 2, 1],[0, 2, 3],[4, 1, 1],[0, 4, 1],[0, 4, 2],[0, 0, 3]],
};

// correct solution
let innerHard5 = [
  2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2];
let clueHard5 = {
  rows: [[0, 0, 2],[0, 1, 7],[0, 1, 2],[0, 1, 5],[0, 1, 7],[0, 5, 2],[0, 0, 4],[0, 0, 8],[0, 1, 3],[0, 0, 1]],
  cols: [[0, 6, 2],[0, 0, 2],[0, 1, 3],[0, 2, 4],[1, 2, 1],[1, 2, 1],[1, 2, 2],[1, 2, 2],[0, 5, 2],[0, 5, 1]],
};

const hardGrids = [
  { inner: innerHard1, clue: clueHard1 },
  { inner: innerHard2, clue: clueHard2 },
  { inner: innerHard3, clue: clueHard3 },
  { inner: innerHard4, clue: clueHard4 },
  { inner: innerHard5, clue: clueHard5 },
];

class Grid {
  constructor(solution, clues) {
    this.solution = solution;
    this.clues = clues;
    this.stringSolution = JSON.stringify(solution);
  }

  checkGrid() {
    // need to fix based on asteroid
    if (JSON.stringify(currentGrid) == this.stringSolution) {
      console.log("nongram is correct!");

      // fill screen to be green
      ctx.beginPath();
      ctx.rect(0, 0, 1000, 600);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();
      // maybe add countdown animation and confetti?

      // Wait for 5 seconds before redirecting to index.html
      setTimeout(function () {
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
          const x = i * 30 + startX + 100;
          const y = j * 30 + startY + 5;
          ctx.fillText(this.clues.cols[i][j], x, y);
        }
      }
    }

    // draw rowClues
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.clues.rows[i][j] !== 0) {
          const x = j * 30 + startX + 10;
          const y = i * 30 + startY + 97; // Adjust y-coordinate for row clues
          ctx.fillText(this.clues.rows[i][j], x, y);
        }
      }
    }
  }
}

class Asteroid {
  constructor(x, y, size, speed, direction, angle, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.direction = direction;
    this.angle = angle;
    this.image = image; // Load the image

    // start at x y and go to 500,300
    this.vx = this.speed * Math.cos(angle);
    this.vy = this.speed * Math.sin(angle);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  // this is wrong - they only move in one direction for now - they need to move toward the center?
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  check() {
    // depending on this.direction add padding
    let checkXMin = (this.direction == "right") ?  gridBorderStartX - asteroidSize : gridBorderStartX; 
    let checkYMin = (this.direction == "down") ?  gridBorderStartY - asteroidSize : gridBorderStartY; 

    if (
      this.x  >= checkXMin &&
      this.x <= gridBorderEndX &&
      this.y >= checkYMin &&
      this.y <= gridBorderEndY
    ) {
      // asteroid hit the center

      // Remove the asteroid from the asteroids array
      const index = asteroids.indexOf(this);
      if (index !== -1) {
        asteroids.splice(index, 1);
      }

      loseLife();
      console.log("Asteroid Hit at ("+ this.x + ", " + this.y + ") .Lose Life");
      return;
    }
    this.draw();
  }

  click(){
    if (mouseX >= this.x && mouseX <= this.x + asteroidSize && mouseY >= this.y && mouseY <= this.y + asteroidSize) {
      // Asteroid was clicked
      // Remove the asteroid from the asteroids array
      const index = asteroids.indexOf(this);
      if (index !== -1) {
        asteroids.splice(index, 1);
      }
      console.log("Asteroid clicked at (" + this.x + ", " + this.y + ")");
    }
  }
}

function drawAsteroids() {
  // clear the old asteroids
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";

  ctx.rect(0, 0, 1000, gridBorderStartY);
  ctx.rect(0,0, gridBorderStartX, 600);
  ctx.rect(gridBorderEndX, 0, 1000, 600);
  ctx.rect(0, gridBorderEndY, 1000, 1000);
  ctx.fill();
  ctx.stroke();

  if(size == 5){drawEasy();}
  if(size == 7){drawMedium();}
  if(size == 10){drawHard();}

  asteroids.forEach((asteroid) => {
    asteroid.move();
    asteroid.check();
  });
}

// to generate a new asteroid
function generateAsteroids() {
  const edge = Math.floor(Math.random() * 4); // Randomly select one of the four edges
  let x, y, direction;
  switch (edge) {
    case 0: // Top edge
      x = Math.floor(Math.random() * canvas.width);
      y = 0;
      direction = "down";
      break;
    case 1: // Right edge
      x = canvas.width;
      y = Math.floor(Math.random() * canvas.height);
      direction = "left";
      break;
    case 2: // Bottom edge
      x = Math.floor(Math.random() * canvas.width);
      y = canvas.height;
      direction = "up";
      break;
    case 3: // Left edge
      x = 0;
      y = Math.floor(Math.random() * canvas.height);
      direction = "right";
      break;
  }

  // Calculate the angle between (x, y) and (500, 300)
  let angle = Math.atan2(300 - y, 500 - x);

  const image = Math.random() > 0.5 ? asteroidImage1 : asteroidImage2; // Randomly select an image
  const asteroid = new Asteroid(x, y, asteroidSize, speed, direction, angle, image);

  asteroids.push(asteroid);
  console.log(
    "asteroid pushed at " + x + " , " + y + " with direction " + direction + " angle: "+ angle);
  drawAsteroids();
}

function preLoad() {
  asteroidImage1.src = "/images/asteroid1.png";
  asteroidImage2.src = "/images/asteroid2.png";
}

$(() => {
  // Extract difficulty level from URL
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get("difficulty");

  preLoad();

  // fill canvas
  ctx.rect(0, 0, 1000, 600);
  ctx.fillStyle = "black";
  ctx.fill();

  switch (difficulty) {
    case "easy":
      speed = 3; // set speed of asteroids
      drawEasy(); // Call the appropriate drawing function based on difficulty level
      size = 5; // set size of grid
      asteroidSize = 50; // Set the initial size of each asteroid
      lives = 5;

      setInterval(generateAsteroids, 7000); // Generate asteroids every 7 seconds

      gridBorderStartX = 380;
      gridBorderEndX = 620;
      gridBorderStartY = 180;
      gridBorderEndY = 420;

      // randomly select a puzzle
      randomIndex = Math.floor(Math.random() * easyGrids.length);
      selectedGrid = easyGrids[randomIndex];
      inner = selectedGrid.inner;
      clue = selectedGrid.clue;

      // set current grid and draw clues
      grid = new Grid(inner, clue);
      grid.drawClues();

      startGridX = 470;
      endGridX = 620;
      startGridY = 270;
      endGridY = 420;

      currentGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.log("Easy ", randomIndex + 1);
      break;
    case "medium":
      drawMedium();
      size = 7;
      speed = 5;
      asteroidSize = 40;
      lives = 4;
      
      // every 3 seconds make a new asteroid
      setInterval(generateAsteroids, 5000); // Generate asteroids every 3 seconds
      
      gridBorderStartX = 350;
      gridBorderEndX = 650;
      gridBorderStartY = 150;
      gridBorderEndY = 450;

      randomIndex = Math.floor(Math.random() * mediumGrids.length);
      selectedGrid = mediumGrids[randomIndex];
      inner = selectedGrid.inner;
      clue = selectedGrid.clue;

      grid = new Grid(inner, clue);
      grid.drawClues();

      startGridX = 440;
      endGridX = 650;
      startGridY = 240;
      endGridY = 450;

      currentGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.log("Medium ", randomIndex + 1);
      break;
    case "hard":
      drawHard();
      size = 10;
      speed = 10;
      asteroidSize = 30;
      lives = 3;

      // every 2 seconds make a new asteroid  -will change for difficulty
      setInterval(generateAsteroids, 3000); // Generate asteroids every 2 seconds

      gridBorderStartX = 305;
      gridBorderEndX = 695;
      gridBorderStartY = 105;
      gridBorderEndY = 495

      randomIndex = Math.floor(Math.random() * hardGrids.length);
      selectedGrid = hardGrids[randomIndex];
      inner = selectedGrid.inner;
      clue = selectedGrid.clue;

      grid = new Grid(inner, clue);
      grid.drawClues();
    
      startGridX = 395;
      endGridX = 695;
      startGridY = 195;
      endGridY = 495;

      currentGrid = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ];
      console.log("Hard ", randomIndex + 1);
      break;
    default:
      // Handle invalid difficulty level or default to easy
      drawEasy();
  }
    // Update the menu bar <h2> to display the new lives count
    livesText = document.getElementById("lives");
    livesText.innerText = "Lives: " + lives;
});

// for easy we need to start at (380,180)
function drawEasy() {
  ctx.strokeStyle = "#DCD0FF"; // lilac grid lines

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

  for (let x = 470; x < 620; x += 30) {
    // x: 380 + 90, end at 380 + 240
    ctx.moveTo(x, 270); // y: 180 + 90
    ctx.lineTo(x, 420); // y: 180 + 240
  }

  for (let y = 270; y < 420; y += 30) {
    // y: 180 + 90, end at 180 + 240
    ctx.moveTo(470, y); // x: 380 + 90
    ctx.lineTo(620, y); // x: 380 + 240
  }

  ctx.stroke();
}

// for medium we need to start at (350, 150)
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

  for (let x = 440; x < 650; x += 30) {
    // x: 350 + 90, end at 350 + 300
    ctx.moveTo(x, 240); // y: 150 + 90
    ctx.lineTo(x, 450); // y: 150 + 300
  }

  for (let y = 240; y < 450; y += 30) {
    // y: 150 + 90, end at 150 + 300
    ctx.moveTo(440, y); // x: 350 + 90
    ctx.lineTo(650, y); // x: 350 + 300
  }

  ctx.stroke();
}

// for hard we need to start at (305, 105)
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

  for (let x = 395; x < 695; x += 30) {
    // x: 305 + 90, end at 305 + 390
    ctx.moveTo(x, 195); // y: 105 + 90
    ctx.lineTo(x, 495); // y: 105 + 390
  }

  for (let y = 195; y < 495; y += 30) {
    // y: 105 + 90, end at 105 + 390
    ctx.moveTo(395, y); // x: 305 + 90
    ctx.lineTo(695, y); // x: 305 + 390
  }

  ctx.stroke();
}

canvas.oncontextmenu = function (e) {
  e.preventDefault();
};

$("#gameCanvas").mousedown((e) => {
  getMousePos(e);
  if (mouseX > startGridX && mouseX < endGridX && mouseY > startGridY && mouseY < endGridY) { // over the grid
    let selectedCol = Math.floor((mouseX - startGridX) / 30);
    let selectedRow = Math.floor((mouseY - startGridY) / 30);
    if (e.which == 1) {
      // left click - set block to white
      if (currentGrid[(selectedCol % size) + selectedRow * size] == 1) {
        currentGrid[(selectedCol % size) + selectedRow * size] = 0;
        drawSquare(selectedRow, selectedCol, "black");
      } else {
        currentGrid[(selectedCol % size) + selectedRow * size] = 1;
        drawSquare(selectedRow, selectedCol, "white");
      }
    } else if (e.which == 3) {
      // right click - set block to purple
      if (currentGrid[(selectedCol % size) + selectedRow * size] == 2) {
        currentGrid[(selectedCol % size) + selectedRow * size] = 0;
        drawSquare(selectedRow, selectedCol, "black");
      } else {
        currentGrid[(selectedCol % size) + selectedRow * size] = 2;
        drawSquare(selectedRow, selectedCol, "purple");
      }
    }
    console.log(currentGrid);
    console.log(grid.solution);
    grid.checkGrid();
  }
  
  // NOT OVER THE GRID - check if click asteroid
  asteroids.forEach((asteroid) => {
    asteroid.click();
  });
});

// to fill in a square on the grid
function drawSquare(row, col, color) {
  ctx.beginPath();
  ctx.rect(startGridX + col * 30, startGridY + row * 30, 30, 30);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

// to get position of the mouse on the canvas
function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

function loseLife() {
  lives--; // Decrease the lives count

  // Update the menu bar <h2> to display the new lives count
  livesText = document.getElementById("lives");
  livesText.innerText = "Lives: " + lives;

  // If lives reach 0, change the screen to red and return home after 5 seconds
  if (lives === 0) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fill();

    asteroids = []; // clear the asteroids from array so they dont keep drawing and moving

    setTimeout(() => {
      window.location.href = "index.html"; // Redirect to index.html after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}
