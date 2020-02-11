const readline = require('readline');
const Task = require('./task');
const request = require('request');
const either = require('./either');
const {liftM, curry} = require('./utils');
const I = x => x;
const {Left, Right} = either;

const prop = curry((key, o) => o[key]);
const safeProp =  x => x ? Right(x) : Left('NO A PROP');
const map = curry((f, xs) => xs.map(f) )
const chain = curry((f, xs) => xs.chain(f) )
const pipe = (...fns) => v => fns.reduce((x, f) => f(x), v)
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



const safe = f => curryN(f.length, (...args) => {
  const result = f(...args)
  return result === undefined ? Left('No data') : Rigth(result)
})

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