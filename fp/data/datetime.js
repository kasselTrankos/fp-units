const {tagged} = require( 'daggy');
const date = tagged('date', ['value']);

date.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
//lte :: Ord a => a ~> a -> Boolean 
date.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};
//map:: Functor f => f a ~> (a->b) -> b 
date.prototype.map = function (f) {
  return date.of(f(this.value));
};

// Apply :: f => f a ~>f (a->b) -> f b
date.prototype.ap = function(b) {
  return date.of(b.map(this.value));
}

// Semigroup :: a ~> a -> a
date.prototype.concat = function(b) {
  return date.of(this.value.getTime() + b.value.getTime());
}

date.prototype.chain = function(f) {
  return date(this.map(f)).value;
}
//prod types is this
date.of = function (x) {
  const value = x instanceof Date ? new Date(x.getTime()) 
    : x instanceof date ? new Date(x.value.getTime()) :  new Date(x);
  return new date(value);
};


module.exports = date;