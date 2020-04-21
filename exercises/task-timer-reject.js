const {Task} = require('./../fp/monad');
const request = require('request');

const lift2 = a => b => f => b.ap(b.map(f));
const REJECT = time => new Task(reject=> {
  const t = setTimeout(()=> reject(time), time);
  return () => clearTimeout(t);
});
const RESOLVE = time => new Task((_, resolve)=> {
  const t = setTimeout(()=> resolve(time), time);
  return () => clearTimeout(t);
});


const T  = id => new Task((reject, resolve)=> request(
  `https://jsonplaceholder.typicode.com/users/${id}`, 
  { json: true }, 
  (err, res) =>(err) ? reject(err) : resolve(res.body.name)));  

const tempo = time => task => new Task((reject)=> {

  setTimeout(()=> {
    console.log(task, 'stop');
    task();
  }, time);
});


const timerTask = time => task => new Task((reject, resolve)=> {
  setTimeout(()=> {

  }, time);
});
const timer = timerTask(900);
const tt = RESOLVE(1).chain(x => RESOLVE(1));
const z = new Date().getTime();
const g = RESOLVE(190).or(RESOLVE(60)).or(RESOLVE(1200)).fork(console.log, (e)=> console.log(e, '012032', new Date().getTime() - z))

// const it = lift2(RESOLVE(100))(REJECT(900))(x=> y => console.log(x, y)|| [x, y])
//   .map(x=> console.log(x) || x.map(c=> c +1000))
//   .fork(
//   (error) => { console.log('something went wrong', error) },
//   (value) => { console.log(`The value is ${value} ${new Date()}`) }
// );
// // tempo(3000)(it).fork();
//   console.log(it);