const {Stream} = require('./fp/monad');
const {liftM, map, pipe, chain, ap} = require('./fp/utils');
const request = require('request');

const append = x => xs => [... xs, x];
const getByID= id => new Stream(({next, complete, error})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});
const timer = ({author, delay}) =>  console.log(author) || new Stream(({next, complete})=> {
  setTimeout(()=> console.log('ne', next) || next(author), delay);
});

Array.prototype.traverse = function (T, f) {
  return this.reduce((acc, x) => liftM(append, f(x), acc), T.of([]))
}

// insideOut :: Applicative f
//           => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
  (acc, x) => liftM(append, x, acc), T.of([]))

// paralleliseTaskArray
//   :: [Int] -> Stream e [User]
const paralleliseTaskArray = f => data => insideOut(Stream, data.map(f))
const running = f => data => console.log(data) || insideOut(Stream, data.map(f))

// :: Stream [User] -> Stream [Stream] -> Stream
const toStreamOfStreams = T => T.map(x => x.map(g => console.log(g, '0000') || new Stream(({next})=> console.log(g, ' 00000') || next(g))))



const program = pipe (
  paralleliseTaskArray(getByID),
  map(map(x => ({author: x['author'], delay: x['delay']}))),
  map(running(timer)),
);


program([1,2]).subscribe({
  next: a => a.subscribe({
    next: console.log
  }) ,//console.log('next--->', a),
  complete: () =>  console.log('complete'),
  error: e => console.log(e, '<----errror')
});