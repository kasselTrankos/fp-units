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
  const delay = 900;
  const t = setTimeout(()=> {
    console.log(d, '00000')
    if(d === 2000) complete();
    return complete() || next(d)
  }, delay + d);
  return ()=> clearInterval(t); // un sub
});


const program = pipe(
  Stream.fromArray,
  // chain(getByID),
  chain(timer)
);

const _unbsus = program([1000, 2000, 3000])
.subscribe({
  next: a => console.log('NEXT: ', a, new Date()),//console.log('next--->', a),
  complete: () =>  console.log('completeTTT', new Date()),
  error: e => console.log(e, '< get - tjs---errror'),
});
// console.log(_unbsus())