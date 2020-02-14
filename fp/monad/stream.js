const noop = () => {};
function Stream(constrctor) {
  this._constructor = constrctor;
}

function run ({next, complete, error}) {
  this._constructor({
    next: next || noop,
    complete: complete || noop,
    error: error || noop
  });
} 

Stream.prototype.subscribe = function(o) {
  return run.call(this, o);
}

// of :: Aplicative f => f ~> a -> f a
Stream.of = function(x) {
  return new Stream(({next}) => next(x));
}

// ap :: Apply f => f a ~> f(a -> b) -> f b
/// using a derivation of ap using m => m.chain(f => this.map(f))
Stream.prototype.ap = function(that) {
  return that.chain(f => this.map(f));
}

// flatmap :: f => f a ~> [...a] -> a a a ...
// flatmap _ [] = []  
// flatmap f (x:xs) = f x ++ flatmap f xs
Stream.prototype.flatmap = function(f) {
  return new Stream(handler=> run.call(this, {
    next: x=> x.map(v => run.call(this,  {
      next: handler.next(f(v)),
      error: handler.error,
      complete: handler.complete
    }))
    
  }));
}

// chain :: Chain m => m a ~> ( a -> m b) -> m b
Stream.prototype.chain = function(m) {
  return new Stream(handler => run.call(this, {
    next: x =>  m(x)._constructor({
      next: handler.next, 
      error: handler.error,
      complete: handler.complete
    }),
    complete: () => handler.complete(), // void, by definition you no must do nothing at this point
    error: e => handler.error(e)
  }));
}


// concat :: Semigroup f => f a ~> a -> a
// debo esperar a que termine el  current stream para juntar al siguiente stream.
Stream.prototype.concat = function (that) {
  return new Stream(handler => run.call(this, {
    next: x => handler.next(x) && run.call(that, {
      next: that.next
    })
  }));
}

// map :: Functor f => f a ~> (a -> b) -> f b
Stream.prototype.map = function(f) {
  return new Stream( handler => run.call(this, {
    next: x => handler.next(f(x)),
    complete: () => handler.complete(), // void, by definition you no must do nothing at this point
    error: x =>  handler.error(x) //
  }));
}

module.exports = Stream;