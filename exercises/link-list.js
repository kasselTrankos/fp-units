const LinkedList = require('./../fp/monad/linkedlist');
const e = LinkedList.empty();
const a = LinkedList.Cons(3, LinkedList.Cons(1, LinkedList.of(1)));
const b = LinkedList.Cons(1, LinkedList.of(2));
const c = LinkedList.Cons(1, LinkedList.Cons(3, LinkedList.of(12))); 
const arr = [1,2,3];
const m = LinkedList.fromArray(arr);


console.log(b);
const g = a.map(x => x + 2).concat(m).chain((head, tail) => LinkedList.Cons(head + 12, tail.map(x=> x + 99)))
const h = g.ap(LinkedList.of(x => x +1))
console.log(g.toArray(), m.toArray(), h.toArray(), b.toArray(), c.toArray())
// 
