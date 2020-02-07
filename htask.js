const readline = require('readline');
const Task = require('./task');
const request = require('request');
const {Left, Rigth} = require('./either');
const I = x => x;

const prop = key => o => key in o
  ? Task.of(Left(o[key]).chain(I))
  : Task.of(Rigth('no data').chain(I));

const geUserById = id => new Task((reject, resolve)=> {
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
const LiftM2 = (f, a, b)=> {} 

obtainName('preguntame el ID: ')
  // .map(x => x.split(' '))
  .chain(geUserById)
  // .chain(tranverse('body.company.name'))
  .chain(prop('body'))
  .chain(prop('company'))
  .chain(prop('name'))
  .fork(console.log, console.log);
