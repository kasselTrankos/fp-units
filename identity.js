const {tagged} = require( 'daggy');

// const Identity = tagged('Identity', ['x'])
function Identity(x) {
  this.x = x;
}

// of :: Applicative f ~> a -> f a
Identity.of = function(x) {
  return new Identity(x);
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
// luego [T [a]] -> T [a] 
Identity.prototype.chain = function(m) {
  console.log('M-> ', m)
  return Identity.of(m.x(this.x));
}

module.exports = Identity;