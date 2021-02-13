const noop = () => { };

const prototype = {
  'fantasy-land/map': stream$map,
  'map': stream$map,
  'fantasy-land/chain': stream$chain,
  'fantasy-land/concat': stream$concat,
  'concat': stream$concat,
  'chain': stream$chain,
  'join': stream$join,
  'subscribe': stream$subscribe,
  'fantassy-land/ap': stream$ap,
  'ap': stream$ap,
  'concatMap': stream$concat$map,
  'merge': stream$merge,
  'mergeMap': stream$merge$map

}
function Stream(constructor) {
  const stream = Object.create(prototype)

  stream._constructor = constructor
  return stream
}

function run({ next, complete, error }) {
  return this._constructor({
    next: next || noop,
    complete: complete || noop,
    error: error || noop
  });
}

function stream$subscribe(o) {
  return run.call(this, o);
}

// of :: Aplicative f => f ~> a -> f a
Stream.of = function (x) {
  return Stream(({ next, complete }) => {
    next(x)
    complete()
    return noop
  })
}

// ap :: Apply f => f a ~> f(a -> b) -> f b
/// using a derivation of ap using m => m.chain(f => this.map(f))
function stream$ap(that) {
  return that.chain(f => this.map(f));
}

// concatMap :: 
// helper 
function stream$concat$map (f) {
  return this.chain(([head, ...tail]) => tail.reduce((acc, x) => acc.concat(f(x)), f(head)) )
}

// fantasy-land/concat :: Semigroup a => a ~> a -> a
function stream$concat(that) {
  return Stream(observer => {
    let completeThis = false
    let completeThat = false;
    const completeBoth = () => completeThis && completeThat && observer.complete()
    const unsuscribeThis = this.subscribe({
      next: x => {
        observer.next(x)
      },
      complete: ()=> {
        const unsuscribeThat = that.subscribe({
            next: x => {
              observer.next(x)
              observer.complete()
            },
          })
        return () => unsubscribeThat()
      },
    })
    return ()=> {
      // unsubscribeThat()
      unsuscribeThis()
    }
  })
}
function stream$merge$map(f) {
  return this.chain(([head, ...tail]) => tail.reduce((acc, x) => acc.merge(f(x)), f(head)) )
}

// fantasy-land/concat :: Semigroup a => a ~> a -> a
function stream$merge(that) {
  return Stream(observer => {
    let completeThis = false
    let completeThat = false;
    const completeBoth = () => completeThis && completeThat && observer.complete()
    const unsuscribeThis = this.subscribe({
      next: x => observer.next(x),
      complete: ()=> {
        completeThis = true
        completeBoth()
      },
      error: observer.error,
    })
    const unsubscribeThat = that.subscribe({
      next: x => observer.next(x),
      complete: ()=> {
        completeThat = true
        completeBoth()
      },
      error: observer.error
    })
    return ()=> {
      unsubscribeThat()
      unsuscribeThis()
    }
  })
}

// filter :: Filterable f => f a ~> (a -> Boolean ) -> f a
Stream.prototype.filter = function (f) {
  return new Stream(stream => {
    this.subscribe({
      next: x => {
        if (f(x)) stream.next(x);
      },
      complete: stream.complete,
      error: stream.error
    });
  });
}

// fantasy-land/chain :: Chain m => m a ~> (a -> m b) -> m b
function stream$chain(m) {
  // metdo
  return Stream(observer => {
    const cancel = this.subscribe({
      next: x => {
         m(x).subscribe({
            next: x => {
              observer.next(x)
            },
            complete: observer.complete
          })
          return ()=> {}
      },
      error: observer.error
    })
    return ()=> {}
  })
}

// join :: Chain m => m (m a) -> m a
// https://github.com/sanctuary-js/sanctuary/blob/v3.1.0/index.js#L1500
//  Removes one level of nesting from a nested monadic structure.
function stream$join() {
  let streams = 0;
  let completes = 0;
  const subs = [];
  let insideStream = () => {}
  return Stream(observer => {
    // first level stream
    const outsideStream = this.subscribe({
      // next
      next: stream => {
        // streams++;
        /// level inside first level
        insideStream = stream.subscribe({
          next: value => {
            console.log(value, 'ruifuffhfhfhfh')
            observer.next(value)
            observer.complete()
            // if (streams === completes) {
            //   observer.complete();
            // }
          },
          complete: observer.complete
          // complete: () => {
          //   completes++;
          //   if (completes === streams) {
          //     observer.complete();
          //   }
          // },
          // error: observer.error
        });
        // subs.push(insideStream);
      },
      // complete
      // complete: observer.complete,
      //error
      error: e => observer.error(e)
    }
    );
    return () => {
      outsideStream();
      insideStream()
      // subs.forEach(unsus => unsus())
    }
  });
}


// map :: Functor f => f a ~> (a -> b) -> f b
function stream$map(f) {
  return Stream(handler => this.subscribe({
    next: x => handler.next(f(x)),
    complete: handler.complete, // void, by definition you no must do nothing at this point
    error: handler.error //
  }));
}

// from :: Stream ~> [a] ~> Stream a
Stream.from = function (xs) {
  return new Stream(stream => {
    for (let x of xs) {
      stream.next(x);
    }
    stream.complete();
    return () => { }// unsubs
  });
}

module.exports = Stream;