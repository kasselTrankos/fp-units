const {LinkedList} = require('./fp/monad');
const a = [1, 3, 5];
const aL = LinkedList.of(a);
const log = List  => {
	if(!List) {
		console.log('end')
	} else {
		const [car, cdr] = List.Cons;
		// console.log(car, 'car')
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
const n = aL.reduce((acc, e) => acc + e,  1)
const total = sum(179, aL);
console.log('lin', aL, 'tol: ', total, n);