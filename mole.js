const GAME_DURATION = 30; 
const MOLE_SCORE = 10;
const MOLE_INTERVAL = 1000; 
const PLANT_INTERVAL = 2000; 

let score = 0;
let timeLeft = GAME_DURATION;
let gameOver = false;
let currMoleTile = null;
let currPlantTile = null;
let moleInterval = null;
let plantInterval = null;
let timerInterval = null;

const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restart-btn");

window.onload = function() {
    setupGame();
    restartBtn.addEventListener("click", startGame);
};

function setupGame() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", handleTileClick);
        board.appendChild(tile);
    }
}

function startGame() {
    score = 0;
    timeLeft = GAME_DURATION;
    gameOver = false;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    restartBtn.classList.add("hidden");
    
    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";
    
    if (moleInterval) clearInterval(moleInterval);
    if (plantInterval) clearInterval(plantInterval);
    if (timerInterval) clearInterval(timerInterval);
    
    moleInterval = setInterval(setMole, MOLE_INTERVAL);
    plantInterval = setInterval(setPlant, PLANT_INTERVAL);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    
    const mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.alt = "Mole";
    
    let tileId;
    do {
        tileId = getRandomTile();
    } while (currPlantTile && currPlantTile.id === tileId);
    
    currMoleTile = document.getElementById(tileId);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    
    const plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.alt = "Piranha Plant";
    
    let tileId;
    do {
        tileId = getRandomTile();
    } while (currMoleTile && currMoleTile.id === tileId);
    
    currPlantTile = document.getElementById(tileId);
    currPlantTile.appendChild(plant);
}

function handleTileClick() {
    if (gameOver) return;
    
    if (this === currMoleTile) {
        score += MOLE_SCORE;
        scoreDisplay.textContent = score;
        this.classList.add("mole-hit");
        setTimeout(() => this.classList.remove("mole-hit"), 200);
        this.innerHTML = "";
    } else if (this === currPlantTile) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    clearInterval(timerInterval);
    
    if (timeLeft <= 0) {
        scoreDisplay.textContent = `Time's up! Final Score: ${score}`;
    } else {
        scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
    }
    
    restartBtn.classList.remove("hidden");
    
    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";
}

startGame();