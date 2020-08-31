const readline = require('readline');
const {Task} = require('./fp/monad');
const request = require('request');

const {curry, chain, pipe, getProperty} = require('./utils');
const I = x => x;

const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) => (err) ? reject(err) : resolve(res))
}, ()=> console.log('madriod'));
const obtainName = question => new Task((_, resolve)=> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
  rl.question(question, (data) => {
    rl.close();
    resolve(data)
  });
}, console.log('no hacemos nada'));




const log = curry((tag, data) => console.log(tag, data))
const program = pipe(
  obtainName,
  chain(geUserById),
  chain(getProperty('body')),
  chain(getProperty('company')),
  chain(getProperty('name'))
);

// const p = program('preguntame el ID: ')
//   .fork(console.log, log('ok: is: '));

Task.of(1)
  .ap(Task.of(c => c + 119))
  .fork(console.error, console.log)