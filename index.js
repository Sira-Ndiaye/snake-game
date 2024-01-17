let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
const img = document.getElementById("apple");

const grid = 16;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let start = false;
let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

let apple = {
  x: 352,
  y: 352,
};

setInterval(()=>{
  if(start){
     ctx.clearRect(0,0,canvasWidth,canvasHeight);

  snake.x += snake.dx;
  snake.y += snake.dy;
  
  if(snake.x >= 400){
    snake.x = 0
  }else if(snake.x < 0){
    snake.x = 400
  }
  
  if(snake.y >= 400){
    snake.y = 0
  }else if(snake.y < 0){
    snake.y = 400
  }
  
  snakeEatApple();
  
  snake.cells.unshift({x: snake.x, y: snake.y});
  
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  
  drawApple();
  drawSnake();
  
  checkUpCollision();
  }
},50)


function generateRandomNb(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawApple(){
  ctx.drawImage(img, apple.x, apple.y, grid, grid);
}

function drawSnake(){
  ctx.fillStyle="red";
  snake.cells.forEach((cell,i)=>{
    ctx.fillRect(cell.x, cell.y, grid, grid);      
  });
}

function snakeEatApple(){
  if(snake.x === apple.x && snake.y === apple.y){
    snake.maxCells++;
    apple.x = generateRandomNb(0, 25) * 16;
    apple.y = generateRandomNb(0, 25) * 16;
  }
}

function checkUpCollision(){  
  snake.cells.forEach((cell,index)=>{
    for (var i = index + 1; i < snake.cells.length; i++){ 
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        restart();
      }
    }
  });
}

function up (){
  snake.dy = -grid;
  snake.dx = 0;
}

function down (){
  snake.dy = grid;
  snake.dx = 0;
}

function left (){
  snake.dx = -grid;
  snake.dy = 0;
}

function right (){
  snake.dx = grid;
  snake.dy = 0;
}

document.addEventListener('keydown', (event) => {
  if (event.which === 38 && snake.dy === 0) up();
  else if (event.which === 40 && snake.dy === 0) down();
  else if (event.which === 37 && snake.dx === 0) left();
  else if (event.which === 39 && snake.dx === 0) right();
});

function startGame () {
  start= true;
}

function stopGame () {
  start= false;
}

function restart(){
  start= false;
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  apple.x = generateRandomNb(0, 25) * grid;
  apple.y = generateRandomNb(0, 25) * grid;
}