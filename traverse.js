const ID = require('./identity');
const {liftM} = require('./utils');
const Task = require('./task');
const request = require('request');


const append = x => xs => [... xs, x]
const rusers = [1,2,4,5, 9];
const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) => (err) ? reject(err) : resolve(res))
});
// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
  (acc, x) => liftM(append, x, acc), T.of([]));
// paralleliseTaskArray :: [Int] -> Task e [User]
const paralleliseTaskArray = users =>
  insideOut(Task, users.map(geUserById))

paralleliseTaskArray(rusers).fork(console.log, r=>  console.log(r.length))

// console.log(paralleliseTaskArray(rusers))