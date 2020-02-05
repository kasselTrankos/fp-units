const Observer = require('./monad');

const init = str => Observer(next => next(str));
const trim = str => str.replace(/add|all|text/ig, '')
const toUpperCase = str => str.toUpperCase();
const other = Observer(next =>  next(toUpperCase));
const third = str => Observer(next => next(str+ ' add text add algf tt alone '));
const fourth = str => str.split(' ');
const start = init('start all world')
start
  .ap(other)
  .chain(third)
  .ap(other)
  .map(trim)
  .map(fourth)
  .chain(v => Observer(next => next(v.toString())))
  .next(console.log)
