const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'red',
    speed: 2,
    velocityX: 0,
    velocityY: 0
};

const hole = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 15,
    color: 'black'
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = hole.color;
    ctx.fill();
    ctx.closePath();
}

function moveBall(event) {
    const gamma = event.gamma; 

    
    ball.velocityX = -gamma / 10; 
    ball.velocityY = gamma / 10; 

  
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;

    
    if (
        ball.x + ball.radius > hole.x - hole.radius &&
        ball.x - ball.radius < hole.x + hole.radius &&
        ball.y + ball.radius > hole.y - hole.radius &&
        ball.y - ball.radius < hole.y + hole.radius
    ) {
      
        console.log('Kula w dziurze!');
        
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawHole();
    requestAnimationFrame(animate);
}

window.addEventListener('deviceorientation', moveBall);
animate();