const noop = () => {};
let completed = false;
function Stream(constructor) {
  this._constructor = constructor;
  this.completed = false;
}

function run ({next, complete, error}) {
  return this._constructor({
    next: x =>  {
      return !completed && next(x) || noop();
    },
    complete: () => {
      completed = true;
      return complete() || noop()
    },
    error: error || noop
  });
} 

Stream.prototype.subscribe = function(o) {
  return run.call(this, o);
}

// of :: Aplicative f => f ~> a -> f a
Stream.of = function(x) {
  return new Stream(({next}) =>{
    next(x);
    return ()=> {} // unsubs
  });
}

// ap :: Apply f => f a ~> f(a -> b) -> f b
/// using a derivation of ap using m => m.chain(f => this.map(f))
Stream.prototype.ap = function(that) {
  return that.chain(f => this.map(f));
}

// filter :: Filterable f => f a ~> (a -> Boolean ) -> f a
Stream.prototype.filter = function(f) {
  return new Stream(stream => {
    this.subscribe({
      next: x => {
        if(f(x)) stream.next(x);
      },
      complete: stream.complete,
      error: stream.error
    });
  });
}

// flatmap :: f => f a ~> [...a] -> a a a ...
// flatmap _ [] = []  
// flatmap f (x:xs) = f x ++ flatmap f xs
Stream.prototype.flatmap = function(f) {
  
  return new Stream(handler=> this.subscribe({
    next: x=> {
      return x.map(v => this.subscribe({
      next: handler.next(f(v)),
      error: handler.error,
      complete: handler.complete
    }))
  }
    
  }));
}
// chain :: Chain m => m a ~> ( a -> m b) -> m b
Stream.prototype.chain = function(m) {
  return this.map(m).join();
}
// join :: Stream (Stream a) ~> Stream a
Stream.prototype.join = function() {
  let streams = 0;
  let completes = 0;
  const subs = [];

  return new Stream(observer => {
    const _stream = this.subscribe({
      next: stream => {
        streams++;
        const __stream = stream.subscribe({
          next: value => {
            observer.next(value);
            if(streams === completes){
              observer.complete();
            }
          },
          complete: () => {
            completes++;
          },
          error: observer.error
        });
        subs.push(__stream);
      },
      complete: () => {
        if(completes === streams){
          observer.complete();
        }
      }, 
      error: e => observer.error(e)
    }
  );
  return ()=> {
    _stream();
    // this is a techique to no run second stream untill is created. so [undefined]
    // then no run anything
    subs.forEach(unsus => unsus())
  }
});
}


// map :: Functor f => f a ~> (a -> b) -> f b
Stream.prototype.map = function(f) {
  return new Stream( handler => this.subscribe({
    next: x => handler.next(f(x)),
    complete: () => handler.complete(), // void, by definition you no must do nothing at this point
    error: x =>  handler.error(x) //
  }));
}

// empty :: Semigroup a => a ~> a -> () -> a
Stream.empty = function() {
  return new Stream(handler => handler.next())
}

// from :: Stream ~> [a] ~> Stream a
Stream.fromArray = function(xs) {
  return new Stream(stream => {
    for(let x of xs){
      stream.next(x);
    }
    // stream.complete();
    return ()=> {}// unsubs
  });
}

module.exports = Stream;