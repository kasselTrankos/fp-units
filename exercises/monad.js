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
const getOnly = x => g => g === x;
Monad.of('./node_modules')
const tm = Monad.of('./node_modules').map(readdirSync)
  .chain(x => Monad.of(x.filter(getOnly('.bin'))))
console.log(tm)