/* script to play a game of Tic Tac Toe with web GUI*/

const board = {
    tiles: Array(" ", " ", " ", " ", " ", " ", " ", " ", " "),
    update: function(position, newvalue) {
        this.tiles[position] = newvalue;
    }
};

const game = {
    turn: 0,
    over: false,
    updateTurn: function() {
        this.turn ++
        this.turn = this.turn % 2
    },
    makeMove: function(players, gameboard, position) {
        if (!this.over && gameboard.tiles[position] == " ") {
            gameboard.update(position, players[this.turn].symbol);
            console.log(gameboard.tiles);
            win = this.checkWins(gameboard.tiles);
            draw = this.checkDraws(gameboard.tiles);
            if (win[0]) {
                console.log(win[1] + " wins!");
                this.over = true;
            } else if (draw) {
                console.log("Draw!");
                this.over = true;
            }
            this.updateTurn();
        }
    },
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
        } else if (tiles[4] != symbol) {
            if ((tiles[4] == tiles[1] && tiles[4] == tiles[7]) ||
                (tiles[4] == tiles[3] && tiles[4] == tiles[5]) ||
                (tiles[4] == tiles[2] && tiles[2] == tiles[6])) {
                    win = true
                    symbol = tiles[4]
                }
        } else if (tiles[8] != symbol) {
            if ((tiles[8] == tiles[2] && tiles[2] == tiles[5]) ||
                (tiles[8] == tiles[6] && tiles[6] == tiles[7])) {
                    win = true
                    symbol = tiles[8]
                }
        };
        return Array(win, symbol);
    },
    checkDraws: function(tiles) {
        let draw = true;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] == " ") {
                draw = false
        }};
        return draw
    }
}

function createPlayer(symbol) {
    return {symbol};
};

const players = Array(createPlayer("X"), createPlayer("O"))
