const {Stream} = require('./fp/monad');
const {liftM, map, pipe, chain, ap, curry} = require('./fp/utils');
const request = require('request');


const flatmap = curry((f, xs)=> xs.flatmap(f))

const append = x => xs => [... xs, x];
const concat = x => xs => console.log(x, '000000') || xs.concat(x);
const getByID= id => new Stream(({next, complete, error})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});
const timer = d => new Stream(({next, complete, error})=> {
  const {author, delay} = d
  
  setTimeout(()=> author === 'Ramon' ? complete(author) : next(author), 123);
});

// insideOut :: Applicative f
//           => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce((acc, x) => liftM(append, x, acc), T.of([]))

// paralleliseTaskArray
//   :: [Int] -> Stream e [User]
const paralleliseTaskArray = f => data => insideOut(Stream, data.map(f))

/// object :: f => Stream next


const program = pipe (
  paralleliseTaskArray(getByID),
  flatmap(x => x),
  chain(timer),
);


program([1, 2, 3]).subscribe({
  next: a => console.log('next: ', a),//console.log('next--->', a),
  complete: () =>  console.log('complete'),
  error: e => console.log(e, '< get - tjs---errror')
});