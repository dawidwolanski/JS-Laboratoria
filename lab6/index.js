const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let startTime = Date.now();
const attemptTimes = [];

const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const seconds = secs % 60;

    return `${mins < 10 ? '0' + mins : mins}:${seconds < 10 ? '0' + seconds : seconds}`
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'red',
    speedMultiplier: 2,
    velocityX: 0,
    velocityY: 0
};

const hole = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 15,
    color: 'black'
};

const timer = {
    currentSeconds: 0,
    element: document.getElementById('timer'),
    run() {
        setInterval(() => {
            this.element.textContent = formatTime(this.currentSeconds);
            this.currentSeconds++;
        }, 1000);
    },
    reset() {
        this.currentSeconds = 0;
    }
}

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

function moveBall(event) { // initials: beta - 90 gamma - 0 (portrait mode)
    const { beta, gamma } = event;
  
    const holeDistanceOffset = 10;
    const sensivityRatio = 4; // male wartosci do testowania na pc
    const Xchange = gamma / sensivityRatio;
    const Ychange = (beta - 90) / sensivityRatio;
    
    ball.velocityX = Xchange; 
    ball.velocityY = Ychange; 

    const deltaX = ball.velocityX * ball.speedMultiplier;
    const deltaY = ball.velocityY * ball.speedMultiplier;

    ball.x += deltaX;
    ball.y += deltaY;
    
    ball.x = Math.max(ball.x, 0 + ball.radius);
    ball.x = Math.min(ball.x, canvas.width - ball.radius);
    ball.y = Math.max(ball.y, 0 + ball.radius);
    ball.y = Math.min(ball.y, canvas.height - ball.radius);

    const holeDistance = Math.sqrt((ball.x - hole.x)**2 + (ball.y - hole.y)**2);

    if ( holeDistance < hole.radius - ball.radius + holeDistanceOffset ) {
        endGame();
    }
}

function endGame() {
    const timeDiff = Math.floor((Date.now() - startTime) / 1000);

    alert('Kula w dziurze!')

    hole.x = Math.random() * canvas.width;
    hole.y = Math.random() * canvas.height;

    attemptTimes.push(timeDiff);
    attemptTimes.sort();

    const bestThree = attemptTimes.slice(0, 3).map(num => formatTime(num));
    document.getElementById('bestAttempts').innerHTML = bestThree.join('<br/>')

    timer.reset()
    startTime = Date.now();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHole();
    drawBall();
    requestAnimationFrame(animate);
}

window.addEventListener('deviceorientation', moveBall);
animate();
timer.run();