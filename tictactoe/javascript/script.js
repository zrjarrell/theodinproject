/* script to play a game of Tic Tac Toe with web GUI*/

// sets up gameboard as 9 value array, board flows from left to right, top to bottom
const board = {
    tiles: Array(" ", " ", " ", " ", " ", " ", " ", " ", " "),
    update: function(position, newvalue) {
        this.tiles[position] = newvalue;
    },
    //resets board to original state
    reset: function() {
        this.tiles = Array(" ", " ", " ", " ", " ", " ", " ", " ", " ");
    }
};

// object that orchestrates game mechanics
const game = {
    //keep track of player turn
    turn: 0,
    //keep track of if game has ended to prevent further play
    over: false,
    //updates turn order
    updateTurn: function(playerCards) {
        playerCards[this.turn].classList.remove("activePlayer")
        this.turn ++
        this.turn = this.turn % 2
        playerCards[this.turn].classList.add("activePlayer")
    },
    //resets game
    reset: function() {
        this.over = false;
    },
    //updates gameboard, checks for win and draw states, and returns message if so
    //updates player turns
    makeMove: function(players, gameboard, position, display, playerCards) {
        if (!this.over && gameboard.tiles[position] == " ") {
            gameboard.update(position, players[this.turn].symbol);
            win = this.checkWins(gameboard.tiles);
            draw = this.checkDraws(gameboard.tiles);
            if (win[0]) {
                display.textContent = win[1] + " wins!";
                this.over = true;
            } else if (draw) {
                display.textContent = "Draw!";
                this.over = true;
            }
            this.updateTurn(playerCards);
        }
    },
    //checks for win states
    checkWins: function(tiles) {
        let win = false;
        let symbol = " ";
        if (tiles[0] != symbol) {
            if ((tiles[0] == tiles[1] && tiles[1] == tiles[2]) ||
                (tiles[0] == tiles[3] && tiles[3] == tiles[6]) ||
                (tiles[0] == tiles[4] && tiles[4] == tiles[8])) {
                    win = true
                    symbol = tiles[0]
                }
        }
        if (tiles[4] != symbol) {
            if ((tiles[4] == tiles[1] && tiles[4] == tiles[7]) ||
                (tiles[4] == tiles[3] && tiles[4] == tiles[5]) ||
                (tiles[4] == tiles[2] && tiles[2] == tiles[6])) {
                    win = true
                    symbol = tiles[4]
                }
        }
        if (tiles[8] != symbol) {
            if ((tiles[8] == tiles[2] && tiles[2] == tiles[5]) ||
                (tiles[8] == tiles[6] && tiles[6] == tiles[7])) {
                    win = true
                    symbol = tiles[8]
                }
        };
        return Array(win, symbol);
    },
    //checks for draw states
    checkDraws: function(tiles) {
        let draw = true;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] == " ") {
                draw = false
        }};
        return draw
    }
};

//makes players
function createPlayer(symbol) {
    return {symbol};
};

//populates html board with symbols
function populateBoard(board, buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = board.tiles[i]
    }
}

const players = Array(createPlayer("X"), createPlayer("O"));
const container = document.querySelector("#gameContainer");
const buttons = document.querySelectorAll(".tile");
const display = document.querySelector("#displayScreen")

//listens for click on tile and causes resulting move to happen
//logic for move validity within the game.makeMove method
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        game.makeMove(players, board, Number(button.id), display, playerCards)
        populateBoard(board, buttons)
    });
});

const player1name = document.querySelector("#player1Name")
const player2name = document.querySelector("#player2Name")
const playerCards = document.querySelectorAll(".playerCard")
const playerSubmitButton = document.querySelector("#playerNameSubmit")
const restartButton = document.querySelector("#resetButton")

//updates player names if submit button clicked
playerSubmitButton.addEventListener('click', () => {
    document.querySelector("#player1").textContent = player1name.value;
    document.querySelector("#player2").textContent = player2name.value;
})

//resets game on click, first move goes to loser
restartButton.addEventListener('click', () => {
    board.reset()
    game.reset()
    display.textContent = ""
    populateBoard(board, buttons)
})