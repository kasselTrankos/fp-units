function LinkedList(car, cdr) {
  this.Cons = [car, cdr];
}
LinkedList.empty = function() {
  return [];
}

LinkedList.of = function(x) {
  const [head, ...tail] = x.reverse();
  return tail.reduce((acc, el)=> new LinkedList(el, acc), new LinkedList(head));
}


module.exports = LinkedList;