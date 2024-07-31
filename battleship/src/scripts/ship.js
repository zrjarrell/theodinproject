class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
    }

    hit() {
        this.hits += 1
    }

    isSunk() {
        if (this.hits >= this.length) {
            return true
        } else {
            return false
        }
    }
}

module.exports = Ship;