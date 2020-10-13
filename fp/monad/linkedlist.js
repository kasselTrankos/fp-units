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
    Cons: () => that.cata({
      Cons: () =>  LinkedList.Cons(head, LinkedList.Cons(tail, that)), 
      Nil:() => this 
    }),
    Nil: () => that
  });
}

LinkedList.prototype.fromArray = function(xs) {

};



module.exports = LinkedList;