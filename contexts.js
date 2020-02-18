const {Stream} = require('./fp/monad');
// const {liftM, map, pipe, chain, ap, curry} = require('./fp/utils');
const request = require('request');
const {chain, pipe} = require('ramda');

// const append = x => xs => [... xs, x];
// const concat = x => xs => xs.concat(x);
// const flatmap = f => xs => xs.flatmap(f);
const getByID= id => new Stream(({next, complete, error})=> {
  let _continue = true;
  request(`http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => {
      if (_continue) {
        err ? error(err) : (complete() || next(body))
      }
  });
  return ()=> {_continue = false;}
});
const timer = d => new Stream(({next, complete, error})=> {
  const {author, delay} = d
  const t = setTimeout(()=> complete() || next(d), delay);
  return ()=> clearInterval(t); // un sub
});


const program = pipe(
  Stream.from,
  chain(getByID),
  chain(timer)
);

const _unbsus = program([1, 2, 3, 4,5,6])
.subscribe({
  next: a => console.log('NEXT: ', a, new Date()),//console.log('next--->', a),
  complete: () =>  console.log('completeTTT', new Date()),
  error: e => console.log(e, '< get - tjs---errror'),
});
