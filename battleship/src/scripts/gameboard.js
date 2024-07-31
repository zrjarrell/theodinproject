const Ship = require('./ship');
const utilities = require('../utilities')

class Gameboard {
    constructor() {
        let grid = [];
        for (let x = 0; x <= 9; x++) {
            let column = [];
            for (let y = 0; y <= 9; y++) {
                let cell = new GridCell(x, y);
                column.push(cell)
            }
            grid.push(column)
        }
        this.grid = grid;
        this.ships = []
    }

    placeShips() {
        let shipLengths = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        for (let i in shipLengths) {
            let length = shipLengths[i];
            let collides = true;
            while (collides) {
                collides = false;
                let startPos = utilities.getRandomBelow(11 - length);
                if (length > 1) {
                    if (utilities.getRandomBelow(2) == 1) {
                        let x = utilities.getRandomBelow(10);
                        let ys = []
                        for (let y = startPos; y < startPos + length; y++) {
                            if (this.grid[x][y].occupied) {
                                collides = true
                            }
                            ys.push(y)
                        }
                        if (!collides) {
                            let newShip = new Ship(length)
                            for (let y in ys) {
                                this.grid[x][ys[y]].makeOccupied(newShip)
                            }
                            this.ships.push(newShip)
                        }
                    } else {
                        let y = utilities.getRandomBelow(10);
                        let xs = []
                        for (let x = startPos; x < startPos + length; x++) {
                            if (this.grid[x][y].occupied) {
                                collides = true
                            }
                            xs.push(x)
                        }
                        if (!collides) {
                            let newShip = new Ship(length)
                            for (let x in xs) {
                                this.grid[xs[x]][y].makeOccupied(newShip)
                            }
                            this.ships.push(newShip)
                        }
                    }
                } else {
                    let y = utilities.getRandomBelow(10);
                    if (this.grid[startPos][y].occupied) {
                        collides = true
                    } else {
                        let newShip = new Ship(length);
                        this.grid[startPos][y].makeOccupied(newShip);
                        this.ships.push(newShip)
                    }
                }
            }
        }
    }

    receiveAttack(x, y) {
        this.grid[x][y].receiveAttack()
    }
}

class GridCell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.occupied = false;
        this.targeted = false;
    }

    makeOccupied(ship) {
        this.occupied = true;
        this.occupier = ship;
    }

    receiveAttack() {
        this.targeted = true;
        if (this.occupied) {
            this.occupier.hit()
        }
    }
}

module.exports = Gameboard;