const {tagged} = require( 'daggy');

function Task(computation, complete) {
  this.fork = computation;
  this.cleanup = complete || function() {};
}

// of :: Applicative f => f a ~> a -> f a
Task.of = function(x) {
  
  return new Task((_, resolve) => resolve(x));
}

// map :: Functor f ~> (a -> b) -> f b
Task.prototype.map = function(f) {
  return new Task((reject, resolve)=> {
    this.fork((a)=> reject(a), a => resolve(f(a))),
    this.cleanup
  })
}

// chain :: Chain m => m a ~> ( a -> m b) ->  m b
Task.prototype.chain = function(f) {
  return new Task((reject, resolve) => {
    this.fork(a=> reject(a), a => f(a).fork(reject, resolve)),
    this.cleanup
  });
} 

// app :: Apply f => f a ~> f(a->b) -> f b
Task.prototype.ap = function(b) {
  console.log(b, '000000');
  return new Task((reject, resolve) => {
    b.fork(a=> reject(a), f => console.log(f('w')) ||  this.fork(
      reject, 
      x => resolve(f(x)))),
    this.cleanup
  });
}

module.exports = Task;