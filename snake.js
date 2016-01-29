document.addEventListener('DOMContentLoaded', function() {
    game = new Game();
});

window.addEventListener('keydown', function(key) {
    key.preventDefault();
        if (key.which == '37')
            game.snake.direction = 'left';
        else if (key.which == '39')
            game.snake.direction = 'right';
        else if (key.which == '38')
            game.snake.direction = 'up';
        else if (key.which == '40')
            game.snake.direction = 'down';
});


function drawBorder(color, score) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0,0, canvas.width, canvas.height);
    context.font = "30px Arial";
    context.fillText(score, 0, 30);
    context.strokeStyle = color;
    context.strokeRect(0,0, canvas.width, canvas.height);
};


function Game() {
    var self = this;
        self.snake = new Snake();
        self.food = createFood();
        self.score = 0;
        self.speed = 120;
        var interval = function() {
            drawBorder('black', self.score);
            updateSnake(self.snake);
            drawSnake(self.snake);
            drawFood(self.food);
            checkCollision(self.snake, self.food);
            setTimeout(function() {
                requestAnimationFrame(interval);
            }, self.speed);
        };
    interval();
};


function drawSnake(snake) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var pixelSize = canvas.width / 50;
        for (var i = 0; i < snake.snakeArray.length; i++) {
            context.fillStyle = 'green';
            context.fillRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
            context.strokeStyle = 'white';
            context.strokeRect(snake.snakeArray[i].x * pixelSize, snake.snakeArray[i].y * pixelSize, pixelSize, pixelSize);
        };
};

var Snake = function() {
    var self = this;
    self.direction = 'right';
    self.snakeArray = [];
    self.length = 8;
    for (var i = self.length; i >= 0; i--) {
        self.snakeArray.push({x: i, y:0});
    };
};

function updateSnake(snake) {
    var noseX = snake.snakeArray[0].x;
    var noseY = snake.snakeArray[0].y;
    if(snake.direction === 'right') noseX++;
        else if (snake.direction === 'left') noseX--;
        else if (snake.direction === 'up') noseY--;
        else if (snake.direction === 'down') noseY++;

    var tail = snake.snakeArray.pop();
    tail.x = noseX;
    tail.y = noseY;
    snake.snakeArray.unshift(tail);

};


function createFood() {
    var pixelSize = canvas.width / 50;
    return food = {
        x: Math.round(Math.random()*(canvas.width - pixelSize)/pixelSize),
        y: Math.round(Math.random()*(canvas.height - pixelSize)/pixelSize)
    };
};

function drawFood(food) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var pixelSize = canvas.width / 50;
        context.fillStyle = 'brown';
        context.fillRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
        context.strokeStyle = 'white';
        context.strokeRect(food.x * pixelSize, food.y * pixelSize, pixelSize, pixelSize);
};

function checkCollision(snake, food) {
    var canvas = document.getElementById('canvas');
    var pixelSize = canvas.width / 50;
    // if we hit the food
    if(snake.snakeArray[0].x === food.x && snake.snakeArray[0].y === food.y) {
        game.food = createFood();
        game.score++;
        if(game.speed > 30) {
            game.speed = game.speed - 15;
        };
        var tail = {};
        tail.x = game.snake.snakeArray[0].x;
        tail.y = game.snake.snakeArray[0].y;
        snake.snakeArray.unshift(tail);
    };
    // off the map left
    if(snake.snakeArray[0].x < 0) {
        location.reload();
    }
    // off the map up
    if(snake.snakeArray[0].y < 0){
        location.reload();
    }
    // off the map down
    if (snake.snakeArray[0].y + 1 > 600/pixelSize){
        location.reload();
    }
    // off the map right
    if (snake.snakeArray[0].x + 1 > 600/pixelSize){
        location.reload();
    }
    // if we hit own snake body
    for(var i = 2; i < snake.snakeArray.length; i++){
      if(snake.snakeArray[i].x == snake.snakeArray[0].x && snake.snakeArray[i].y == snake.snakeArray[0].y){
        location.reload();
      };
    };
};







