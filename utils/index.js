const liftM = (f, ...args)=> {
  const [head, ...tail] = args;
  return tail.reduce((acc, curr)=> curr.ap(acc),head.map(f))
};
const curryN = (n, f) => {
  return function curried (...args) {
    return args.length >= n ? f(...args) : (...rest) => curried(...args, ...rest)
  }
}
const curry = (f) => curryN(f.length, f)

module.exports = {liftM, curry}