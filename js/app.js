var canvas = document.getElementById("pong");
     var cxt = canvas.getContext("2d");
var  paddleLeft = new Paddle(0,150,15,85);
var  paddleRight = new Paddle(canvas.width - paddleLeft.width, 150, 15,85);
var speedMoveBall = 6;  
var ball = new Ball(200,10,speedMoveBall,-speedMoveBall,10);
    var speedPaddle = randomIntFromInterval(1,10);
var speedMovePaddle = 5.4;  
var malusAI =23 - randomIntFromInterval(0,12);
var speedMovePaddleAI = speedMovePaddle;  



var scoreP1 = 0;
var scoreP2 = 0;


function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});
Paddle.prototype.draw = function(d) {
d.beginPath();
        d.rect(this.x, this.y, this.width, this.height);
        d.fillStyle = "orange";
        d.fill();
        d.closePath();
}
Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.y < 0) { 
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > canvas.height) { 
        this.y = canvas.height - this.height;
        this.y_speed = 0;
    }
}
Paddle.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 87) { 
            this.move(0, -speedMovePaddle);
        } else if (value == 83) {
            this.move(0, speedMovePaddle);
        } else {
            this.move(0, 0);
        }
    }
};

function Ball(x, y, dx, dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
}
Ball.prototype.draw = function(c) {
c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
}
function checkCollision() {
/*
    if(ball.x + ball.dx < ball.radius ) {
        ball.dx = -ball.dx;
    }
 else if(ball.y < paddleLeft.y || ball.y > paddleLeft.y + paddleLeft.width) {
ball.dx = -ball.dx;
 }
        else{
console.log("game over");  } */
    // si le y de la balle dépasse le canvas
    if(ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
}
        // Si la balle dépasse du bord droite du jeu
    else if( ball.x + ball.dx > canvas.width - ball.radius) {
    
    // Si la balle est entre  la hauteur d'un des deux paddle
        if(ball.y > paddleRight.y - ball.radius && ball.y < paddleRight.y + paddleRight.height + ball.radius) {
                ball.dx = -ball.dx;
        }
        else {
            scoreP1++;
            reset();
        }
} 
    // Si la balle dépasse du bord gauche du jeu
    else if(ball.x + ball.dx < ball.radius) {
            // Si la balle est entre  la hauteur d'un des deux paddle
        if(ball.y > paddleLeft.y - ball.radius && ball.y < paddleLeft.y + paddleLeft.height + ball.radius) {
                ball.dx = -ball.dx;
        }
         else {
            scoreP2++;
            reset();
        }
}
}
function randomIntFromInterval(min,max)
{
        return Math.floor(Math.random()*(max-min+1)+min);
}
function randomFloatFromInterval(min,max)
{
        return (Math.random() * (min - max) + max).toFixed(4);
}
function computerAI() {
    // 1. On regarde ou se trouve le centre de la balle
    // On augmente la vitesse du paddle en direction du centre de la balle
if(ball.y + malusAI > paddleRight.y + paddleRight.height) {
    paddleRight.y += speedMovePaddleAI;

}
     if(ball.y - malusAI < paddleRight.y ) {
    paddleRight.y -= speedMovePaddleAI; 
}   
}
    
function drawScore() {
        cxt.font = "32px Arial";
        cxt.fillStyle = "yellow";
        cxt.fillText(scoreP1, 24, 40);

            cxt.fillText(scoreP2, 635, 40);
            cxt.font = "16px Arial";
            cxt.fillStyle = "yellow";
            cxt.fillText("Cliquez pour commencer", 250, 30);
            cxt.fillText("Haut = W, Bas = S", 250, 50);

}

function reset() {
        var random1to480 = Math.floor((Math.random() * 480) + 1);
        malusAI = 23 - randomIntFromInterval(0,12);
        cxt.clearRect(0, 0, canvas.width, canvas.height);
paddleLeft = new Paddle(0,150,15,85);
paddleRight = new Paddle(canvas.width - paddleLeft.width, 150, 15,85);
ball = new Ball(random1to480,random1to480,speedMoveBall,-speedMoveBall,10); 
    
}
function draw() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
    computerAI();
     ball.draw(cxt);
 paddleLeft.draw(cxt);
 paddleRight.draw(cxt);
    paddleLeft.update();
drawScore();
        checkCollision();
    ball.x += ball.dx;
    ball.y += ball.dy;


    requestAnimationFrame(draw);
    
}

draw();