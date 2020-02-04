const Observer = require('./monad');

const init = str => Observer(next => next(str));
const toUpperCase = str => str.toUpperCase();
const other = Observer(next =>  next(toUpperCase));
const third = str => Observer(next => next(str+ ' add text algf'));
const start = init('start')
start
  .ap(other)
  .chain(third)
  .ap(other)
  .next(console.log)
