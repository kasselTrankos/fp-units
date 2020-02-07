const {exec} = require('child_process');
const Monad = require ('./monad')
const {Identity} = require('./mcompose');

const input = process.stdin;
const io = Monad(next => input.on('data', next));
const toUpperCase = str => str.toUpperCase();
io
  .map(x=> x.toString())
  .ap(Monad(next => next(toUpperCase)))
  .chain(s => Monad(next => next (s.replace(/\n/, ''))))
  .map(s => `${s} no hay nueva linea`)
  .ap(Monad(next => next(s => s.split(' '))))
  .next(console.log);


  // f a ~> f (a -> b) -> f b
  const one = Monad.of([1,3,34,5])
  const two = Monad.of([12])
  const f = Monad.of()
  const add = x => y => x + y;
  one.ap(add).ap(two);

  const liftA2 = (f, a, b) => b.ap(a.map(f))

  
  liftA2(x => y => x.map(v => y.map(g => v +g)), two, one)
  .next(console.log)
// standard_input.on('data', function (data) {

//   // User input exit.
//   if(data === 'exit\n'){
//       // Program exit.
//       console.log("User input complete, program exit.");
//       process.exit();
//   }else
//   {
//       // Print user input in console.
//       console.log('User Input Data : ' + data);
//   }
// });