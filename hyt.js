const {getUserById} = require('./lib');
const Task = require('./task');
const request = require('request');
const Monad  = require('./monad');
const {log, pipe, liftM, chain, map, prop} = require('./utils');
const { flatMap} = require('rxjs/operators');


const append = x => xs => [... xs, x];
const rusers = [1, 2, 3, 6];
const ApiBreakInBad= id => new Monad((next)=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => next(body || err))
  
});

// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
    (acc, x) => liftM(append, x, acc), T.of([]));
const interval = time => console.log(time, '0000000') || new Monad(next => {
  setTimeout(()=> { next(time)}, time);
}); 


ApiBreakInBad(1)
  .map(x=> x.delay)
  .chain(interval)
  .next(log('eeee: '))
// paralleliseTaskArray :: [Int] -> Task e [User]
// const getUsers = users =>
//   insideOut(Task, users.map(ApiBreakInBad));
// const program = pipe(
//   getUsers,
//   map(map(prop('delay'))),
//   map(map(x=>console.log(x) || interval(x)))

// )
// console.log('flatMap', flatMap.toString());
// program(rusers).fork(log('error'), log('ok: '))