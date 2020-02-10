const readline = require('readline');
const Task = require('./task');
const request = require('request');
const {Left, Rigth} = require('./either');
const I = x => x;

const curryN = (n, f) => {
  return function curried (...args) {
    return args.length >= n ? f(...args) : (...rest) => curried(...args, ...rest)
  }
}

const curry = (f) => curryN(f.length, f)

const prop = curry((key, o) => o[key]) 

const safe = f => curryN(f.length, (...args) => {
  const result = f(...args)
  return result === undefined ? Left('No data') : Rigth(result)
})

const safeProp = safe(prop)

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
//  .fork(console.log, console.log);


Task.of((Task.of(Left(1))))
.chain(I)
//.fork(console.log, console.log)


const log = curry((tag, data) => console.log(tag, data))

const getData = () => Task.of({ _a: 1})


// Either -> Task
// eiterToTask :: (a -> Either e b) -> a -> Task e b
const eiterToTask = (f) => {
  return (...args) => {
    return new Task((reject, resolve) => {
      return f(...args).cata({
        Rigth: resolve,
        Left: reject
      })
    })
  }
}

const map = curry((f, xs) => xs.map(f) )
const chain = curry((f, xs) => xs.chain(f) )
const pipe = (...fns) => fns.reduce((f, g) => x => f(g(x)), x => x)


const safePropA = ({ a }) => {
  return a === undefined ? Left('NO A PROP') : Rigth(a)
}

const program = pipe(
  getData,
  chain(eiterToTask(safePropA)),
  map(x => x + 1)
)

const addL = lift(add)


addL(program(), program())
.fork(log('error:'), log('data:'))