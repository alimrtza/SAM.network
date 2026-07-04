const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')
cv_w = canvas.clientWidth
cv_h = canvas.clientHeight

let score = 0;
let dif_score = 3;
let fpsSpeed = 5;
var snakeBody = new Array();

//GAME LOOP
function drawGame(){
    clearScreen();
    apple.draw();
    player.draw("blue");
    Snake();
    collide();
    drawScore();
    difficulty();    
    setTimeout(drawGame, 1000/fpsSpeed);
}
function clearScreen() {
    ctx.fillStyle = "black" 
    ctx.fillRect(0, 0, cv_w, cv_h)
}

//SNAKE
class snakePart {
    constructor(headX, headY, velocityX, velocityY) {
        this.tileCount = 20;
        this.tileSize = cv_w / this.tileCount - 2;
        this.headX = headX
        this.headY = headY
        this.velocityX = velocityX
        this.velocityY = velocityY
    }
    draw(colour) {
        this.headX = this.headX + this.velocityX
        this.headY = this.headY + this.velocityY
        ctx.fillStyle = colour
        ctx.fillRect(this.headX * this.tileCount, this.headY * this.tileCount, this.tileSize, this.tileSize)
    }
}
//NEW PLAYER
const player = new snakePart(Math.floor(Math.random() * 20) , Math.floor(Math.random() * 20) , 0, 0);

snakeBody.push(new snakePart(player.headX, player.headY, 0, 0))
function Snake() {
    if (ateApple()) {
        snakeBody.push(new snakePart(player.headX, player.headY, 0, 0))
    }
    let prevX = player.headX;
    let prevY = player.headY;
    for (let i = 0; i < snakeBody.length; i++) {
        // Save the current position of this body part
        let tempX = snakeBody[i].headX;
        let tempY = snakeBody[i].headY;

        // Update this body part to the previous position
        snakeBody[i].headX = prevX;
        snakeBody[i].headY = prevY;

        // Move to the next body part
        prevX = tempX;
        prevY = tempY;
        // snakeBody[i].velocityX = player.velocityX
        // snakeBody[i].velocityY = player.velocityY
        snakeBody[i].draw("green")
    }
}
//MOVEMENT
addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp" :
            if (player.velocityY != 1) {
                player.velocityX = 0;
                player.velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (player.velocityY != -1) {
                player.velocityX = 0;
                player.velocityY = 1;
            }
            break;
        case 'ArrowRight':
            if (player.velocityX != -1) {
                player.velocityX = 1;
                player.velocityY = 0;
            }
            break;
        case 'ArrowLeft':
            if (player.velocityX != 1) {
                player.velocityX = -1;
                player.velocityY = 0;
            }
            break;
        default:
            break;
    }

    event.preventDefault();
}, {
    capture: true,
    passive: false
});

//FOOD
class Food {
    constructor(x, y) {
        this.tileCount = 20;
        this.tileSize = cv_w / this.tileCount - 2;
        this.x = x
        this.y = y
    }
    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x * this.tileCount, this.y * this.tileCount, this.tileSize, this.tileSize)
    }
}
//NEW FOOD
const apple = new Food(Math.floor(Math.random() * 20) , Math.floor(Math.random() * 20));


//COLLIDE
function collide() {
    if (ateApple()) {
        apple.x = Math.floor(Math.random() * apple.tileCount);
        apple.y = Math.floor(Math.random() * apple.tileCount);
        score++;
    } 
    else if (boundry()) {
        reset()
    }
    for (let i = 1; i < snakeBody.length; i++) {
        if (sucide(i)) {
            reset()
        }
    }
}
function reset() {
    player.headX = Math.floor(Math.random() * player.tileCount);
    player.headY = Math.floor(Math.random() * player.tileCount);
    apple.x = Math.floor(Math.random() * apple.tileCount);
    apple.y = Math.floor(Math.random() * apple.tileCount);
    player.velocityX = 0;
    player.velocityY = 0;
    score = 0;
    fpsSpeed = 5;
    ctx.fillStyle = "red" 
    ctx.fillRect(0, 0, cv_w, cv_h);
    snakeBody = [];
    snakeBody.push(new snakePart(player.headX, player.headY, 0, 0));
}
function sucide(i) { 
    if (player.headX === snakeBody[i].headX && player.headY === snakeBody[i].headY) {
        return true 
    }
    else{
        return false
    }
}
function ateApple() {
    if (player.headX === apple.x && player.headY === apple.y) {
        return true 
    }
    else {
        return false
    }
}
function boundry() { 
    if (player.headX === -1 || player.headY === -1 || player.headX >= cv_w / player.tileCount || player.headY >= cv_h / player.tileCount) {
        return true 
    }
    else {
        return false
    }
}

//SCORE
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, (cv_w) - 70 , 20); // Display the score on the canvas
}
function difficulty() {
    if (score > dif_score) {
        fpsSpeed += 0.05; 
        dif_score += 1;
    }
}
//=========//
drawGame();