const LinkedList = require('./../fp/monad/linkedlist');
const e = LinkedList.empty();
const a = LinkedList.Cons(1, LinkedList.of(2, 2));
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);

const g = a.chain(x => x * 122).chain(x => x + 2)
console.log(g.toArray())

