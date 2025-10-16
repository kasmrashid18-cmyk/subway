const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 10,
};

const obstacles = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    for (const obstacle of obstacles) {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function update() {
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move obstacles
    for (const obstacle of obstacles) {
        obstacle.y += 5;
    }

    // Remove off-screen obstacles
    if (obstacles.length > 0 && obstacles[0].y > canvas.height) {
        obstacles.shift();
        score++;
    }

    // Add new obstacles
    if (Math.random() < 0.02) {
        const width = Math.random() * 100 + 50;
        const x = Math.random() * (canvas.width - width);
        obstacles.push({ x, y: -50, width, height: 20 });
    }

    // Collision detection
    for (const obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            gameOver = true;
        }
    }

    drawPlayer();
    drawObstacles();
    drawScore();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

update();
