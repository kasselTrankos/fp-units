const {LinkedList} = require('./fp/monad');
const a = [{a: 1}, {a: 2}, {a: 10}, {m:1}];
const aL = LinkedList.of(a);
const log = List  => {
	if(!List) {
		console.log('end')
	} else {
		const [car, cdr] = List.Cons;
		console.log(car, 'car')
		log(cdr)
	}
	// const [head, tail] = Cons;
	// console.log(head);
	// if(tail) read(tail)
	
}
const sum = (acc, List) => {
	if(List) {
		const [car, cdr] = List.Cons;
		return sum(acc + car, cdr)
	}
	return acc;
}
// log(aL)
const n = aL.reduce((acc, e) => [...acc, e.a],  [123, 1, '0'])
console.log('lin', aL, 'tol: ', n);