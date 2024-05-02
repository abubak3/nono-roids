const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/**
 * Nonogram Grid Keys
 */

// 0 = empty; 1 = yes; 2 = no

/**
 * Globals!
 */
let lives; // player lives: 5 for easy, 4 for medium, 3 for hard
let currentGrid; // current player grid
let grid, size; // grid object and size of grid
let asteroidSize; // asteroid size: 50 for easy, 40 for medium, 30 for hard
let count = 4; // for the countdown for win/lose

let asteroidInterval; // generating asteroid interval

// mouse positions
let mouseX, mouseY;
let startGridX, endGridX, startGridY, endGridY;

// grid borders
let gridBorderStartX,gridBorderEndX, gridBorderStartY, gridBorderEndY;

let asteroids = []; // array for asteroids currently in game
let speed; // speed of asteroids in general: 3 for easy, 5 for medium, 10 for hard

// const image objects for our images
const asteroidImage1 = new Image();
const asteroidImage2 = new Image();
const explosion = new Image();

// HARD CODED GRIDS AND SOLUTIONS
let innerEasy1 = [2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1];
let clueEasy1 = {
  rows: [[0, 0, 3],[0, 0, 1],[0, 1, 2],[0, 1, 2],[0, 0, 4]],
  cols: [[0, 0, 1],[1, 1, 1],[0, 1, 2],[0, 1, 3],[0, 2, 1]],
};

let innerEasy2 = [1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1];
let clueEasy2 = {
  rows: [[0, 2, 1],[0, 0, 3],[0, 1, 1],[0, 0, 4],[0, 0, 3]],
  cols: [[0, 0, 2],[0, 2, 1],[0, 0, 4],[0, 1, 2],[0, 0, 3]],
};

let innerEasy3 = [2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2];
let clueEasy3 = {
  rows: [[0, 1, 1],[0, 3, 1],[0, 1, 1],[0, 1, 1],[0, 0, 3]],
  cols: [[0, 2, 1],[0, 2, 1],[0, 0, 4],[0, 0, 1],[0, 1, 1]],
};

let innerEasy4 = [1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1];
let clueEasy4 = {
  rows: [[0, 1, 1],[0, 1, 1],[0, 0, 4],[0, 1, 3],[0, 1, 2]],
  cols: [[0, 2, 1],[0, 1, 1],[0, 1, 2],[0, 0, 3],[0, 0, 4]],
};

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

let innerMedium1 = [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1,1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1];
let clueMedium1 = {
  rows: [[0, 2, 4],[0, 2, 2],[0, 2, 1],[0, 1, 4],[1, 2, 1],[1, 1, 2],[0, 2, 4]],
  cols: [[1, 2, 1],[0, 3, 3],[0, 1, 1],[0, 1, 4],[2, 2, 1],[2, 1, 2],[1, 1, 3]],
};

let innerMedium2 = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1];
let clueMedium2 = {
  rows: [[0, 1, 5],[0, 3, 3],[0, 1, 2],[1, 3, 1],[0, 0, 6],[0, 3, 1],[0, 4, 1]],
  cols: [[0, 2, 4],[0, 1, 3],[0, 2, 4],[1, 3, 1],[0, 2, 2],[0, 3, 2],[0, 4, 1]],
};

let innerMedium3 = [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1];
let clueMedium3 = {
  rows: [[0, 4, 2],[0, 3, 3],[0, 1, 2],[0, 5, 1],[0, 1, 1],[0, 0, 5],[0, 2, 2]],
  cols: [[0, 2, 3],[0, 4, 2],[2, 1, 2],[0, 1, 4],[0, 3, 1],[0, 2, 1],[2, 1, 1]],
};

let innerMedium4 = [2, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1];
let clueMedium4 = {
  rows: [[0, 0, 3],[1, 1, 1],[0, 2, 1],[0, 2, 4],[0, 1, 3],[0, 2, 1],[2, 2, 1]],
  cols: [[1, 1, 2],[0, 2, 2],[0, 3, 1],[1, 1, 1],[0, 1, 4],[0, 0, 2],[0, 4, 1]],
};

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

let innerHard1 = [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1];
let clueHard1 = {
  rows: [[0, 0, 4],[0, 3, 2],[1, 3, 2],[1, 4, 2],[1, 2, 2],[0, 3, 2],[0, 6, 1],[0, 0, 1],[0, 6, 1],[0, 2, 5]],
  cols: [[4, 1, 2],[1, 1, 2],[1, 1, 1],[2, 2, 1],[0, 5, 1],[0, 5, 2],[1, 1, 1],[0, 1, 3],[0, 7, 1],[0, 6, 1]],
};

let innerHard2 = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 1];
let clueHard2 = {
  rows: [[0, 0, 2],[0, 5, 3],[0, 3, 4],[0, 0, 5],[0, 1, 5],[0, 1, 6],[0, 0, 4],[0, 5, 3],[0, 1, 5],[2, 2, 1]],
  cols: [[2, 1, 2],[0, 3, 2],[0, 2, 5],[2, 2, 1],[1, 1, 1],[0, 4, 2],[0, 4, 3],[0, 5, 2],[0, 5, 2],[1, 3, 2]],
};

