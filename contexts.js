const {Stream} = require('./fp/monad');

const sm = new Stream(({next, complete})=> complete(10));
sm.subscribe({
  next: a => console.log('next', a),
  complete: (a)=>  console.log('complete', a)
});