const List = require('./list');
const {liftM, getProperty, pipe, map, prop, safeProp, chain} = require('./utils');
const Task = require('./task');
const request = require('request');


const append = x => xs => [... xs, x]
const rusers = [1, 2, 3, 4, 5, 7, 10, 11];
const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res, body) => (err) ? reject(err) : resolve(body))
});
// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
  (acc, x) => liftM(append, x, acc), T.of([]));
// paralleliseTaskArray :: [Int] -> Task e [User]
const getUsers = users =>
  insideOut(Task, users.map(geUserById));

// const getProp = key => users => insideOut(Task, users.map(x => x.map(getProperty(key))));

// const program = pipe(
//   getUsers,

  // map(map(prop('0'))),
  // map(map(prop('name'))),
  // chain(x=> )
  // map(map(prop('nickname')))
// );

// program(rusers).fork(e=>console.log('00001111', err), r=>  console.log('00000', r))

// console.log(paralleliseTaskArray(rusers))
geUserById(1).fork(console.log, console.log)