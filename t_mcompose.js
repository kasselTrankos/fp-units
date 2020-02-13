const {MCompose, Identity, Monad} = require('./mcompose');
const {Just, Nothing} = require('./maybe'); 

const J = Just({a: {ba: 34}});
const i = Identity.of(4).map(x=> Identity.of(x +3)).chain(x => x); 
// const prop = key => o => o[key];
const g = Identity.of(Identity.of(0));
const add = x => y => x + y;
const lo = Identity.of(1).map(add).ap(Identity.of(90));
const prop = k => xs => (k in xs ? Just(xs[k]) : Nothing);
const data = { a: { b: { c: 2 } } };
// F.of(x).map(f) == F.of(f).ap(F.of(x))
const h = Just(data)
    .chain(x => Just(x.a))
    .chain(x=> Just(x.b))
    .chain(x=> Just(x.c))
    .chain(x=> Identity.of(x))
// const gg = prop("a")(data) // Just({ b: { c: 2 } })
//     .chain(prop("b")) // Just({ c: 2 })
//     .chain(prop("c"))
//     .chain(x=> x) // Just(2)
//map =  chain(of(x)) 
console.log( lo)
