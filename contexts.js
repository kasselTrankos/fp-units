const {Stream} = require('./fp/monad');
// const {liftM, map, pipe, chain, ap, curry} = require('./fp/utils');
const request = require('request');
const {chain, pipe} = require('ramda');

// const append = x => xs => [... xs, x];
// const concat = x => xs => xs.concat(x);
// const flatmap = f => xs => xs.flatmap(f);
const getByID= id => new Stream(({next, complete, error})=> {
  return request(`http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});
// let c = 0;
const timer = d => new Stream(({next, complete, error})=> {
  const {author, delay} = d
  
  const t = setTimeout(()=> next('author'), 100);
  return ()=> clearInterval(t); // un sub
});



// // insideOut :: Applicative f
// //           => [f a] -> f [a]
// const insideOut = (T, xs) => xs.reduce((acc, x) => liftM(append, x, acc), T.of([]))

// // paralleliseTaskArray
// //   :: [Int] -> Stream e [User]
// const paralleliseTaskArray = f => data => insideOut(Stream, data.map(f))

// /// object :: f => Stream next
// const counter = ()=>{
//   let s =0;
//   return c => new Stream(({complete, next})=> {
//     s++;
//     next(c)
//     if(s===3) complete();
//   })
// };

// const program = pipe (
//   chain(timer)
//   // paralleliseTaskArray(getByID),
//   // chain(paralleliseTaskArray(timer)),
//   // flatmap(x=> x),
//   // chain(timer),
//   // chain(counter())

// );


Stream.of(1)
.chain(getByID)
.chain(timer)
.subscribe({
  next: a => console.log('NEXT: ', a, new Date()),//console.log('next--->', a),
  complete: () =>  console.log('completeTTT', new Date()),
  error: e => console.log(e, '< get - tjs---errror')
});