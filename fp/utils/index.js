const {Left, Right} = require('./../monad/either');
const {Task} = require('./../monad');
const liftM = (f, ...args)=> {
  const [head, ...tail] = args;
  return tail.reduce((acc, curr) => curr.ap(acc), head.map(f))
};
const curryN = (n, f) => {
  return function curried (...args) {
    return args.length >= n ? f(...args) : (...rest) => curried(...args, ...rest)
  }
}
const curry = (f) => curryN(f.length, f);
const map = curry((f, xs) => xs.map(f));
const chain = curry((f, xs) => xs.chain(f));
const ap = curry((f, xs) => xs.ap(f));
const pipe = (...fns) => v => fns.reduce((x, f) => f(x), v);
const prop = curry((key, o) => o[key]);


const safeProp =  x => x ? Right(x) : Left('NO existe');


// Either -> Task
// eiterToTask :: (a -> Either e b) -> a -> Task e b
const eitherToTask = f => {
  return (...args) => {
    return new Task((reject, resolve) => {
      return f(...args).cata({
        Right: resolve,
        Left: reject
      })
    })
  }
}

/// reading this seems a reduce will be next work
// String -> Object -> Task e Right
const getProperty = key => o => eitherToTask(safeProp)(prop(key)(o));

// log :: f => (String, Any) -> String

const log = curry((msg, val)=> console.log(msg, val))

module.exports = {liftM, curry, map, chain, pipe, 
  prop, getProperty, safeProp, log, ap}