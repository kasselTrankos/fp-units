const {getUserById} = require('./lib');
const Task = require('./task');
const request = require('request');
const Monad  = require('./fp/stream');
const {log, pipe, liftM, chain, map, prop} = require('./utils');
const { flatMap} = require('rxjs/operators');


const append = x => xs => [... xs, x];
const rusers = [1, 2, 3, 6];
const ApiBreakInBad= id => new Monad((next, complete)=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
  
});

// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
    (acc, x) => liftM(append, x, acc), T.of([]));

const interval = times => insideOut(Monad, times.map(time => new Monad((next, complete) => {
  setTimeout(()=> {console.log(time, 'addd ');  next(time)}, time);
})));

// paralleliseTaskArray :: [Int] -> Task e [User]
const getUsers = users =>
  insideOut(Monad, users.map(ApiBreakInBad));

const program = pipe(
  getUsers,
  map(map(prop('delay'))),
  chain(interval)
);
program(rusers)
  .next(log('get: '))
// merge googd
// ApiBreakInBad(1)
//   .map(x=> x.delay)
//   .chain(interval)
//   .next(log('eeee: '))


// const program = pipe(
//   getUsers,
//   map(map(prop('delay'))),
//   map(map(x=>console.log(x) || interval(x)))

// )
// console.log('flatMap', flatMap.toString());
// program(rusers).fork(log('error'), log('ok: '))