const  {Monad, ID, Stream} = require('./fp/monad');

// rule 1
// M['fantasy-land/of'](a)['fantasy-land/chain'](f) is equivalent to f(a) (left identity)
const f = x => x + 3;
const fn = s => Monad(next => next (s+ 45));
const fnStream = s => Stream.of(s+ 45);
const fn1 = x => ID.of(x + 2);

const x = 4;
Stream.of(x).chain(fnStream).subscribe({next: a=> console.log('stream is', a)})
Monad.of(x).chain(fn).next(a => console.log('monad is ', a))
fn(x).next(console.log)
fnStream(x).subscribe({next: a => console.log('clean stream is same', a)})
console.log(ID.of(x).chain(fn1), '=====', fn1(x));

// rule 2
// m['fantasy-land/chain'](M['fantasy-land/of']) is equivalent to m (right identity)
// 4 === 4
Monad.of(x).chain(Monad.of).next(console.log);
console.log('===Monad==')
Monad.of(x).next(console.log)
Stream.of(x).chain(Stream.of).subscribe({next: console.log});
console.log('==Stream===')
Stream.of(x).subscribe({next: console.log})
console.log(ID.of(4).chain(ID.of), '=====', ID.of(4))