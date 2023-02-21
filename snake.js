var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var snake = {
  x: 10,
  y: 10,
  dx: 10,
  dy: 0,
  cells: []
};

var cellSize = 10;
var food = {};
var score = 0;

function createFood() {
  food.x = Math.floor(Math.random() * canvas.width / cellSize) * cellSize;
  food.y = Math.floor(Math.random() * canvas.height / cellSize) * cellSize;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw snake
  ctx.fillStyle = "green";
  snake.cells.forEach(function(cell, index) {
    ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
  });

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, cellSize, cellSize);

  // move snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap snake around edges
  if (snake.x < 0) {
    snake.x = canvas.width - cellSize;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  } else if (snake.y < 0) {
    snake.y = canvas.height - cellSize;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // add new cell if snake eats food
  if (snake.x === food.x && snake.y === food.y) {
    score++;
    createFood();
    snake.cells.push({ x: snake.x, y: snake.y });
  }

  // remove last cell if snake is too long
  while (snake.cells.length > score) {
    snake.cells.shift();
  }

  // check for collisions
  snake.cells.forEach(function(cell, index) {
    if (index !== snake.cells.length - 1 && cell.x === snake.x && cell.y === snake.y) {
      alert("Game over!");
      location.reload();
    }
  });

  // add new head to snake
  snake.cells.push({ x: snake.x, y: snake.y });
}

// set up arrow controls for mobile devices
var upButton = document.getElementById("upButton");
var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");
var downButton = document.getElementById("downButton");

upButton.addEventListener("click", function() {
  snake.dx = 0;
  snake.dy = -cellSize;
});

leftButton.addEventListener("click", function() {
  snake.dx = -cellSize;
  snake.dy = 0;
});

rightButton.addEventListener("click", function() {
  snake.dx = cellSize;
  snake.dy = 0;
});

downButton.addEventListener("click", function() {
  snake.dx = 0;
  snake.dy = cellSize;
});

// create initial food and start game loop
createFood();
setInterval(draw, 100);