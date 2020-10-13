const { readdirSync } = require('fs');

class Monad {
  constructor (a) {
    this.value = a;
  }
  // Applicative :: of f => a -> f a
  static of(a){
    return new Monad(a);
  }

  // Functor :: map f => f a -> (a -> b) -> b 
  map(f){
    return new Monad(f(this.value));
  }

  // chain :: Chain m => m a ~> (a -> m b) -> m b
  chain (that) {
    return that(this.value);
  }
};

const d = Monad.of('./node_modules')

const tm = d.map(readdirSync)
  .chain(x => Monad.of(x.filter(g => g === '.bin')))
console.log(tm)