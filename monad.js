const { readdirSync } = require('fs');

class Monad {
  constructor (a) {
    this.value = a;
  }
  // Applicative :: of f => a -> f a
  static of(a){
    return new Monad(a);
  }
  // Chain :: chain f a => a -> (a -> f b) -> f b 
  chain(f){
    console.log(f.toString())
    return f(this.value);
  }
};

class Task {
  constructor (a) {
    this.value = a;
  }
  // Applicative :: of f => a -> f a
  static of(a){
    return new Task(a);
  }
  // Chain :: chain f a => a -> (a -> f b) -> f b 
  chain(f){
    console.log(f.toString())
    return f(this.value);
  }
};

const i = Monad.of(1);
const d = Monad.of('./node_modules')
const c = i
  .chain(x => Monad.of(x + 12))
  .chain(v => Monad.of(v - 11));


const getfiles = d =>  Task.of(readdirSync(d));
const t = Task.of(23);

const tm = d.chain(getfiles)
console.log(i);
console.log(c);
// \a -> M a
console.log(t);
console.log(tm)