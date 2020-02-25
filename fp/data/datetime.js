function datetime(d) {
  this.value = d
}

datetime.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
//lte :: Ord a => a ~> a -> Boolean 
datetime.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};
//map:: Functor f => f a ~> (a->b) -> b 
datetime.prototype.map = function (f) {
  return datetime.of(f(this.value));
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
  return datetime.of(this.map(f)).value;
}
//of :: Aplicative f => f a ~> f -> a -> a
datetime.of = function (d) {
  return new datetime(new Date(new Date(d).getTime()));
};

// from :: f => f a ~> a -> a 
datetime.from = function(d) {
  const value = d instanceof Date ? new Date(d.getTime()) 
    : d instanceof datetime ? new Date(d.value.getTime()) :  new Date(d);
  return datetime.of(value);
};



module.exports = datetime;