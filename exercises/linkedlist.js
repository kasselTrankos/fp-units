const {LinkedList} = require('./../fp/monad');
const {composeK, chain, compose} = require('ramda');

const log = message => (acc, elm)=> console.log(message, elm)


// chain
const _ch = x => {
  const [car, cdr] = x;
  return LinkedList.of(90, LinkedList.of(car, cdr))
}
const _c = x => {
  const [car, cdr] = x;
  const [head, tail] = cdr.Cons;
  return LinkedList.of(car, LinkedList.of(head + 200, tail))
}
// (associativity)
//m['fantasy-land/chain'](f)['fantasy-land/chain'](g) 
// m.chain(f).chain(g)
LinkedList.from([1, 2, 3]).chain(_ch).chain(_c).reduce(log(`Associative chainging ${new Date().getTime()}: `), undefined);
console.log('===================')
// is equivalent to m['fantasy-land/chain'](x => f(x)['fantasy-land/chain'](g)) 
// chain(composeK(f, g))(m)
chain (composeK (_c, _ch)) (LinkedList.from([1, 2, 3])).reduce(log(`Associative compose ${new Date().getTime()} : `), undefined);

