
function Pair(_1, _2) {
  this._1 = _1;
  this._2 = _2;
}

// concat :: monoid a => a ~> a -> a
Pair.prototype.concat = function (that) {
  return new Pair(this._1, this._2 + that._2)
}

// map :: Pair a b ~> (b -> c) -> Pair a c
Pair.prototype.map = function(f) {
  return new Pair(this._1, f(this._2))
}

// app :: Apply f => f a ~> f (a -> b) -> f b
Pair.prototype.ap = function (f) {
  return new Pair(f._1.concat(this._1), f._2(this._2))
}

// chain :: Chain m => m a ~> (a -> m b ) -> m b
Pair.prototype.chain = function(f) {
  const that = f(this._2)

  return new Pair(this._1.concat(that._1), that._2)
}

const _Pair = T => {
  const Pair_ = daggy.tagged('Pair', ['_1', '_2'])

  Pair_.prototype.map = function (f) {
    return Pair_(this._1, f(this._2))
  }

  Pair_.prototype.ap = function (fs) {
    return Pair_(fs._1.concat(this._1),
                 fs._2(this._2))
  }

  Pair_.of = x => Pair_(T.empty(), x)

  return Pair_
}

module.exports = {Pair, _Pair};