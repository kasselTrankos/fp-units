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
const timer = new Stream(({next, complete})=> next(g => g[0]));
  // let c = 0;
  // console.log(author, '102312312') 
  // const t = setInterval(()=> {
  //   if(c === delay) {
  //     console.log('01')
  //     clearInterval(t);
  //     next(author)
  //   }
  //   c+=100;
  // }, 100);
// {
  
//   // setTimeout(()=> console.log('ne', next) || next(author), delay);
// });

Array.prototype.traverse = function (T, f) {
    return this.reduce(
      //    Here's the map bit! vvvv
      (acc, x) => liftM(append, f(x), acc),
      T.of([]))
  }
const isError = x => new Stream(({next}) => next(x.toUpperCase()));
const isComplete = x => new Stream(({next}) => next(x+ '//////'));

const app = new Stream(({next, error})=> next(x=> x['author']));
// insideOut :: Applicative f
//           => [f a] -> f [a]
const insideOut = (T, xs) => xs.reduce(
  (acc, x) => liftM(append, x, acc), T.of([]))

// paralleliseTaskArray
//   :: [Int] -> Task e [User]
const paralleliseTaskArray = f => data => console.log(data) ||
  insideOut(Stream, data.map(f))
const sequence = T => xs => console.log(xs, 'asdas', T) ||
  xs.traverse(T, x => x)

const program = pipe (
  paralleliseTaskArray(getByID),
  map(map(x => ({author: x['author'], delay: x['delay']}))),
  // map(map(x=>console.log(x) || x)),
  // map(paralleliseTaskArray(timer)),
  ap(timer)
);


program([1,2,3,4,5])
  
  // .ap(app)
  // .map(x=> x + ' abdsf')
  // .chain(isError)
  // .chain(isComplete)
  // .map(x => x+ '00000')
  .subscribe({
  next: a => console.log('next--->', a),
  complete: () =>  console.log('complete'),
  error: e => console.log(e, '<----errror')
});