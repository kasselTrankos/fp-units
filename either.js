const {taggedSum} = require('daggy');
const Either = taggedSum('Either', {
  Right: ['x'],
  Left: ['x']
});

// chain :: Chain m => m a ~> (a -> m b) -> m b
Either.prototype.chain = function(f) {
  return this.cata({
    Right: f,
    Left: () => this
  });
}

// ap :: Apply f => f a ~> f (a -> b) -> f b
Either.prototype.ap = function(that) {
  return this.cata({
    Left: ()=> this,
    Right: x => Either.Left(that.x(x))
  });
}


// map:: Functor f => f a ~>(a -> b) -> b 
Either.prototype.map = function (f) {
  return this.cata({
    Right: x => Either.Left(f(x)),
    Left: () => this
  });
}

Either.map = Either.prototype.map;

// alt :: Alternative f =>...s
Either.prototype.alt = function (that) {
  return this.cata({
    Left: () => this,
    Rigth: () => that,
  });
}

Either.alt = Either.prototype.alt;

Either.prototype.of = function(x) {
  return this.cata({
    Right: _ => this,
    Left: () => x
  });
}

module.exports = Either;