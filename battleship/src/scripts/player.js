const Gameboard  = require('./gameboard')

class Player {
    constructor(isPerson) {
        this.person = isPerson;
        this.gameboard = new Gameboard()
    }

    allSunk() {
        let numSunk = 0;
        for (let i in this.gameboard.ships) {
            if (this.gameboard.ships[i].isSunk()) {
                numSunk += 1;
            }
        }
        if (numSunk == 10) {return true} else {return false}
    }
}

module.exports = Player;