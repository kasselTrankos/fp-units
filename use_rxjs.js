const Task = require('data.task');
const request = require('request');
const getByID= id => new Task((reject, resolve)=> {
    request(
      `http://localhost:3000/posts/${id}`, 
      { json: true }, 
      (err, res, body) =>console.log(new Date(), '123123')|| err ? reject(err) : resolve(body))
  });
const taskA = getByID(3);
const taskB = getByID(2)
const taskC = taskB.concat(taskA).fork(console.log, console.log);
console.log(taskC)