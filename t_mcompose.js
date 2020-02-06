const {MCompose, Identity, Monad} = require('./mcompose');
const {Just, Nothing} = require('./maybe'); 

const J = Just({a: {ba: 34}});
const i = Identity.of(4).map(x=> Identity.of(x +3)).chain(x => x); 
// const prop = key => o => o[key];
const g = Identity.of(Identity.of(0));

const prop = k => xs => (k in xs ? Just(xs[k]) : Nothing);
const data = { a: { b: { c: 2 } } };
const h = Just(data)
    .chain(x => Just(x.a))
    .chain(x=> Just(x.b))
    .chain(x=> Just(x.c))
    .chain(x=>x)
// const gg = prop("a")(data) // Just({ b: { c: 2 } })
//     .chain(prop("b")) // Just({ c: 2 })
//     .chain(prop("c"))
//     .chain(x=> x) // Just(2)
console.log( h, g.chain(x=>x).chain(x => Just(Just(x +10))))
