const reverseString = require("./reverseString");

test("Reverses 'Hello world.'", () => {
    expect(reverseString('Hello World.')).toBe(".dlroW olleH")
})

test("Reverses 'Goodbye world.", () => {
    expect(reverseString('Goodbye world.')).toBe(".dlrow eybdooG")
})