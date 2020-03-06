const {LinkedList} = require('./fp/monad');
const a = [1,3,4,5,6,76, 0, 1230, 9393, '129393'];
const aL = LinkedList.of(a);
const read = List  => {
	if(!List) {
		console.log('end')
	} else {
		const [car, cdr] = List.Cons;
		console.log(car, 'car')
		read(cdr)
	}
	// const [head, tail] = Cons;
	// console.log(head);
	// if(tail) read(tail)
	
}
read(aL);
console.log('lin', aL);