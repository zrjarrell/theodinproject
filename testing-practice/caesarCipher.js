function caesarCipher(string, shift) {
    let result = ""
    for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i)
        let newCode = 0
        if (code > 64 && code < 91) {
            newCode = ((code - 65 + shift) % 26) + 65
        } else if (code > 96 && code < 123) {
            newCode = ((code - 97 + shift) % 26) + 97
        } else {
            newCode = code
        }
        result += String.fromCharCode(newCode)
    }
    return result
}

module.exports = caesarCipher