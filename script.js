const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let playerScore = 0;
let aiScore = 0;

const racketWidth = 10;
const racketHeight = 100;
const ballSize = 10;

let playerRacket = { x: 0, y: canvas.height / 2 - racketHeight / 2 };
let aiRacket = { x: canvas.width - racketWidth, y: canvas.height / 2 - racketHeight / 2 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 5, vy: 5 };

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    playerRacket.y = e.clientY - rect.top - racketHeight / 2;
});

function updateAI() {
    if (ball.y < aiRacket.y + racketHeight / 2) {
        aiRacket.y -= 5;
    } else {
        aiRacket.y += 5;
    }
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
        ball.vy = -ball.vy;
    }

    if (ball.x <= racketWidth) {
        if (ball.y > playerRacket.y && ball.y < playerRacket.y + racketHeight) {
            ball.vx = -ball.vx;
        } else {
            aiScore++;
            resetBall();
        }
    }

    if (ball.x + ballSize >= canvas.width - racketWidth) {
        if (ball.y > aiRacket.y && ball.y < aiRacket.y + racketHeight) {
            ball.vx = -ball.vx;
        } else {
            playerScore++;
            resetBall();
        }
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 5 * (Math.random() > 0.5 ? 1 : -1);
    updateScore();
}

function updateScore() {
    document.querySelector('.score').innerText = `Player: ${playerScore} - AI: ${aiScore}`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(playerRacket.x, playerRacket.y, racketWidth, racketHeight);
    ctx.fillRect(aiRacket.x, aiRacket.y, racketWidth, racketHeight);
    ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
}

function gameLoop() {
    updateAI();
    updateBall();
    draw();
    requestAnimationFrame(gameLoop);
}

function redirectToGithub() {
    window.open('https://github.com/civic1007', '_blank');
}

resetBall();
gameLoop();
