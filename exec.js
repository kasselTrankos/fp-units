const {exec} = require('child_process');
const Monad = require ('./monad')
const {Identity} = require('./mcompose');

const input = process.stdin;
const io = Monad(next => input.on('data', next));
const toUpperCase = str => str.toUpperCase();
const other = Monad(next =>  next(toUpperCase));
io
  .map(x=> x.toString())
  .ap(Monad(next => next(x => x.toUpperCase())))
  .chain(s => Monad(next => next (s.replace(/\n/, ''))))
  .map(s => `${s} no hay nueva linea`)
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