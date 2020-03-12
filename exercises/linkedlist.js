const {LinkedList} = require('./../fp/monad');
const {composeK, chain, compose} = require('ramda');

const log = message => (acc, elm)=> console.log(message, elm)

//+ seq :: Int -> Writer [Int] Int
const seq = upper => {
  const list = LinkedList.empty();
	//+ seq_ :: Int -> Writer [Int] Int
	const seq_ = ([car, cdr]) => car >= upper
  
	  // If we're done, stop here!
	  ? list.concat(LinkedList.of(upper, cdr))
  
	  // If we're not...
	  : list.concat(LinkedList.of(car + 1, LinkedList.of(car, cdr)).chain(seq_)) // ...chain(seq_)!

  
  
	// Kick everything off
	return seq_([1])
}
seq(8).reduce(log('SEQ RUNNIG: ', undefined))
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

