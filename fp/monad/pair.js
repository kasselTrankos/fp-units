
function Pair(_1, _2) {
  this._1 = _1;
  this._2 = _2;
}

// map :: Pair a b ~> (b -> c) -> Pair a c
Pair.prototype.map = function(f) {
  return new Pair(this._1, f(this._2))
}
// empty :: Semigroup a => a ~> () -> a
Pair.empty = function () {
  return new Pair();
}

module.exports = Pair;