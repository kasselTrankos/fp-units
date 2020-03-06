function Writer(a, b){
    this[0] = a
    this[1] = b
}
Writer.prototype.map = function(f) {
    return new Writer(this[0], f(this[1]))
}


module.exports = Writer;
