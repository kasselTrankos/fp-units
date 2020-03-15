// this is an exampl from harding
// about pair as container of monad
const daggy = require('daggy');
const {Stream} = require('./fp/monad')

const Pair = T => {
  const Pair_ = daggy.tagged('Pair', ['_1', '_2'])

  Pair_.prototype.map = function (f) {
    return Pair_(this._1, f(this._2))
  }

  Pair_.prototype.ap = function (fs) {
    return Pair_(fs._1.concat(this._1),
                  fs._2(this._2))
  }

  Pair_.prototype.chain = function (f) {
    const that = f(this._2)

    return Pair_(this._1.concat(that._1), that._2)
  }

  //+ chainRec
  //+   :: Monoid m
  //+   => (a -> Pair m (Step b a), a)
  //+   -> (m, b)
  Pair_.chainRec = function (f, init) {
    // Start off "empty"
    let acc = T.empty()

    // We have to loop at least once
      , step = Loop(init)

    do {
      // Call `f` on `Loop`'s value
      const result = f(step.a)

      // Update the accumulator,
      // as well as the current value
      acc  = acc.concat(result._1)
      step = result._2
    } while (step instanceof Loop)

    // Pull out the `Done` value.
    return Pair_(acc, step.b)
  }

  Pair_.of = x => Pair_(T.empty(), x)

  return Pair_
}

const Streamer = T => {
  const Pair_ = daggy.tagged('Pair', ['_1', '_2']);
  Pair_.prototype.chain = function (f) {
    const that = f(this._2)

    return Pair_(this._1.concat(that._1),
                 that._2)
  }
  Pair_.prototype.map= function(f) {
    return Pair_(this._1, this._2.map(f))
  }
  // of :: Applicative f => f a ~> a -> f a  
  Pair_.of = x => Pair_(T.empty(), x);
  const noop = ()=> {}
  Pair_.prototype.subscribe = function({next, complete, error}) {
    return this._2.subscribe({
      next: next || noop,
      complete: complete || noop,
      error: error || noop
    });
  }
  return Pair_;

};
const timer = (time = 800) => new Stream(handler => {
  return setTimeout(()=> {
    handler.next('cutit');
    handler.complete();
  }, time)
});

// timer(200).subscribe({next: console.log, error: console.error});
const st = Streamer(Stream);
const k = st.of(timer(100))
  .map(x=>  x + 'A lva ')
  .subscribe({next: c => console.log(c), error: console.error});