let innerHard3 = [2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2];
let clueHard3 = {
  rows: [[0, 0, 2],[0, 4, 1],[0, 1, 2],[0, 3, 3],[0, 1, 3],[0, 1, 4],[0, 2, 5],[1, 1, 1],[3, 1, 3],[0, 3, 2]],
  cols: [[1, 4, 1],[1, 1, 2],[0, 1, 2],[0, 1, 2],[0, 0, 1],[2, 1, 1],[0, 2, 2],[2, 4, 2],[1, 4, 2],[0, 1, 6]],
};

let innerHard4 = [2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2];
let clueHard4 = {
  rows: [[0, 4, 2],[1, 2, 2],[0, 2, 4],[0, 2, 3],[0, 3, 1],[0, 1, 2],[0, 0, 2],[0, 0, 4],[0, 6, 1],[0, 0, 2]],
  cols: [[2, 1, 2],[1, 1, 2],[0, 2, 1],[1, 1, 1],[1, 2, 1],[0, 2, 3],[4, 1, 1],[0, 4, 1],[0, 4, 2],[0, 0, 3]],
};

let innerHard5 = [2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2];
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

// class for Grid Object
class Grid {
  constructor(solution, clues) {
    this.solution = solution;
    this.clues = clues;
    this.stringSolution = JSON.stringify(solution);
  }

  // check whether current grid = solution grid
  checkGrid() {
    // need to fix based on asteroid
    if (JSON.stringify(currentGrid) == this.stringSolution) {
      console.log("Nongram is correct! Win Game");

      asteroids = []; // clear asteroid array
      clearInterval(asteroidInterval); // set interval to be 0

      // fill screen to be green
      ctx.beginPath();
      ctx.rect(0, 0, 1000, 600);
      ctx.fillStyle = "green";
      ctx.fill();

      // display you win
      ctx.font = "80px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("You Win", canvas.width / 2, canvas.height / 2 - 50);

      // Start countdown from 3
      setTimeout(countdown, 2000); // Call countdown after 2 second
    }
  }

  // to draw in the grid clues
  drawClues() {
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // draw colClues
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.clues.cols[i][j] !== 0) {
          const x = i * 30 + gridBorderStartX + 100;
          const y = j * 30 + gridBorderStartY + 5;
          ctx.fillText(this.clues.cols[i][j], x, y);
        }
      }
    }

    // draw rowClues
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.clues.rows[i][j] !== 0) {
          const x = j * 30 + gridBorderStartX + 10;
          const y = i * 30 + gridBorderStartY + 97; // Adjust y-coordinate for row clues
          ctx.fillText(this.clues.rows[i][j], x, y);
        }
      }
    }
  }
}

// class for asteroid object
class Asteroid {
  constructor(x, y, speed, direction, angle, image) {
    this.x = x; // current x location on canvas
    this.y = y; // current y location on canvas
    this.speed = speed; // general speed - will affect vx and vy
    this.direction = direction; // for the general direction
    this.angle = angle; // for the exact angle
    this.image = image; // Load the image

    this.vx = this.speed * Math.cos(angle);
    this.vy = this.speed * Math.sin(angle);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, asteroidSize, asteroidSize); // draw asteroid on canvas
  }

  move() {
    this.x = this.x + this.vx; // update location based on vx and vy
    this.y = this.y + this.vy;
  }

  check() {
    // depending on this.direction add padding
    let checkXMin = (this.direction == "right") ?  gridBorderStartX - asteroidSize : gridBorderStartX; 
    let checkYMin = (this.direction == "down") ?  gridBorderStartY - asteroidSize : gridBorderStartY; 

    // if asteroid is going to hit the grid
    if (
      this.x  >= checkXMin &&
      this.x <= gridBorderEndX &&
      this.y >= checkYMin &&
      this.y <= gridBorderEndY
    ) {
      // Remove the asteroid from the asteroids array
      const index = asteroids.indexOf(this);
      if (index !== -1) {
        asteroids.splice(index, 1);
      }

      // lose a life
      loseLife();
      console.log("Asteroid Hit at ("+ this.x + ", " + this.y + ") . Lose Life");
      return;
    }
    // draw the asteroid
    this.draw();
  }

  // check if we clicked on an asteroid
  click(){
    if (mouseX >= this.x && mouseX <= this.x + asteroidSize && mouseY >= this.y && mouseY <= this.y + asteroidSize) {
      // Asteroid was clicked
      document.body.classList.add("flash");
      setTimeout(function() {
          document.body.classList.remove("flash");
      }, 500); // 500 milliseconds = 0.5 seconds

      // Remove the asteroid from the asteroids array
      const index = asteroids.indexOf(this);
      if (index !== -1) {
        asteroids.splice(index, 1);
      }
      
      // draw an explosion over where asteroid was
      ctx.drawImage(explosion, this.x, this.y, asteroidSize, asteroidSize);
      console.log("Asteroid clicked at (" + this.x + ", " + this.y + ")");
    }
  }
}

