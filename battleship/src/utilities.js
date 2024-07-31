function createTextedElement(type, text) {
    const elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    return elem;
}

function getRandomBelow(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {createTextedElement: createTextedElement, getRandomBelow: getRandomBelow}