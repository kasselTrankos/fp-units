const LinkedList = require('./../fp/monad/linkedlist');
const e = LinkedList.empty();
const a = LinkedList.Cons(3, LinkedList.Cons(1, LinkedList.of(1)));
const b = LinkedList.Cons(1, LinkedList.of(2));
const c = LinkedList.Cons(1123, LinkedList.Cons(3, LinkedList.of(12)));
const n = LinkedList.of(3);
const arr = [231,2,3];
const m = LinkedList.fromArray(arr);
const xx = [90, 91, 190];
const append = xs => x => [...xs, x];
const lift2 = a => b => f => b.ap(a.map(f));
const conver = xx => xx.reduce((acc, x)=> lift2(acc)(LinkedList.of(x + 190))(append), LinkedList.of([]));

const r = conver(xx)

const g = a.map(x => x + 2).concat(m).concat(c).concat(e).chain((head, tail) => LinkedList.Cons(`${head}- 0`, tail.map(x=> x + 99)))
const h = g.ap(LinkedList.of(x => x +1)).concat(LinkedList.fromArray([ 90, 99, 109])).concat(e).map(x => x + 3);
const j = n.concat(m);
console.log(g.toArray(), h.toArray(), r.toArray(), j.toArray())
// 
