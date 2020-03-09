function LinkedList(x) {
    this.x = x;
}

// map :: Functor f => f a ~> (a -> b) -> f b
LinkedList.prototype.map = function(f) {
  return new LinkedList(this.x.map(f))
}
// ap :: Apply f => f a ~> f (a -> b) -> f b
LinkedList.prototype.ap = function(that) {
  return new LinkedList(that.x(this.x));
}
// chain :: Chain m =>  m a ~> (a -> m b ) -> m b
LinkedList.prototype.chain = function(f) {
  return this.x.map(f);
}



module.exports = LinkedList;