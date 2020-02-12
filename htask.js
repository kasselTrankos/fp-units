const readline = require('readline');
const Task = require('./task');
const request = require('request');

const {curry, chain, pipe, getProperty} = require('./utils');
const I = x => x;




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