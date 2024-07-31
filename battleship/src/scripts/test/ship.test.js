const Ship = require('../ship');

test("Create ship", () => {
    expect(new Ship(4)).toEqual({length: 4, hits: 0})
});

const tuggy = new Ship(2);

test("Gets hit", () => {
    tuggy.hit()
    expect(tuggy).toEqual({length: 2, hits: 1})
})

test("Survives hit", () => {
    expect(tuggy.isSunk()).toBeFalsy()
})

test("Sinks", () => {
    tuggy.hit()
    expect(tuggy.isSunk()).toBeTruthy()
})