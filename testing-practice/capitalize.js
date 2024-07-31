function capitalize(word) {
    let newStart = word[0].toUpperCase();
    let capital = newStart + word.slice(1)
    return capital
}

module.exports = capitalize