const noop = () => {};
function Stream(constructor) {
  this._constructor = constructor;
}

function run ({next, complete, error}) {
  return this._constructor({
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

// flatmap :: f => f a ~> [...a] -> a a a ...
// flatmap _ [] = []  
// flatmap f (x:xs) = f x ++ flatmap f xs
Stream.prototype.flatmap = function(f) {
  
  return new Stream(handler=> run.call(this, {
    next: x=> {
      return x.map(v => run.call(this,  {
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
// join :: 
Stream.prototype.join = function() {
  let streams = 0;
  let completes = 0;
  let subs = [];
  let _stream, __stream;

  return new Stream(observer => {
    _stream = this.subscribe({
      next: stream => {
        streams++;
        // console.log('coun', streams);
        __stream = stream.subscribe({
          next: value => {
            // console.log('12-------------3 complete never complete>:; ', completes, 'streams -->', streams)
            observer.next(value);
            if(streams === completes){
              observer.complete();
            }
          },
          complete: () => {
            observer.complete();
          },
          error: observer.error
        });
        
      },
      complete: () => {
        console.log(completes, 'calla tin');
        completes++;
      }, 
      error: e => observer.error(e)
    }
  );
  return ()=> {
    _stream();
    __stream();
  }

});
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