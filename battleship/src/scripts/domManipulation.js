const utilities = require('../utilities');

function populateGameWindow (window, players) {
    window.innerHTML = "";
    const boardWindow = document.createElement('div');
    boardWindow.id = 'gameBoardWindow'

    const playerBoardWindow = document.createElement('div');
    playerBoardWindow.classList.add('boardWindow');
    const playerLabel = utilities.createTextedElement('div', "Player's board:");
    const playerBoard = document.createElement('div');
    playerBoard.classList.add('board');
    populateBoard(players[0], playerBoard);
    playerBoardWindow.appendChild(playerLabel);
    playerBoardWindow.appendChild(playerBoard);

    const cpuBoardWindow = document.createElement('div');
    cpuBoardWindow.classList.add('boardWindow');
    const cpuLabel = utilities.createTextedElement('div', "CPU's board:");
    const cpuBoard = document.createElement('div');
    cpuBoard.classList.add('board');
    populateBoard(players[1], cpuBoard);
    cpuBoardWindow.appendChild(cpuLabel);
    cpuBoardWindow.appendChild(cpuBoard);

    boardWindow.appendChild(playerBoardWindow);
    boardWindow.appendChild(cpuBoardWindow);

    window.appendChild(boardWindow)

    const buttonPanel = document.createElement('div');
    buttonPanel.id = 'buttonPanel';
    const restartButton = utilities.createTextedElement('button', 'Restart game');
    restartButton.id = 'restartButton';
    const randomButton = utilities.createTextedElement('button', 'Randomize ships');
    randomButton.id = 'randomButton';

    buttonPanel.appendChild(restartButton);
    buttonPanel.appendChild(randomButton);

    window.appendChild(buttonPanel)
}

function populateBoard (player, boardWindow) {
    const board = player.gameboard;
    for (let x in board.grid) {
        let column = document.createElement('div');
        column.classList.add('boardColumn');
        for (let y in board.grid[x]) {
            let cell = document.createElement('div');
            cell.classList.add('cell')
            cell.dataset.x = x;
            cell.dataset.y = y;
            let objectCell = board.grid[x][y]
            if (objectCell.occupier && objectCell.occupier.isSunk()) {
                cell.classList.add('sunkCell')
            } else if (objectCell.occupied && objectCell.targeted) {
                cell.classList.add('hitCell')
            } else if (objectCell.targeted) {
                cell.classList.add('targetedCell')
            } else if (objectCell.occupied && player.person) {
                cell.classList.add('occupiedCell')
            }
            column.appendChild(cell)
        }
        boardWindow.appendChild(column)
    }
}

module.exports = {populateGameWindow}