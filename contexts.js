const {Stream} = require('./fp/monad');
const request = require('request');

const ApiBreakInBad= id => new Stream(({next, complete, error})=> {
  request(
    `http://localhost:3000/posts/${id}`, 
    { json: true }, 
    (err, res, body) => err ? complete(err) : next(body))
});

const isError = x => new Stream(({next}) => next(x.toUpperCase()));
const isComplete = x => new Stream(({next}) => next(x+ '//////'));

const program = ApiBreakInBad(1);

program
  .map(x=> x['author'])
  .chain(isError)
  .chain(isComplete)
  .map(x => x+ '00000')
  .subscribe({
  next: a => console.log('next--->', a),
  complete: () =>  console.log('complete'),
  error: e => console.log(e, '<----errror')
});