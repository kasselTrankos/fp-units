const {tagged} = require ('daggy');

const Stream = tagged('Stream', ['next', 'complete']);

// of :: Aplicative f => f ~> a -> f a
Stream.of = function(x) {
  return Stream(next => next(x), ()=> {});
}

// ap :: Apply f => f a ~> f( a -> b) -> f b
Stream.prototype.ap = function(that) {
  return Stream(
    next => that.next(f => this.next(a => next(f(a)))),
    this.complete
  );
}

// chain :: Chain m => m a ~> ( a -> m b) -> m b
Stream.prototype.chain = function(f) {
  return Stream(next => this.next(
    a => f(a).next(next),
    this.complete
  ));
}

// map :: Functor f => f a ~> (a -> b) -> f b
Stream.prototype.map = function(f) {
  return Stream(
    next => this.next(a => next(f(a))),
    this.complete
  );
}

module.exports = Stream;