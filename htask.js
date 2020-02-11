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
const eiterToTask = f => {
  return (...args) => {
    console.log(f(...args), '00000000');
    return new Task((reject, resolve) => {
      return f(...args).cata({
        Right: resolve,
        Left: reject
      })
    })
  }
}
const eitherToTask = x => new Task((reject, resolve)=> {
  console.log(either.prototype.cata)
  return either.prototype.cata({
    Right: resolve(x),
    Left: reject('error')
  });
})



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

const getProperty = key => o => Task.of(prop(key)(o))

// obtainName('preguntame el ID: ')
//   // .map(x => x.split(' '))
//   .chain(geUserById)
//   // .chain(tranverse('body.company.name'))
//   .chain(getProperty('body'))
//   .chain(getProperty('company'))
//   .chain(getProperty('name'))
//   // .chain(prop('company'))
//   // .chain(prop('name'))
// .fork(console.log, console.log);


// Task.of((Task.of(Left(1))))
// .chain(I)
//.fork(console.log, console.log)


const log = curry((tag, data) => console.log(tag, data))

const getData = () => Task.of({ _a: 1})





const program = pipe(
  obtainName,
  chain(geUserById),
  chain(getProperty('body')),
  chain(getProperty('company')),
  chain(getProperty('name'))
);
eitherToTask(1).fork(log('err; '), log('aci; '))
// program('preguntame el ID: ').fork(console.log, log('ok: is: '))
//eiterToTask(safeProp)(prop('a')({a:1})).fork();
//.fotk(log('error: '), log('ok: '))
/*
code class maurice review 





const program = pipe(
  getData,
  chain(eiterToTask(safePropA)),
  map(x => x + 1)
)
const add = x => y => x + y;
const addL = liftM(add, program(), program())


addL.fork(log('error:'), log('data:'))
*/