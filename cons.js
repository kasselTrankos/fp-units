const {LinkedList} = require('./fp/monad');
const daggy = require('daggy');
const {composeK, chain} = require('ramda');

const {map, reduce, concat, pipe} = require('ramda');
const a = [{a: 1}, {a: 2}, {a: 190}];
const b = [{a: 1}, {a: 19}, {a: 100}];
const t = LinkedList.from([1,234])
const aL = LinkedList.from(a);
const bL = LinkedList.from(b);


const { Loop, Done } = daggy.taggedSum('chainRec', {
  Done: ['b'], Loop: ['a']
})


//   console.log(ta, 'harding power', whereNext('LAX'))
const logger = List  => {
	if(!List) {
		console.log('end-< ', List)
	} else {
		const [car, cdr] = List.Cons;
		console.log(car, ' tiem car')
		logger(cdr)
	}
}

const log = (acc, elm)=> console.log('i cant belive is true: ', elm)


// chain
const _ch = x => {
  const [car, cdr] = x;
  return LinkedList.of(car + 90, cdr)
}
const _c = x => {
  const [car, cdr] = x;
  return LinkedList.of(car, LinkedList.of(cdr.Cons[0] + 200))
}
// (associativity)
//m['fantasy-land/chain'](f)['fantasy-land/chain'](g) 
// m.chain(f).chain(g)
LinkedList.from([1, 2]).chain(_ch).chain(_c).reduce(log, undefined);
// is equivalent to m['fantasy-land/chain'](x => f(x)['fantasy-land/chain'](g)) 
// chain(composeK(f, g))(m)
chain (composeK (_ch, _c)) (LinkedList.from([1, 2])).reduce(log, undefined);

