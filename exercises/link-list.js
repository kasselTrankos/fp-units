const LinkedList = require('./../fp/monad/linkedlist');
console.log(LinkedList.empty)
const e = LinkedList.empty();
const a = LinkedList.Cons(1, 2);
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);

console.log(JSON.stringify(m))
console.log(m, m.toArray())
// const c = e.concat(a)
console.log(e.concat(a))
console.log(a.concat(e))

