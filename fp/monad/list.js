function LinkedList(car, cdr) {
  this.Cons = [car, cdr];
}
// empty :: Moinid m => () -> m
LinkedList.empty = function() {
  return [];
}

// of :: Aplicative f => f -> a -> f a 
LinkedList.of = function(car, cdr) {
  return new LinkedList(car, cdr);
}

// from ::  f => f -> a -> f a 
LinkedList.from = function(x) {
  const [head, ...tail] = x.reverse();
  return tail.reduce((acc, el)=> new LinkedList(el, acc), new LinkedList(head));
}
// reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
LinkedList.prototype.reduce = function(f, acc) {
  const [car, cdr] = this.Cons;
  const _acc = f(acc, car);
  if(cdr){
    return cdr.reduce(f, _acc);
  }
	return _acc;
}

// map :: Functor f a => f (a -> b) -> f b
LinkedList.prototype.map = function(f) {
  const [car, cdr] = this.Cons;
  if(cdr){
    return LinkedList.of(f(car), cdr.map(f));
  }
  return LinkedList.of(f(car), cdr);
}

module.exports = LinkedList;