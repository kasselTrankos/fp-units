const LinkedList = require('./../fp/monad/linkedlist');
const Task = require('./../fp/monad/task');

const a = LinkedList.of(1);
const timer = id => new Task((reject, resolve)=> {
  setTimeout(()=> resolve(id+ ' -after timer'), 100);
});

Task.of(1).chain(timer).fork(console.log, console.log);

console.log(a);