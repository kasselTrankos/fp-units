const {tagged} = require ('daggy');

const Observer = tagged('Preloader', ['next']);
Observer.of = function(x) {
  return Obserxer(next => next(x));
}

// ap :: Apply f => f a ~> f( a -> b) -> f b
Observer.prototype.ap = function(that) {
  return Observer(next => next(that.next(f =>  this.next(a => f(a)))));
}

Observer.prototype.map = function(f) {

}

module.exports = Observer;