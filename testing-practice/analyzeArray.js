function analyzeArray(array) {
    const object =  {};
    object.length = array.length
    let sum = 0;
     for (let item of array) {
        sum += item;
     }
     object.average = sum / object.length
     object.min = Math.min.apply(null, array)
     object.max = Math.max.apply(null, array)
     return object
}

module.exports = analyzeArray