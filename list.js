function List(x) {
    this.x = x;
}

// map :: Functor f => f a ~> (a -> b) -> f b
List.prototype.map = function(f) {
  return new List(this.x.map(f))
}
// ap :: Apply f => f a ~> f (a -> b) -> f b
List.prototype.ap = function(that) {
  return new List(that.x(this.x));
}
// chain :: Chain m =>  m a ~> (a -> m b ) -> m b
List.prototype.chain = function(f) {
  return this.x.map(f);
}



module.exports = List;