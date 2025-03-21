const gridSize = 4;
let correctScore = 0;
let incorrectScore = 0;
let awaitingAnswer = false; // Track if we're waiting for a user's response
let activeCell = null; // Keep track of the active cell

// Create grid
const gameGrid = document.getElementById('game-grid');
for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    gameGrid.appendChild(cell);
}

function startGame() {
    if (awaitingAnswer) return; // Do not proceed if awaiting a response

    const cells = document.querySelectorAll('#game-grid div');
    let randomIndex = Math.floor(Math.random() * cells.length);
    activeCell = cells[randomIndex];

    // Highlight the random cell for 500ms
    activeCell.classList.add('active');
    awaitingAnswer = true;

    setTimeout(() => {
        activeCell.classList.remove('active');
    }, 500);

        // Only allow one click per round
        cells.forEach(cell => {
            cell.onclick = handleCellClick;
        });
    }
    
    function handleCellClick(event) {
        const cell = event.target;
        if (!awaitingAnswer || !activeCell) return; // Ignore clicks if no active cell or awaitingAnswer flag not set
    
        if (cell === activeCell) {
            correctScore++;
        } else {
            incorrectScore++;
        }
        updateScores();
        awaitingAnswer = false; // Allow the game to continue
        activeCell = null; // Reset active cell
        setTimeout(startGame, 500); // Start the next round after a short delay
}

function updateScores() {
    document.getElementById('score').textContent = correctScore;
    document.getElementById('incorrect').textContent = incorrectScore;
}

// Start the first round
startGame();
