const daggy = require('daggy');
const datetime = daggy.tagged('datetime', ['d']);




datetime.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
//lte :: Ord a => a ~> a -> Boolean 
datetime.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};
//map:: Functor f => f a ~> (a->b) -> b 
datetime.prototype.map = function (f) {
  return datetime(f(this.d));
};

// Apply :: f => f a ~> f (a -> b) -> f b
datetime.prototype.ap = function(b) {
  return datetime.of(b.map(this.value));
}

// Semigroup :: a ~> a -> a
datetime.prototype.concat = function(b) {
  return datetime.of(this.value.getTime() + b.value.getTime());
}

// chain :: Chain m =>  m a ~> ( a -> m b) -> m b
datetime.prototype.chain = function(f) {
  console.log(f, '00000');
  return f(this.x)
}
//of :: Aplicative f => f a ~> f -> a -> a
datetime.of = function (a) {
  return datetime(new Date(a));
};




module.exports = datetime;