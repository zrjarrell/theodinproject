const analyzeArray = require("./analyzeArray");

test("Finds avg", () => {
    expect(analyzeArray([1,8,3,4,2,6]).average).toBe(4)
})

test("Finds min", () => {
    expect(analyzeArray([1,8,3,4,2,6]).min).toBe(1)
})

test("Finds max", () => {
    expect(analyzeArray([1,8,3,4,2,6]).max).toBe(8)
})

test("Finds min", () => {
    expect(analyzeArray([1,8,3,4,2,6]).length).toBe(6)
})