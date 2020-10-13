const readline = require('readline');
const request = require('request');
const { Task } = require('./../fp/monad');

const {curry, chain, pipe, getProperty} = require('./../utils');

const geUserById = id => new Task((reject, resolve) => {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) => (err) ? reject(err) : resolve(res))
}, ()=> console.log('cancel promise'));


const obtainName = question => new Task((_, resolve)=> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
  rl.question(question, (data) => {
    rl.close();
    resolve(data)
  });
}, console.log('no hacemos nada'));




const log = curry((tag, data) => console.log(tag, data))
const program = pipe(
  chain(getProperty('name')),
  chain(getProperty('company')),
  chain(getProperty('body')),
  chain(geUserById),
  obtainName,
);

const p = program('preguntame el ID: ')
  .fork(log('error is: '), log('ok: is: '));