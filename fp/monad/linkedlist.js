const daggy = require("daggy");
const { fun } = require("jsverify");

const LinkedList = daggy.taggedSum('linkedList', {
  Cons: ['head', 'tail'], Nil: []
});
LinkedList.of = function(head, tail) {
  return LinkedList.Cons(head, tail)
}
// empty :: Monoid m => () -> m 
LinkedList.empty = function() {
  return LinkedList.Nil
}

// concat :: Semigroup a => a ~> a -> a
LinkedList.prototype.concat = function(that) {
  return this.cata({
    Cons: (head, tail) => that.cata({
      Cons: () =>  LinkedList.Cons(head, LinkedList.Cons(tail, that)), 
      Nil:() => this 
    }),
    Nil: () => that
  });
}

LinkedList.fromArray = function(data){
  return data.reduceRight((acc, x) => LinkedList.Cons(x, acc), LinkedList.Nil);
}

LinkedList.prototype.toArray = function() {
  return this.cata({
    Cons: (x, acc) => [
      x, ... acc.toArray()
    ],

    Nil: () => []
  })
}



LinkedList.prototype.fromArray = function(xs) {

};



module.exports = LinkedList;