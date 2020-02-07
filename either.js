const {taggedSum} = require('daggy');
const Either = taggedSum('Either', {
    Rigth: ['x'],
    Left: ['x']
});

// chain :: Chain m => m a ~> (a -> m b) -> m b
Either.prototype.chain = function(f) {
  return this.cata({
    Left: f,
    Rigth: () => this
  });
}

// ap :: Apply f => f a ~> f (a -> b) -> f b
Either.prototype.ap = function(that) {
  console.log(that, '0999999')
  return this.cata({
    Rigth: ()=> this,
    Left: x => Either.Left(that.x(x))
  });
}


// map:: Functor f => f a ~>(a -> b) -> b 
Either.prototype.map = function (f) {
  return this.cata({
    Left: x => Either.Left(f(x)),
    Rigth: () => this
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
      Left: _ => this,
      Rigth: () => x
  });
}

Either.of = Either.prototype.of;

module.exports = Either;