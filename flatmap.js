const ID = require('./identity');
const List = require('./list');
const {liftM} = require('./utils');

const x = [1,2,3,4,5,56];

const fl = ID.of(x);
const tp = fl.chain(x => new List(x));
const y = liftM(x=> x * 20, tp).chain(x => ID.of(x + 100))
///inside out [f a] -> f [a]
const l = liftM(x => ID.of(x.chain(x=> x)), y);
// const insideOut = (ID, xs) => xs.reduce(
//     (acc, x) => lift2(append, x, acc), T.of([]))
// fl.map(x=> x.map(y => console.log(y)))
// liftM(x=> x.map(x => console.log('xxxx', x)), fl)
// fl.map(x=> x.map(v=> console.log(v)));
const r = ID.of(900).reduce((acc, x)=> acc + x + 1, 11409)
console.log(r)

