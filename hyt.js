const {getUserById} = require('./lib');
const Task = require('./task')
const {log, pipe, liftM, map, prop} = require('./utils');

const append = x => xs => [... xs, x]
const rusers = [1, 2, 3];
const ApiBreakInBad = getUserById('http://localhost:3000/posts/');

// liftM :: Task f => f Task Task -> Task 
// insideOut :: Applicative f  => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
    (acc, x) => console.log(acc) ||  liftM(append, x, acc), T.of([]));
// paralleliseTaskArray :: [Int] -> Task e [User]
const getUsers = users =>
  insideOut(Task, users.map(ApiBreakInBad));
const program = pipe(
  getUsers,
  map(map(prop('author')))
)

program(rusers).fork(log('error'), log('ok: '))