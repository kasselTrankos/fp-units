const {Task} = require('./../fp/monad');
const request = require('request');

const lift2 = a => b => f => b.ap(b.map(f));
const TT = time => new Task((reject, resolve)=> {
    setTimeout(()=> reject(time), time);
  });

const T  = id => new Task((reject, resolve)=> request(
  `https://jsonplaceholder.typicode.com/users/${id}`, 
  { json: true }, 
  (err, res) =>(err) ? reject(err) : resolve(res.body.name)));  

  lift2(T(1))(TT(12))(x=>y=> [x, y])
    .fork(
    (error) => { console.log('something went wrong', error) },
    (value) => { console.log(`The value is ${value} ${new Date()}`) }
  );