const LinkedList = require('./../fp/monad/linkedlist');
console.log(LinkedList.empty)
const e = LinkedList.empty();
const a = LinkedList.Cons(1, 2)
// const c = e.concat(a)
console.log(e.concat(a))
console.log(a.concat(e))

