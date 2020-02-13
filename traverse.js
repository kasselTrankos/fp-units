const ID = require('./identity');
const {liftM} = require('./utils');
const Task = require('./task');
const request = require('request');
const Either = require('./either');
const {Left, Right} = Either;
Either.of = function(x) {
  return x ? Right(x) : Left('no data')
}


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

  Array.prototype.traverse =
  function (T, f) {
    return this.reduce(
      //    Here's the map bit! vvvv
      (acc, x) => liftM(append, f(x), acc),
      T.of([]))
  }

// Don't worry, though: `sequence` can also
// be written as a super-simple `traverse`!
const sequence = (T, xs) =>
  xs.traverse(T, x => x)
  const toChar = n => n < 0 || n > 25
  ? Left(n + ' is out of bounds!')
  : Right(String.fromCharCode(n + 65))

// Right(['A', 'B', 'C', 'D'])
;[0,  1,  2,  3].traverse(Either, toChar)

// Left('-2 is out of bounds!')
;[0, 15, 21, -2].traverse(Either, toChar)

paralleliseTaskArray(rusers).fork(console.log, r=>  console.log(r.length))

// console.log(paralleliseTaskArray(rusers))