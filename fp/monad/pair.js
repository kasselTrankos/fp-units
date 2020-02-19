
function Pair(a, b) {
  this.a = a;
  this.b = b;
}

// map :: Pair a b ~> (b -> c) -> Pair a c
Pair.prototype.map = function(f) {
  return new Pair(this.a, f(this.b))
}


module.exports = Pair;