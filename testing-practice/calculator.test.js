const Calculator = require("./calculator");

test("Adds 2+2", () => {
    expect(Calculator.add(2,2)).toBe(4)
})

test("Subtracts 1 from 3", () => {
    expect(Calculator.subtract(3,1)).toBe(2)
})

test("Multiplies 8 by 8", () => {
    expect(Calculator.multiply(8,8)).toBe(64)
})

test("Divides 32 by 4", () => {
    expect(Calculator.divide(32,4)).toBe(8)
})