const {tagged} = require ('daggy');

const Observer = tagged('Preloader', ['next']);

// of :: Aplicative f => f ~> a -> f a
Observer.of = function(x) {
  return Observer(next => next(x));
}

// ap :: Apply f => f a ~> f( a -> b) -> f b
Observer.prototype.ap = function(that) {
  return Observer(next => that.next(f => this.next(a => next(f(a)))));
}

// chain :: Chain m => m a ~> ( a -> m b) -> m b
Observer.prototype.chain = function(f) {
  
  return Observer(next => this.next(
    a => f(a).next(next)
  ));
}

// map :: Functor f => f a ~> (a -> b) -> f b
Observer.prototype.map = function(f) {
  return Observer(next => this.next(a => next(f(a))))
}

module.exports = Observer;