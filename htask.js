const readline = require('readline');
const Task = require('./task');
const request = require('request');
const {Left, Right} = require('./either');
const {curry, chain, pipe, prop} = require('./utils');
const I = x => x;


const safeProp =  x => x ? Right(x) : Left('NO existe');


// Either -> Task
// eiterToTask :: (a -> Either e b) -> a -> Task e b
const eitherToTask = f => {
  return (...args) => {
    return new Task((reject, resolve) => {
      return f(...args).cata({
        Right: resolve,
        Left: reject
      })
    })
  }
}

const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) => (err) ? reject(err) : resolve(res))
});
const obtainName = question => new Task((_, resolve)=> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
  rl.question(question, (data) => {
    rl.close();
    resolve(data)
  });
});
/// reading this seems a reduce will be next work
// String -> Object -> Task e Right
const getProperty = key => o => eitherToTask(safeProp)(prop(key)(o))



const log = curry((tag, data) => console.log(tag, data))
const program = pipe(
  obtainName,
  chain(geUserById),
  chain(getProperty('body')),
  chain(getProperty('company')),
  chain(getProperty('name'))
);

program('preguntame el ID: ')
  .fork(console.log, log('ok: is: '))