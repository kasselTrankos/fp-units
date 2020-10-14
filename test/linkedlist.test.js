// linkedlist.test.js is
const { assert } = require('chai');
const LinkedList = require('./../fp/monad/linkedlist');

it('Monoid=> LinkedList.empty :: rigth and left identity', ()=> {
  const a = LinkedList.empty();
  const b = LinkedList.of(1);
  const c = a.concat(b);
  const d = b.concat(a);
  assert.deepEqual(c, d)
});
it('Applicative :: LinkedLiat.of :: homomorphism', ()=> {
  // A['fantasy-land/of'](x)['fantasy-land/ap'](A['fantasy-land/of'](f)) is equivalent to A['fantasy-land/of'](f(x)) (homomorphism)
  const f = x => x + 1;
  const a = LinkedList.of(1);
  const b = a.ap(LinkedList.of(f));
  const c = LinkedList.of(f(1));
  assert.deepEqual(b, c);
});
it('Applicative :: LinkedLiat.of :: interchange', ()=> {
  // A['fantasy-land/of'](y)['fantasy-land/ap'](u) is equivalent to u['fantasy-land/ap'](A['fantasy-land/of'](f => f(y))) (interchange)
  const f = x => x + 1;
  const y = 1;
  const A = LinkedList.of(1); 
  const u = LinkedList.of(f);
  const a = LinkedList.of(1).ap(u);
  const b = u.ap(LinkedList.of(f=> f(y)));
  assert.deepEqual(b, a);
});
it('Applicative :: LinkedList.of :: identity', ()=> {
  // v['fantasy-land/ap'](A['fantasy-land/of'](x => x)) is equivalent to v (identity)
  const v = LinkedList.of(1, 2);
  const b = v.ap(LinkedList.of(x => x));
  assert.deepEqual(v, b); 
});
