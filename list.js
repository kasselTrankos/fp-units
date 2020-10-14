const LinkedList = require('./fp/monad/linkedlist');
const list = LinkedList.Cons(1, LinkedList.empty());
const b = LinkedList.of(189).reduce( (acc, x) => [...acc, x + 9000], []);
const c = LinkedList.of(90).reduce((acc, x) => 12  + x, 12)
console.log(list, b, b.toArray(), c.toArray());