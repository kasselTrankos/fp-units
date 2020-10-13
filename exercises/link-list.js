const LinkedList = require('./../fp/monad/linkedlist');
console.log(LinkedList.empty)
const e = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2));
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);

const g = LinkedList.of(1, a).chain(x => x + 2)
const r = a.concat(e)
console.log(a, '00000', JSON.stringify(r))

