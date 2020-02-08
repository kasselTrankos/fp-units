const Task = require('./task');
const request = require('request');
const T  = id => new Task((reject, resolve)=> request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) =>(err) ? reject(err) : resolve(res.body.name)));

const TT = time => new Task((_, resolve)=> {
  setTimeout(()=> {console.log(time) ;resolve(time)}, time);
});
const liftM = (f, ...args)=> {
  const [head, ...tail] = args;
  return tail.reduce((acc, curr)=> curr.ap(acc), head.map(f))
};



console.log(new Date())
liftM(x => y => c => b => [x, y, c, b, x],
       TT(9000),
       TT(2000),TT(3000), TT(4000)).fork(
  (error) => { console.log('something went wrong') },
  (value) => { console.log(`The value is ${value} ${new Date()}`) }
);