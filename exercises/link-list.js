const LinkedList = require('./../fp/monad/linkedlist');
console.log(LinkedList.empty)
const e = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2, 2));
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);

console.log(e.toArray(), '----emp')
console.log('a is ', a.toArray())
const g = a.chain(x => x + 2)
console.log(g.toArray())
// const r = a.concat(e)
// // console.log(a, '--------', g.toArray(), r.toArray())

