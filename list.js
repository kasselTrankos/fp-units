const {LinkedList} = require('./fp/monad');
const list = new LinkedList(1, [1, [2]]);
const b = LinkedList.of(189).reduce((acc, x)=> [...acc, x + 9000], []);
const c = LinkedList.of(90).reduce((acc, x) => acc.concat(LinkedList.of(x)), LinkedList.of(12))
console.log(list, b, c);