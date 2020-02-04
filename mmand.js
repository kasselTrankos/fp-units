const Observer = require('./monad');

const init = str => Observer(next => next(str));
const other = Observer(next =>  next(a => a + '004089545'))
const start = init('alvarp')
start
  .ap(other)
  .next(c => console.log(' asodjpasdu jsald', c))

console.log(start)