// draw all the asteroids
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

  // redraw the borders of the grid
  if(size == 5){drawEasy();}
  if(size == 7){drawMedium();}
  if(size == 10){drawHard();}

  // for each asteroid, we move and then check and then maybe draw
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
  const asteroid = new Asteroid(x, y, speed, direction, angle, image); // create asteroid object

  asteroids.push(asteroid); // push to array
  console.log(
    "asteroid pushed at " + x + " , " + y + " with direction " + direction + " angle: "+ angle);
  drawAsteroids();
}

// to preload the images
function preLoad() {
  asteroidImage1.src = "/images/asteroid1.png";
  asteroidImage2.src = "/images/asteroid2.png";
  explosion.src = "/images/explosion.png";
}

// to draw the countdown
function drawCountdown(count) {
  ctx.rect(0, 0, 1000, 600);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.stroke();

  ctx.font = "80px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(count, canvas.width / 2, canvas.height / 2);
}

// to do the countdown to home screen
function countdown() {
  count--;
  drawCountdown(count);
  if (count > 1) {
    setTimeout(countdown, 1000); // Call countdown again after 1 second
  } else {
    // Redirect to index.html after countdown completes
    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);
  }
}

// on window load
$(() => {
  // Extract difficulty level from URL
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get("difficulty");

  preLoad(); // preload images

  // fill canvas
  ctx.rect(0, 0, 1000, 600);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();

  switch (difficulty) {
    case "easy":
      speed = 3; // set speed of asteroids
      drawEasy(); // Call the appropriate drawing function based on difficulty level
      size = 5; // set size of grid
      asteroidSize = 50; // Set the initial size of each asteroid
      lives = 5; // set lives

      asteroidInterval = setInterval(generateAsteroids, 5000); // Generate asteroids every 5 seconds

      // set the grid border coordinates
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

      // set the inside of grid coordinates
      startGridX = 470;
      endGridX = 620;
      startGridY = 270;
      endGridY = 420;

      currentGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.log("Level: Easy ", randomIndex + 1); // log which level
      break;

    case "medium":
      drawMedium();
      size = 7;
      speed = 5;
      asteroidSize = 40;
      lives = 4;
      
      asteroidInterval = setInterval(generateAsteroids, 4000); // Generate asteroids every 4 seconds
      
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
      console.log("Level: Medium ", randomIndex + 1);
      break;

    case "hard":
      drawHard();
      size = 10;
      speed = 10;
      asteroidSize = 30;
      lives = 3;

      asteroidInterval = setInterval(generateAsteroids, 2000); // Generate asteroids every 2 seconds

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
      console.log("Level: Hard ", randomIndex + 1);
      break;
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

// when we mousedown - over the grid or not over the grid
$("#gameCanvas").mousedown((e) => {
  getMousePos(e);
  if (mouseX > startGridX && mouseX < endGridX && mouseY > startGridY && mouseY < endGridY) { // over the grid
    let selectedCol = Math.floor((mouseX - startGridX) / 30); // find selected column
    let selectedRow = Math.floor((mouseY - startGridY) / 30); // find selected row
    if (e.which == 1) {
      // left click - set block to white
      if (currentGrid[(selectedCol % size) + selectedRow * size] == 1) { // if its already white set to black
        currentGrid[(selectedCol % size) + selectedRow * size] = 0;
        drawSquare(selectedRow, selectedCol, "black");
      } else {
        currentGrid[(selectedCol % size) + selectedRow * size] = 1;
        drawSquare(selectedRow, selectedCol, "white");
      }
    } else if (e.which == 3) {
      // right click - set block to purple
      if (currentGrid[(selectedCol % size) + selectedRow * size] == 2) { // if its already purple set to black
        currentGrid[(selectedCol % size) + selectedRow * size] = 0;
        drawSquare(selectedRow, selectedCol, "black");
      } else {
        currentGrid[(selectedCol % size) + selectedRow * size] = 2;
        drawSquare(selectedRow, selectedCol, "purple");
      }
    }
    // console.log(currentGrid);
    // console.log(grid.solution);
    grid.checkGrid(); // check if solved
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

// when we lose a life
function loseLife() {
  lives--; // Decrease the lives count

  // Update the menu bar <h2> to display the new lives count
  livesText = document.getElementById("lives");
  livesText.innerText = "Lives: " + lives;

  // If lives reach 0, change the screen to red and return home after 5 seconds
  if (lives === 0) {
    // stop generating - clear the asteroids
    asteroids = [];
    clearInterval(asteroidInterval);

    // fill screen to be red
    ctx.beginPath();
    ctx.rect(0, 0, 1000, 600);
    ctx.fillStyle = "red";
    ctx.fill();

    // display you lose
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You Lose", canvas.width / 2, canvas.height / 2 - 50);

    // Start countdown from 3
    setTimeout(countdown, 2000); // Call countdown after 2 second
  }
}
