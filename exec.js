const {exec} = require('child_process');
const Monad = require ('./monad')
const {Identity} = require('./mcompose');

const input = process.stdin;
const io = Monad(next => input.on('data', next));

io
  .map(x=> x.toString())
  .map(x => x.toUpperCase())
  .chain(x => Monad(next => next( `${x} \t alvaro`)))
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