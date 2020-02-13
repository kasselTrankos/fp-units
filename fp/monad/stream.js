// const {tagged} = require ('daggy');

// const Stream = tagged('Stream', ['next', 'complete']);

function Stream(constrctor) {
  this._constructor = constrctor;
}

function run ({next, complete, error}) {
  const noop = () => {};
  this._constructor({
    next: next || noop,
    complete: complete || noop,
    error: error || complete
  });
} 

Stream.prototype.subscribe = function(o) {
  return run.call(this, o);
}

// of :: Aplicative f => f ~> a -> f a
Stream.of = function(x) {
  return new Stream((next) => next(x));
}

// ap :: Apply f => f a ~> f( a -> b) -> f b
Stream.prototype.ap = function(that) {
  return Stream(
    ({next, complete, error}) => {that.next(f => this.next(a => next(f(a)))),
    this.complete}
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
  return new Stream( handler => run.call(this, {
    next: x => handler.next(f(x)),
    complete: () => handler.complete(), // void, by definition you no must do nothing at this point
    error: x =>  handler.error(x) //void
  }))
}

module.exports = Stream;