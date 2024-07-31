const caesarCipher = require("./caesarCipher");

test("Handles no shift.", () => {
    expect(caesarCipher('abc', 0)).toBe('abc')
})

test("Performs basic shifts.", () => {
    expect(caesarCipher('abc', 5)).toBe('fgh')
})

test("Wraps text around alphabet modulus", () => {
    expect(caesarCipher('xyz', 3)).toBe('abc')
})

test("Maintains case.", () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr')
})

test("Skips punctuation and spaces.", () => {
    expect(caesarCipher('Hello, World!', 3)) .toBe('Khoor, Zruog!')
})