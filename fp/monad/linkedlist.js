const daggy = require("daggy");
const { fun } = require("jsverify");

const LinkedList = daggy.taggedSum('linkedList', {
  Cons: ['head', 'tail'], Nil: []
});
LinkedList.of = function(head) {
  return LinkedList.Cons(head, LinkedList.empty())
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
LinkedList.prototype.chain = function (f) {
  const y =  this.cata({
    Cons: f,
    Nil: () => this
  });
  console.log(y, '000000000', y.toArray(), '9999999')
  return y;
}

// map :: Functor f => a ~> (a -> b) -> b
LinkedList.prototype.map = function (f) {
  return this.cata({
    Cons: (head, tail) => LinkedList.Cons(f(head), tail.map(f)),
    Nil: ()=> LinkedList.Nil
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