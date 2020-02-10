const Task = require('./task');
const request = require('request');
const {Right, Left} = require('./either');
const {liftM} = require('./utils');


const T  = id => new Task((reject, resolve)=> request(
    `https://jsonplaceholder.typicode.com/users/${id}`, 
    { json: true }, 
    (err, res) =>(err) ? reject(err) : resolve(res.body.name)));

const TT = time => new Task((reject, resolve)=> {
  setTimeout(()=> resolve(time), time);
});

const eitherToTask = x => new Task((reject, resolve)=> {
  x? Right(resolve(x)) : Left(reject('mal mu mal'))
});



console.log(new Date());
liftM(x => y => z => [x, y, z],
  TT(2000),TT(1000), TT(1000))
  .fork(
  (error) => { console.log('something went wrong') },
  (value) => { console.log(`The value is ${value} ${new Date()}`) }
);