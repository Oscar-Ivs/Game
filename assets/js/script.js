const gridSize = 4;
let correctScore = 0;
let incorrectScore = 0;

// Create grid
const gameGrid = document.getElementById('game-grid');
for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    gameGrid.appendChild(cell);
}

function startGame() {
    const cells = document.querySelectorAll('#game-grid div');
    let randomIndex = Math.floor(Math.random() * cells.length);
    const activeCell = cells[randomIndex];
    
    // Highlight random cell
    activeCell.classList.add('active');
    setTimeout(() => {
        activeCell.classList.remove('active');
    }, 1000);

    cells.forEach(cell => {
        cell.onclick = () => {
            if (cell === activeCell) {
                correctScore++;
            } else {
                incorrectScore++;
            }
            updateScores();
        };
    });
}

function updateScores() {
    document.getElementById('score').textContent = correctScore;
    document.getElementById('incorrect').textContent = incorrectScore;
}

// Start the game loop
setInterval(startGame, 2000);
