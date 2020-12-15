const {Task} = require('./../fp/monad');
const request = require('request');
const {Right, Left} = require('./../fp/monad/either');
const {liftN} = require('./../utils');


const T  = id => new Task((reject, resolve)=> request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) =>(err) ? reject(err) : resolve(res.body.name)));

const TT = time => new Task((reject, resolve)=> {
  setTimeout(()=> resolve(time), time);
});

const eitherToTask = x => new Task((reject, resolve)=> {
  x === 1000 ? Right(resolve(x)) : Left(reject('mal mu mal'))
});



console.log(new Date());
liftN(x => y => z => [x, y, z],
  TT(2000),TT(1000), TT(1000))
  .fork(
  (error) => { console.log('something went wrong') },
  (value) => { console.log(`The value is ${value} ${new Date()}`) }
);