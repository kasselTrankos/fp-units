const liftM = (f, ...args)=> {
  const [head, ...tail] = args;
  return tail.reduce((acc, curr)=> curr.ap(acc), head.map(f))
};
const curryN = (n, f) => {
  return function curried (...args) {
    return args.length >= n ? f(...args) : (...rest) => curried(...args, ...rest)
  }
}
const curry = (f) => curryN(f.length, f);
const map = curry((f, xs) => xs.map(f));
const chain = curry((f, xs) => xs.chain(f));
const pipe = (...fns) => v => fns.reduce((x, f) => f(x), v);
const prop = curry((key, o) => o[key]);

module.exports = {liftM, curry, map, chain, pipe, prop}