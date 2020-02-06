const {exec} = require('child_process');
const {Just, Nothing} = require('./maybe');
const Monad = require ('./monad')
const {Identity} = require('./mcompose');

const input = process.stdin;
const io = Monad(next => input.on('data', next));
const toUpperCase = str => str.toUpperCase();
const a = Monad.of(11);
const b = Monad.of(12);
const multiply = x => y => x * y;
const LiftM2 = (f, a, b) => a.ap(b.map(f));

LiftM2(multiply, a, b).next(console.log)


io
  .map(x=> x.toString())
  .ap(Monad(next => next(toUpperCase)))
  .chain(s => Monad(next => next (s.replace(/\n/, ''))))
  .map(s => `${s} no hay nueva linea`)
  .map(s => s.split(' '))
  .next(console.log);

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