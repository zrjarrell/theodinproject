//square holds spatial info for square, and upon building board, each square connected by one knight move added to connections
class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.connections = [];
        this.visitedBy = null;
    }

    //determines legal knight moves that can be made and adds each resulting square to this.connections
    buildConnections(board) {
        let relMoves = [[-1,-2], [-2,-1], [-1,2], [2,-1],
                        [1,2], [2,1], [1,-2], [-2,1]]
        for (let i = 0; i < 8; i++) {
            let newX = this.x + relMoves[i][0]
            let newY = this.y + relMoves[i][1]
            if (newX >= 0 && newX < board.width && newY >= 0 && newY < board.height) {
                this.connections.push(board.grid[newX][newY])
            }
        }
    }
}

//board holds grid of Squares in width x height dimensions. 
class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = []
        for (let i = 0; i < width; i++) {
            let column = []
            for (let j = 0; j < height; j++) {
                column.push(new Square(i, j))
            }
            this.grid.push(column)
        }
        this.buildMoves()
    }

    //loops through each Square in board grid to determine Squares connected by one move.
    buildMoves() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.grid[i][j].buildConnections(this)
            }
        }
    }

    //resets visitedBy property of each Square in grid to null. For use in knightMoves method to reset for new search
    resetVisits() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.grid[i][j].visitedBy = null
            }
        }
    }

    //takes start and end Square coordinates (as arrays in [x,y] format) and returns prints to console stating one of available shortest paths
    //if start and end are same coordinates, returns "Already at destination."
    //shortest path returned determined by path drawn by shortestPath method
    knightMoves(start, end) {
        let startSquare = this.grid[start[0]][start[1]]
        let endSquare = this.grid[end[0]][end[1]]
        if (startSquare == this.grid[end[0]][end[1]]) {
            console.log("Already at destination.")
        } else {
            this.shortestPath(startSquare, endSquare)
            let reverseMoves = [endSquare]
            while (reverseMoves[reverseMoves.length-1].visitedBy !== "start") {
                reverseMoves.push(reverseMoves[reverseMoves.length-1].visitedBy)
            }
            console.log("You made it in " + (reverseMoves.length-1) + " moves! Here's your path:")
            for (let i = reverseMoves.length-1; i >= 0; i--) {
                console.log("[" + reverseMoves[i].x + "," + reverseMoves[i].y + "]")
            }
            this.resetVisits()
        }

    }

    //performs BFS using startSquare as root. Does not repeat Squares. If Square already visited, Square is ignored in future considered paths.
    shortestPath(startSquare, endSquare) {
        let queue = [startSquare]
        startSquare.visitedBy = "start"
        while (endSquare.visitedBy === null) {
            let currentSquare = queue[0]
            console.log(currentSquare)
            for (let i = 0; i < currentSquare.connections.length; i++) {
                console.log(currentSquare.connections.length)
                if (currentSquare.connections[i].visitedBy === null) {
                    currentSquare.connections[i].visitedBy = currentSquare;
                    queue.push(currentSquare.connections[i])
                }
            }
            queue.shift()
            if (queue.length == 0) {
                console.log("Error: Queue emptied before end found.")
            }
        }
    }
}

let chess = new Board(8,8)
let reverseMoves = chess.knightMoves([0,0],[3,3])

