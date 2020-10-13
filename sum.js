
const daggy = require('daggy');
const { fun } = require('jsverify');
const lift2 = f => a => b => b.ap(a.map(f));

// Our fully-constructed Pair type.
const Pair = T => {
  const Pair_ = daggy.tagged('Pair', ['_1', '_2'])

  Pair_.prototype.map = function (f) {
    return Pair_(this._1, f(this._2))
  }
  Pair_.prototype.traverse = function (_, f) {
    return f(this._2).map(x => Pair(this._1, x))
  }

  Pair_.prototype.ap = function (fs) {
    return Pair_(fs._1.concat(this._1),
                 fs._2(this._2))
  }

  Pair_.of = x => Pair_(T.empty(), x)

  Pair_.prototype.chain = function (f) {
    const that = f(this._2)

    return Pair_(this._1.concat(that._1),
                 that._2)
  }

  Pair_.toString = function() { 
    return `{_1: ${this._1}, _2: ${this._2}} `;
  }


  return Pair_
}



// sum is
const Sum = daggy.tagged('Sum', ['value'])

// empty :: Monoid m => () -> m
Sum.empty = function() {
  return new Sum(0);
}

// concat :: Semigroup a => a ~> a -> a
Sum.prototype.concat = function(that) {
  return new Sum(this.value + that.value);
}

// foldMap :: (Foldable t, Monoid m) => (a -> m) -> t a -> m
const sum = xs => xs.reduce((acc, x)=> acc + x, 0);

const a = [1,23];
const b = new Sum(1);



const CostPair = Pair(Sum);
const aa = x => CostPair(Sum(110), x + 12);
const bb = x =>  CostPair(Sum(100), x + 'Mauren');
const fa = x => y => ({ name: x, rank: y });
const j = id => lift2(fa)(aa(id))(bb(id));
console.log(j(9))

