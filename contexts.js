const {Stream} = require('./fp/monad');
const {liftM, map, pipe, chain, ap, curry} = require('./fp/utils');
const request = require('request');

const append = x => xs => console.log('5555', x, new Date()) || [... xs, x];
const concat = x => xs => xs.concat(x);
const flatmap = f => xs => xs.flatmap(f);
const getByID= id => new Stream(({next, complete, error})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});
let c = 0;
const timer = d => new Stream(({next, complete, error})=> {
  const {author, delay} = d
  
  
  setTimeout(()=> console.log(new Date(), 'next') || author=='Ra14mon' ? complete(author) : next(author+'next'+c), delay);
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
  // chain(paralleliseTaskArray(timer)),
  flatmap(x=> x),
  chain(timer)
);


program([1, 2, 3]).subscribe({
  next: a => console.log('next: ', a, new Date()),//console.log('next--->', a),
  complete: () =>  console.log('complete', new Date()),
  error: e => console.log(e, '< get - tjs---errror')
});