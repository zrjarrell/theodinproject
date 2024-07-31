const Gameboard  = require('./gameboard')

class Player {
    constructor(isPerson) {
        this.person = isPerson;
        this.gameboard = new Gameboard()
    }
}

module.exports = Player;