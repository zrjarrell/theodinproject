const Gameboard = require('../gameboard');

test("Makes grid.", () => {
    expect(new Gameboard().grid.length).toEqual(10)
})

const board = new Gameboard()

test("Cells become occupied", () => {
    board.grid[1][2].makeOccupied()
    expect(board.grid[1][2].occupied).toBeTruthy()
})

const board2 = new Gameboard()

test("Places random ships", () => {
    board2.placeShips()
    expect(board2.ships.length).toEqual(10)
})

test("No ships overlap", () => {
    let count = 0;
    for (let x in board2.grid) {
        for (let y in board2.grid[x]) {
            if (board2.grid[x][y].occupied) {
                count++;
            }
        }
    }
    expect(count).toEqual(20)
})