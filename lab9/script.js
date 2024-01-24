const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let balls = [];// zmienne
const numBalls = 50;
const minDistance = 50;
const ballRadius = 5;
let animationId;

function init() {//szybkość kul i pozycja
  balls = [];
  for (let i = 0; i < numBalls; i++) {
    const ball = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    };
    balls.push(ball);
  }
}
// linie i kile
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < balls.length; j++) {
      const dx = balls[i].x - balls[j].x;
      const dy = balls[i].y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
      }
    }

    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    if (balls[i].x + ballRadius > canvas.width || balls[i].x - ballRadius < 0) {
      balls[i].dx *= -1;
    }
    if (balls[i].y + ballRadius > canvas.height || balls[i].y - ballRadius < 0) {
      balls[i].dy *= -1;
    }
  }//do poprawy

  animationId = requestAnimationFrame(draw);
}

startBtn.addEventListener('click', () => {
  init();
  draw(); 
});

resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(animationId);
  animationId = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let mouseForce = 50; // na zero zeby zobaczyc jak sie mnożą// 
const splitForce = 2; 
//połozenie myszki
canvas.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
//iteracja
  for (let i = 0; i < balls.length; i++) {
    const dx = mouseX - balls[i].x;
    const dy = mouseY - balls[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      const angle = Math.atan2(dy, dx);
      balls[i].x -= Math.cos(angle) * mouseForce;
      balls[i].y -= Math.sin(angle) * mouseForce;
    }
  }
});
//iteracja i obszar
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  for (let i = 0; i < balls.length; i++) {
    const dx = mouseX - balls[i].x;
    const dy = mouseY - balls[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
//dodawanie po klik
    if (distance < ballRadius) {
      balls.splice(i, 1); 

      
      const newBall1 = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * splitForce,
        dy: (Math.random() - 0.5) * splitForce,
      };
      const newBall2 = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * splitForce,
        dy: (Math.random() - 0.5) * splitForce,
      };
      balls.push(newBall1, newBall2);
      break;
    }
  }
});