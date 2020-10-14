const LinkedList = require('./fp/monad/linkedlist');
const list = LinkedList.Cons(1, LinkedList.empty());
const b = LinkedList.of(189).reduce( (acc, x) => [...acc, x + 9000], []);
const c = LinkedList.Cons(90, LinkedList.of(1)).reduce((acc, x) => acc  + x, 12)
console.log( c.toArray(), c, b.toArray());