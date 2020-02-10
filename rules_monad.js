const Monad = require('./monad');
const ID = require('./identity');

// rule 1
// M['fantasy-land/of'](a)['fantasy-land/chain'](f) is equivalent to f(a) (left identity)
const f = x => console.log(x, '0000000000') ||x + 3;
const fn = s => Monad(next => next (s+ 45))
const fn1 =ID.of(x =>x + 2);

const x = 4;
Monad.of(x).chain(fn)
.next(console.log)
fn(x).next(console.log)
console.log(ID.of(x).chain(fn1), fn1.x(x));