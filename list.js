const {LinkedList} = require('./fp/monad');
const list = new LinkedList(1, [1, [2]]);
console.log(list, LinkedList.of(1).reduce((acc, x)=> [...acc, x + 9000], []));