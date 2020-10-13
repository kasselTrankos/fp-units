// task.test.js is
const { assert } = require('chai');
const Task = require('./../fp/monad/task')

it('Task.ap :: composition', () => {
  const v = Task.of(c => c + 11);
  const u = Task.of(x=> x + 1);
  const a = Task.of(6)
  let expected;
  let actual;
  //  v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x))))) 
  v.ap(u.ap(a.map(x => x))).fork(console.error, x => expected = x);
  // v['fantasy-land/ap'](u)['fantasy-land/ap'](a)
  v.ap(u.ap(a)).fork(console.error, x => actual =x)
  assert.equal(actual, expected);
});
it('Task.chain :: associative', ()=> {
  const m = Task.of(1);
  const f = x => Task.of(x + 1);
  const g = x => Task.of(x + 11);
  let actual;
  let expected;
  m.chain(f).chain(g).fork(console.error, x => actual = x);
  m.chain(x => f(x).chain(g)).fork(console.error, x => expected = x);
  assert.equal(actual, expected);
});