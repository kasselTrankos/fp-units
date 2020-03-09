const {LinkedList} = require('./fp/monad');
const {map, reduce, concat, pipe} = require('ramda');
const a = [{a: 1}, {a: 2}, {a: 190}];
const b = [{a: 1}, {a: 19}, {a: 100}];
const aL = LinkedList.from(a);
const bL = LinkedList.from(b);

const log = List  => {
	if(!List) {
		console.log('end')
	} else {
		const [car, cdr] = List.Cons;
		console.log(car, ' tiem car')
		log(cdr)
	}
}
const sum = (acc, List) => {
	if(List) {
		const [car, cdr] = List.Cons;
		return sum(acc + car, cdr)
	}
	return acc;
}
// log(aL)
// const n = aL.reduce((acc, e) => ({...acc, ...e}),  {})
const fm = item => ({a: item.a +1, b: item.a -1});
const mapped = aL.map(fm);
const run = pipe(
  concat(aL),
  map(fm),
  reduce((acc, elm)=> console.log('i cant belive is true: ', elm), undefined),
);
run(bL)
// const concated = aL.concat(bL).map(fm).;
// log(mapped)reduce((acc, elm)=> console.log('i cant belive is true: ', elm), undefined)
// log(concated)
// console.log(mapped)
// console.log('lin', aL, 'tol: ', n);