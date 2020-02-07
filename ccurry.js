const Task = require('./task');
const {Right, Left} = require('./either');
const request = require('request');
const readline = require('readline');


const compose = (...fns) => x => fns.reduceRight((v ,f)=> f(v), x);

const curry = (fn, ...args) =>
  (fn.length <= args.length) ?
    fn(...args) :
    (...more) => curry(fn, ...args, ...more);

/// k -> o -> v;
const prop = key => o => o[key];

// either e -> Task e Rigth     
const transformToMaybe = T => x => new Task((reject, resolve) => x 
  ? T(resolve(x)) 
  : reject('no hat nada')
);
const eitherToTask = transformToMaybe(Right);

// phase 2, normal transformation to  Task
const safeProp = x => v => compose(eitherToTask, prop(x))(v);
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

obtainName('your id is : ')
  .chain(geUserById)
  .chain(safeProp('body'))
  .chain(safeProp('name'))
  .fork(console.log, console.log)


// const add = (x, y) => x + y;
// const curriedAdd = curry(add);