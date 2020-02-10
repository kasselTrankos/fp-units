const ID = require('./identity');
const List = require('./list');
const {liftM} = require('./utils');

const x = [1,2,3,4,5,56];

const fl = ID.of(x);
const tp = fl.chain(x => new List(x));
const y = liftM(x=> x * 20, tp).chain(x => ID.of(x + 100))
const l = liftM(x => ID.of(x.chain(x=> x)), y);
// fl.map(x=> x.map(y => console.log(y)))
// liftM(x=> x.map(x => console.log('xxxx', x)), fl)
// fl.map(x=> x.map(v=> console.log(v)));
console.log(tp, y, l)

