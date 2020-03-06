const {Pair, Writer} = require('./fp/monad');
const {lift} = require('ramda');
// const _pair = new Pair('hemos empezado bnin', 2);
// const _w = new Writer('no toca', 1);
// const c = _w.map(x => x + 3);
// console.log(c)

// const Id = x =>
// ({
//  x,
//  map: f => Id(f(x))
// })

// // to :: Id a -> (() -> a)
// const to = ({x}) => () => x

// // from :: (() -> a) -> Id a
// const from = f => Id(f())

// console.log(from(to(Id('hi')))) // Id(‘hi’)
// console.log(to(from(() => 'hi'))) // () => ‘hi’
const Reader = f =>
({
 run: f,
 map: g => Reader(x => g(f(x))),
 chain: g => Reader(x => g(f(x)).run(x))
})

const c = Reader(x => x.toUpperCase() + 'laso')
  .map(x => `${x} alo mo`)
  .run('hola aes ')
console.log('c->', c)
