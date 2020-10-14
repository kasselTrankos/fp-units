const daggy = require("daggy");
const { fun } = require("jsverify");

const LinkedList = daggy.taggedSum('linkedList', {
  Cons: ['head', 'tail'], Nil: []
});
LinkedList.of = function(head) {
  return LinkedList.Cons(head, LinkedList.empty());
}
// empty :: Monoid m => () -> m 
LinkedList.empty = function() {
  return LinkedList.Nil
}

// concat :: Semigroup a => a ~> a -> a
LinkedList.prototype.concat = function(that) {
  return this.cata({
    Cons: (head, tail) => that.cata({
      Cons: () =>  LinkedList.Cons(head, tail.concat(that)), 
      Nil:() => this 
    }),
    Nil: () => that
  });
}

// chain :: Chain m => m a ~> ( a -> m b) -> m b
LinkedList.prototype.chain = function (m) {
  return  this.cata({
    Cons: m,
    Nil: () => this
  });
}

// ap :: Apply f => f a ~> f (a -> b) -> f b
LinkedList.prototype.ap = function(m) {
  return m.chain(f => this.map(f));
}

// map :: Functor f => a ~> (a -> b) -> b
LinkedList.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) => LinkedList.Cons(f(head), tail.map(f)),
    Nil: ()=> LinkedList.Nil
  });
}

//reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
LinkedList.prototype.reduce = function(f, acc) {
  return this.cata({
    Cons: (head, tail) => tail.reduce(f, f(acc, head)),
    Nil: () => LinkedList.of(acc)
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

module.exports = LinkedList;