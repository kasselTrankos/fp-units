const {Stream} = require('./fp/monad');
const {liftM, map, pipe, chain, ap, curry} = require('./fp/utils');
const request = require('request');

const append = x => xs => [... xs, x];
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
  
  
  setTimeout(()=> next(author), delay);
});



// insideOut :: Applicative f
//           => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce((acc, x) => liftM(append, x, acc), T.of([]))

// paralleliseTaskArray
//   :: [Int] -> Stream e [User]
const paralleliseTaskArray = f => data => insideOut(Stream, data.map(f))

/// object :: f => Stream next
const counter = ()=>{
  let s =0;
  return c => new Stream(({complete, next})=> {
    s++;
    next(c)
    if(s===3) complete();
  })
};

const program = pipe (
  paralleliseTaskArray(getByID),
  // chain(paralleliseTaskArray(timer)),
  flatmap(x=> x),
  chain(timer),
  chain(counter())

);


program([1, 2, 3]).subscribe({
  next: a => console.log('send new iriigate next: ', a, new Date()),//console.log('next--->', a),
  complete: () =>  console.log('complete', new Date()),
  error: e => console.log(e, '< get - tjs---errror')
});