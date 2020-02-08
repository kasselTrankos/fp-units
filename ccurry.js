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

// const query = 
const ask = question => new Task((_, resolve)=> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
  rl.question(question, (data) => {
    rl.close();
    resolve(data)
  });
});

const T  = xs => new Task((reject, resolve)=> xs.map(id => request(
  `https://jsonplaceholder.typicode.com/users/${id}`, 
  { json: true }, 
  (err, res) => (err) ? reject(err) : resolve(res))));
  // function ap(m) { return m['fantasy-land/chain'](f => this['fantasy-land/map'](f)); }
const lift2F = (f, as, bs) => console.log(as, bs) ||  as.ap(bs.map(f));
// const AP = Task.of(x=> x.map(f => f.concat()))
const tt = Task.of(x=> console.log(x, 'im fun') || setTimeout(()=> {}, x));
var t2 = new Task(function(reject, resolve) {

  console.log(new Date())
  setTimeout(function() {
    console.log(new Date())
    resolve('1999');
  }, 1000);
});
var t1 = new Task(function(reject, resolve) {
  t1_status = 'running';
  
  console.log(new Date())
  setTimeout(function() {
    console.log(new Date())
    resolve(function(x){
      return x + 1;
    });
  }, 2000);
});
t1.ap(t2).fork(console.log, console.log);
// const vv = lift2F(x=> x, Task.of(10000), tt).fork(console.log, console.log);

// Task.of(1010)
//   .ap(tt)
//   .fork(console.log, x=> x)
// const a = Task.of([100, [1, 21]]);
//   lift2F(x=> x, a, AP)
//   .fork(console.log, console.log);
// Task.of([1,2,3,4,5,6,6,7,9,10])
// // Task.of('1,2,3,4,5,6,6,7')
//     // .map(x => x.split(','))
//   // .ap(Task.of(x => console.log(new Date().getTime()) ||  x.split(',')))
//   .chain(T)
//   .chain(safeProp('body'))
//   .chain(safeProp('name'))
//   .fork(console.log, console.log)

// ask('your id is : ')
//   .ap(Task.of(x => x.split(' ')))
//   // .chain(geUserById)
//   // .chain(safeProp('body'))
//   // .chain(safeProp('name'))
//   .fork(console.log, console.log)


// const add = (x, y) => x + y;
// const curriedAdd = curry(add);