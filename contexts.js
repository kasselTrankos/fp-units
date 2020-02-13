const {Stream} = require('./fp/monad');
const request = require('request');

const ApiBreakInBad= id => new Stream(({next, complete})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
  
});

const program = ApiBreakInBad(1);

program
  .map(x=> x['author'])
  .subscribe({
  next: a => console.log('next', a),
  complete: (a)=>  console.log('complete', a)
});