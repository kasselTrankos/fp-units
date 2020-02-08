const {tagged} = require( 'daggy');
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
  // var forkThis = this.fork;
  // var forkThat = that.fork;
  // var cleanupThis = this.cleanup;
  // var cleanupThat = that.cleanup;

  // function cleanupBoth(state) {
  //   cleanupThis(state[0]);
  //   cleanupThat(state[1]);
  // }

  // return new Task(function(reject, resolve) {
  //   var func, funcLoaded = false;
  //   var val, valLoaded = false;
  //   var rejected = false;
  //   var allState;

  //   var thisState = forkThis(guardReject, guardResolve(function(x) {
  //     funcLoaded = true;
  //     func = x;
  //   }));

  //   var thatState = forkThat(guardReject, guardResolve(function(x) {
  //     valLoaded = true;
  //     val = x;
  //   }));

  //   function guardResolve(setter) {
  //     return function(x) {
  //       if (rejected) {
  //         return;
  //       }

  //       setter(x);
  //       if (funcLoaded && valLoaded) {
  //         console.log(funcLoaded, '0000000', valLoaded);
  //         delayed(function(){ cleanupBoth(allState) });
  //         return resolve(func(val));
  //       } else {
  //         return x;
  //       }
  //     }
  //   }

  //   function guardReject(x) {
  //     if (!rejected) {
  //       rejected = true;
  //       return reject(x);
  //     }
  //   }

  //   return allState = [thisState, thatState];
  // }, cleanupBoth);
  const _thisFork = this.fork;
  const _thatFork = that.fork;
  let fn, fLoaded = false;
  let v, vLoaded = false;
  var cleanupThis = this.cleanup;
  var cleanupThat = that.cleanup;
  function cleanupBoth(state) {
    cleanupThis(state[0]);
    cleanupThat(state[1]);
  }
  // console.log('00000', that, _thatFork);
  return new Task((reject, resolve) => {
    /////mmmm
    const guard = setter => {
      return o => {
        setter(o);
        if(fLoaded && vLoaded) {
          delayed(function(){ cleanupBoth(allState) });
          return resolve(fn(v));
        }else {
          return o;
        }
      }
    }
    const _this = _thisFork(x => reject(x), guard(x => {
      vLoaded = true;
      v = x;
    }));
    const _that = _thatFork(x=> reject(x), guard(x => {
      fLoaded = true;
      fn = x;      
    }));
    
    // var thisState = forkThis(guardReject, guardResolve(function(x) {
    //     funcLoaded = true;
    //     func = x;
    //   }));
    // that.fork(a=> reject(a), f => this.fork(
    // reject, 
    // x => {
    //   return  resolve(f(x))
    // })) , this.cleanup 
    return allState = [_this, _that];
  }, this.cleanup);
}

module.exports = Task;