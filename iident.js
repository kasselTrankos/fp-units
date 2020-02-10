const {Just, Nothing} = require('./maybe');
const Identity = require('./identity');
const I = x => x;
const plus100 = x => x + 100;
const im = new Identity([10]);
const deriv = new Identity(10)
// derivation of map
// a.map = a.chain(f => b.of(f))
// lift
// b.ap(a.map(f))
// mine flatmap
// a.chain(b.f(x.map))

const x = [1,3,4,5];
const y = [90, 75, 89, [89, 90]];

// creando esta derivacion tal y como dice Fantasy-land
const r1 = deriv.map(plus100);
const dR = deriv.chain(Identity.of(plus100));

console.log(r1, '00000', dR, y.map(I))