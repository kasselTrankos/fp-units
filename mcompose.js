function MCompose(f) {
  this._value = f;
}

MCompose.prototype.ap = function(b) {
  return MCompose.of(b.f(this.f.map))
}

MCompose.prototype.map = function(f) {
  return MCompose.of(this._value(f));
}

MCompose.of = function(f) {
  return new MCompose(f)
}
function Identity (x) {
  this.value = x;
}

// of :: Applicative f => a -> f a
Identity.of = function (x) {
  return new Identity(x);
}

// map :: Functor f => f a ~> (a -> b)-> f b
Identity.prototype.map = function(f) {
  return new Identity(f(this.value));
}

// ap :: Apply f => f a ~> f (a->b) -> f b 
Identity.prototype.ap = function(b) {
  return new Identity(b.value(this.value))
}

// chain :: Chain m => m a ~> (a  -> m b ) -> m b
Identity.prototype.chain = function(f) {
  return new Identity(f(this.value)).value;
}


function Monad(f) {
  this.value = f;
}

// of :: Applicative f => a  -> f a
Monad.of = function (x){
  return new Monad(x => x)
}
// chain :: chain  m => m a ~> (a -> m b) ->  m b 
Monad.prototype.chain = function(m) {
  return new Monad(m(this.value)).value;
}
// a :: Apply f => f a ~> f (a -> b) -> f b
Monad.prototype.ap = function(b) {
  Monad.of(b.value(this.value));
}



module.exports = {MCompose, Identity, Monad};