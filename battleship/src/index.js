import './style.css';

const Player = require('./scripts/player');
const dom = require('./scripts/domManipulation')
const utilities = require('./utilities')

//person: players[0]; cpu: players[1]
let players = [new Player(true), new Player(false)]

let currentPlayer = 0;

for (let i in players) {
    players[i].gameboard.placeShips()
}

const gameWindow = document.getElementById("gameWindow");

let gameStarted = false;
let gameFinished = false;

updateWindow(gameWindow, players, currentPlayer, gameStarted, gameFinished)






function updateWindow (window, players, currentPlayer, gameStarted, gameFinished) {
    dom.populateGameWindow(window, players)
    const cpuBoard = document.getElementById('gameBoardWindow').children[1]
    if (players[0].allSunk()) {
        gameFinished = true;
        alert("CPU won...")
    } else if (players[1].allSunk()) {
        gameFinished = true;
        alert("You win!!!")
    }
    if (!gameFinished) {
        if (currentPlayer == 0) {
            let cells = cpuBoard.querySelectorAll('.cell');
            for (let cell of cells) {
                cell.addEventListener('click', function() {
                    gameStarted = true;
                    let x = cell.dataset.x
                    let y = cell.dataset.y
                    if (!players[1].gameboard.grid[x][y].targeted) {
                        players[1].gameboard.receiveAttack(x, y)
                        updateWindow(window, players, (currentPlayer + 1) % 2, gameStarted, gameFinished)
                    }
                })
            }
        } else {
            cpuSelection(players[0].gameboard)
            updateWindow(window, players, (currentPlayer + 1) % 2, gameStarted, gameFinished)
        }
    }

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', function() {
        location.reload()
        // gameStarted = false;
        // let players = [new Player(true), new Player(false)]
        // let currentPlayer = 0;
        // for (let i in players) {
        //     players[i].gameboard.placeShips()
        // }
        // updateWindow(window, players, currentPlayer, gameStarted, gameFinished)
    })

    const randomButton = document.getElementById('randomButton');
    if (gameStarted) {
        randomButton.disabled = true;
    }
    randomButton.addEventListener('click', function() {
        players[0] = new Player(true)
        players[0].gameboard.placeShips()
        updateWindow(window, players, currentPlayer, gameStarted, gameFinished)
    })
}

function cpuSelection(playerGameboard) {
    let alreadyTargeted = true;
    while (alreadyTargeted) {
        alreadyTargeted = false;
        let x = utilities.getRandomBelow(10);
        let y = utilities.getRandomBelow(10);
        if (playerGameboard.grid[x][y].targeted) {
            alreadyTargeted = true
        } else {
            playerGameboard.receiveAttack(x, y)
        }
    }
}