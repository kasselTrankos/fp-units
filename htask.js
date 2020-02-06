const readline = require('readline');
const Task = require('./task');
const request = require('request');
const {Left, Rigth} = require('./either');

const prop = key => o => key in o ? Task.of(Left(o[key]).x) : Task.of(Rigth('no data'));

const geUserById = id => new Task((reject, resolve)=> {
  request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) => (err) ? reject(err) : resolve(res))
});
const ioReadLine = question => new Task((reject, resolve)=> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
  rl.question(question, (data) => {
    rl.close();
    resolve(data)
  });
});
const LiftM2 = (f, a, b)=> {} 
ioReadLine('preguntame el ID: ')
  .chain(geUserById)
  .chain(prop('body'))
  .chain(prop('name'))
  
  .fork(console.log, console.log);
