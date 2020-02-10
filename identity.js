// const Identity = tagged('Identity', ['x'])
function Identity(x) {
  this.x = x;
}

// of :: Applicative f ~> a -> f a
Identity.of = function(x) {
  return new Identity(x);
}

// ap :: Apply f ~> f a -> f (a -> b) -> f b
Identity.prototype.ap = function(that){
  return Identity.of(that.x(this.x))
}

// map :: Functor  f => f a ~> (a -> b) -> f b
Identity.prototype.map = function(f){
  return Identity.of(f(this.x));
}
// chain  :: Chain m => m a ~> (a -> m b) -> m b
// si reemplazo m por [] (Array)
// tenemos a ->[b] -> [b]
// si lo reemplazo m por una f(Function)
//tenemos a -> f(b) -> f(b)
// luego [T a] -> T [a] 
Identity.prototype.chain = function(that) {
  return that(this.x);
}

module.exports = Identity;