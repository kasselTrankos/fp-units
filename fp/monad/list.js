function LinkedList(car, cdr) {
  this.Cons = [car, cdr];
}
// empty :: Moinid m => () -> m
LinkedList.empty = function() {
  return [];
}

// of :: Aplicative f => f -> a -> f a 
LinkedList.of = function(x) {
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

module.exports = LinkedList;