const {Stream} = require('./fp/monad');
const {liftM, map, pipe, chain, ap} = require('./fp/utils');
const request = require('request');

const append = x => xs => [... xs, x];
const concat = x => xs => console.log(x, '000000') || xs.concat(x);
const getByID= id => new Stream(({next, complete, error})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});
const timer = ({author, delay}) =>  console.log(author) || new Stream(({next, complete})=> {
  setTimeout(()=> console.log('ne', author, delay) || next(author), delay);
});

// insideOut :: Applicative f
//           => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce((acc, x) => liftM(append, x, acc), T.of([]))
const outter = (T, xs) => xs.reduce((acc, x) => liftM(concat, x, acc), T.of([]))

// paralleliseTaskArray
//   :: [Int] -> Stream e [User]
const paralleliseTaskArray = f => data => insideOut(Stream, data.map(f))
const running = f => data => console.log(insideOut(Stream, data.map(f)), '000001') || insideOut(Stream, data.map(f))

// :: Stream [User] -> Stream [Stream] -> Stream
const toStreamOfStreams = T => T.map(x => x.map(g => console.log(g, '0000') || new Stream(({next})=> console.log(g, ' 00000') || next(g))))



const program = pipe (
  paralleliseTaskArray(getByID),
  map(map(x => ({author: x['author'], delay: x['delay']}))),
  chain(running(timer)),
);


program([1,2,3]).subscribe({
  next: a => console.log('es muy mierdos', a),//console.log('next--->', a),
  complete: () =>  console.log('complete'),
  error: e => console.log(e, '<----errror')
});