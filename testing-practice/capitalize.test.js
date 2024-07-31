const capitalize = require('./capitalize');

test("capitalizes 'foo'", () => {
    expect(capitalize('foo')).toBe("Foo");
});

test("capitalizes 'bar'", () => {
    expect(capitalize('bar')).toBe("Bar");
});