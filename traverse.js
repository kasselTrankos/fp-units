const List = require('./list');
const {liftM, getProperty, pipe, map, prop, safeProp, chain} = require('./utils');
const Task = require('./fp/monad/task');
// const Task = require('data.task')
const request = require('request');

const lift2 = (f, a, b) => a.map(f).ap(b)
const append = x => xs => [... xs, x]
const rusers = [1, 2];

Array.prototype.traverse = function (T, f) {
  return this.reduce(
    //    Herla
    (acc, x) => lift2(append, f(x), acc),
    T.of([]))
}
const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res, body) => (err) ? reject(err) : resolve(body))
});
// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
  (acc, x) => lift2(append, x, acc), T.of([2]));
// paralleliseTaskArray :: [Int] -> Task e [User]
const getUsers = users =>
  insideOut(Task, users.map(geUserById));

// const getProp = key => users => insideOut(Task, users.map(x => x.map(getProperty(key))));

// const program = pipe(
//   getUsers,
//   // map(map(prop('0'))),
//   // map(map(prop('name'))),
//   // chain(x=> )
//   // map(map(prop('nickname')))
// );

// program(rusers)
[1,2].traverse(Task, geUserById)
  .fork(e=>console.log('00001111', err), r=>  console.log('00000', r))

// console.log(paralleliseTaskArray(rusers))
// geUserById(1).fork(console.log, console.log)