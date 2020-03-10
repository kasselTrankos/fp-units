const {LinkedList} = require('./fp/monad');
const {map, reduce, concat, pipe} = require('ramda');
const a = [{a: 1}, {a: 2}, {a: 190}];
const b = [{a: 1}, {a: 19}, {a: 100}];
const t = LinkedList.from([1,234])
const aL = LinkedList.from(a);
const bL = LinkedList.from(b);



// // harding array chain
// //+ chain :: Array a
// //+       ~> (a -> Array b)
// //+       -> Array b
// Array.prototype.chain = function (f) {
// 	// Map, then concat the results.
// 	return [].concat( ...this.map(f))
//   }
  
//   // NB: **totally** made up.
//   const flights = {
// 	ATL: ['LAX', 'DFW'],
// 	ORD: ['DEN'],
// 	LAX: ['JFK', 'ATL'],
// 	DEN: ['ATL', 'ORD', 'DFW'],
// 	JFK: ['LAX', 'DEN']
//   }
  
//   //- Where can I go from airport X?
//   //+ whereNext :: String -> [String]
//   const whereNext = x => console.log(x, 'chain') || flights[x] || []
  
//   // JFK, ATL
//   const ta = whereNext('LAX')
  
//   // LAX, DEN, LAX, DFW
//   .chain(whereNext)
  
//   // JFK, ATL,|| ATL, ORD, DFW ||, JFK, ATL
//   .chain(whereNext)

//   console.log(ta, 'harding power', whereNext('LAX'))
// const log = List  => {
// 	if(!List) {
// 		console.log('end')
// 	} else {
// 		const [car, cdr] = List.Cons;
// 		console.log(car, ' tiem car')
// 		log(cdr)
// 	}
// }
// const sum = (acc, List) => {
// 	if(List) {
// 		const [car, cdr] = List.Cons;
// 		return sum(acc + car, cdr)
// 	}
// 	return acc;
// }
// log(aL)
// const n = aL.reduce((acc, e) => ({...acc, ...e}),  {})
const log = (acc, elm)=> console.log('i cant belive is true: ', elm)
const fm = item => ({a: item.a +1, b: item.a -1});
// const mapped = aL.map(fm);
// const run = pipe(
//   concat(aL),
//   map(fm),
//   reduce(log, undefined),
// );

aL.chain(fm).reduce(log, undefined)

// run(bL)
// console.log(LinkedList.empty());
// const m = aL.concat(LinkedList.empty()).reduce(log, undefined)
// LinkedList.empty().concat(t).reduce(log, undefined)
// const concated = aL.concat(bL).map(fm).;
// log(mapped)reduce((acc, elm)=> console.log('i cant belive is true: ', elm), undefined)
// log(concated)
// console.log(mapped)
// console.log('lin', aL, 'tol: ', n);