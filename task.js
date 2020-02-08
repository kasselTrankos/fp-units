var delayed = typeof setImmediate !== 'undefined'?  setImmediate
            : typeof process !== 'undefined'?       process.nextTick
            : /* otherwise */                       setTimeout
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

// ----- Applicative (Task a)
// ap(f) {
//   return this.chain(fn => f.map(fn));
// }


// app :: Apply f => f a ~> f(a->b) -> f b
Task.prototype.ap = function(that) {
  const _thisFork = this.fork;
  const _thatFork = that.fork;
  let fn, fLoaded = false;
  let v, vLoaded = false;
  let cleanupThis = this.cleanup;
  let cleanupThat = that.cleanup;
  let rejected = false;
  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }
  return new Task((reject, resolve) => {
    const guardReject = x => {
      if (!rejected) {
        rejected = true;
        return reject(x);
      }
    }
    const guard = setter => {
      return x => {
        setter(x);
        if(fLoaded && vLoaded) {
          delayed(function(){ cleanupBoth(allState) });
          return resolve(fn(v));
        }else {
          return x;
        }
      }
    }
    const _this = _thisFork(guardReject, guard(x => {
      vLoaded = true;
      v = x;
    }));
    const _that = _thatFork(guardReject, guard(x => {
      fLoaded = true;
      fn = x;      
    }));
    
    return allState = [_this, _that];
  }, this.cleanup);
}

module.exports = Task;