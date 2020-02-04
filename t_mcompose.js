const {MCompose, Identity, Monad} = require('./mcompose');
const {Just, Nothing} = require('./maybe'); 

const tt = Identity.of(1).ap(Identity.of(v => v *100)).chain(f => Identity.of(f + 2)).map(v=> v *10);
const sum = Just(3).chain(x=> x + 3)
console.log('0000--- >', tt, sum, Just(90))
