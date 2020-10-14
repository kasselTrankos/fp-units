const LinkedList = require('./../fp/monad/linkedlist');
const e = LinkedList.empty();
const a = LinkedList.Cons(3, LinkedList.Cons(1, LinkedList.of(11122)));
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);

const g = a.map(x => x + 2).chain((head, tail) => LinkedList.Cons(head + 12, tail))
console.log(g.toArray())

