const Option = require("fantasy-options");
const Either = require("fantasy-eithers");
const Task = require("data.task");
const { tagged } = require("daggy");

const { Some, None } = Option;
const { Left, Right } = Either;

const Pair = tagged("Pair", ["_1", "_2"]);

//+ prop :: String -> StrMap a -> a
const prop = k => xs => (k in xs ? Some(xs[k]) : None);

const data = { a: { b: { c: 2 } } };
const map = f => xs => xs.map(f);

console.log(
  // How do we get to the 2?
  prop("a")(data) // Some({ b: { c: 2 } })
    .map(prop("b")) // Some(Some({ c: 2 }))
    .map(map(prop("c"))) // Some(Some(Some(2)))
);

console.log(
  // And if we fail?
  prop("a")(data) // Some({ b: { c: 2 }})
    .map(prop("badger")) // Some(None)
    .map(map(prop("c"))) // Some(None)
);

///////////////////////////

//+ join :: Option (Option a) ~> Option a
Option.prototype.join = function() {
  return this.cata({
    Some: x => x,
    None: () => None
  });
};

console.log(
  prop("a")(data) // Just({ b: { c: 2 } })
    .map(prop("b"))
    .join() // Just({ c: 2 })
    .map(prop("c"))
    .join() // Just(2)
);

console.log(
  prop("a")(data) // Just({ b: { c: 2 } })
    .map(prop("badger"))
    .join() // Nothing
    .map(prop("c"))
    .join() // Nothing
);

///////////////////////////

//+ chain :: Option a ~> (a -> Option b)
//+                  -> Option b
Option.prototype.chain = function(f) {
  return this.cata({
    Some: f,
    None: () => this // Do nothing
  });
};

// Just like `sequence` is `traverse` with
// `id`,  `join` is `chain` with `id`!
//+ join :: Chain m => m (m a) ~> m a
const join = xs => xs.chain(x => x);

console.log(
  // Our example one more time...
  prop("a")(data) // Just({ b: { c: 2 } })
    .chain(prop("b")) // Just({ c: 2 })
    .chain(prop("c")) // Just(2)
);

///////////////////////////

//+ chain :: Either e a
//+       ~> (a -> Either e b)
//+       -> Either e b
Either.prototype.chain = function(f) {
  return this.cata({
    Right: f,
    Left: _ => this // Do nothing
  });
};

const sqrt = x => (x < 0 ? Left("Hey, no!") : Right(Math.sqrt(x)));

console.log(
  Right(16)
    .chain(sqrt) // Right(4)
    .chain(sqrt) // Right(2)
);

console.log(
  Right(81)
    .chain(sqrt) // Right(9)
    .map(x => -x) // Right(-9) 😮
    .chain(sqrt) // Left('Hey, no!')
    .map(x => -x) // Left('Hey, no!')
);

console.log(
  Left("eep").chain(sqrt) // Left('eep')
);

///////////////////////////

//+ chain :: Array a
//+       ~> (a -> Array b)
//+       -> Array b
Array.prototype.chain = function(f) {
  // Map, then concat the results.
  return [].concat(...this.map(f));
};

// NB: **totally** made up.
const flights = {
  ATL: ["LAX", "DFW"],
  ORD: ["DEN"],
  LAX: ["JFK", "ATL"],
  DEN: ["ATL", "ORD", "DFW"],
  JFK: ["LAX", "DEN"]
};

//- Where can I go from airport X?
//+ whereNext :: String -> [String]
const whereNext = x => flights[x] || [];

console.log(
  // JFK, ATL
  whereNext("LAX")
    // LAX, DEN, LAX, DFW
    .chain(whereNext)
    // JFK, ATL, ATL, ORD, DFW, JFK, ATL
    .chain(whereNext)
);

///////////////////////////

//- An ugly implementation for range.
//+ range :: (Int, Int) -> [Int]
const range = (from, to) => [...Array(to - from)].map((_, i) => i + from);

//- The example from that link in JS.
//+ factors :: Int -> [Pair Int Int]
const factors = n =>
  range(1, n).chain(a =>
    range(1, a).chain(b => (a * b !== n ? [] : [Pair(a, b)]))
  );

// (1, 20), (2, 10), (4, 5),
// (5, 4), (10, 2), (20, 1)
console.log(factors(20));

///////////////////////////

// A "sequential" async type.
const Promise = require("fantasy-promises");

//- Convert a Task to a Promise
//+ taskToPromise :: Task e a
//+               -> Promise (Either e a)
const taskToPromise = task =>
  new Promise(res => task.fork(e => res(Left(e)), x => res(Right(x))));

//+ promiseToTask :: Promise (Either e a)
//+               -> Task e a
const promiseToTask = promise =>
  new Task((rej, res) =>
    promise.fork(either =>
      either.cata({
        Left: rej,
        Right: res
      })
    )
  );

//- Finally...
//+ andThen :: Task e a ~> (a -> Task e b)
//+                     -> Task e b
Task.prototype.andThen = function(f) {
  return promiseToTask(
    taskToPromise(this).chain(either =>
      either.cata({
        // We "lift" failure using Promise'
        // Applicative instance.
        Left: _ => Promise.of(either),

        Right: x => taskToPromise(f(x))
      })
    )
  );
};

// Some "stubs" to mock AJAX.
const getUser = email => Task.of(12);
const getFriends = id => Task.of([id + 1, id + 2]);

//- ... which gives us:
getUser(12)
  .andThen(getFriends)
  .fork(console.error.bind(console), console.log.bind(console));

///////////////////////////

//+ No intermediate type!
Task.prototype.andThen = function(f) {
  return new Task((rej, res) => this.fork(rej, x => f(x).fork(rej, res)));
};

//- ... which gives us:
getUser(12)
  .andThen(getFriends)
  .fork(console.error.bind(console), console.log.bind(console));