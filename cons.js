const {LinkedList} = require('./fp/monad');
const a = [{a: 1}, {a: 2}, {a: 10}, {a:11}];
const aL = LinkedList.from(a);
const log = List  => {
	if(!List) {
		console.log('end')
	} else {
		const [car, cdr] = List.Cons;
		console.log(car, 'car')
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
const fm = item => ({a: item.a + 3});
const mapped = aL.map(fm);
log(mapped)
console.log(mapped)
// console.log('lin', aL, 'tol: ', n);