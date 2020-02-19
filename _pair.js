const {Pair} = require('./fp/monad');
const _pair = new Pair(1, 2);

const c = _pair.map(x => x + 3);
console.log(c)
