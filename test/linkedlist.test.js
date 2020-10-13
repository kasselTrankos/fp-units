// linkedlist.test.js is
const { assert } = require('chai');
const LinkedList = require('./../fp/monad/linkedlist');

it('Monoid=> LinkedList.empty :: rigth and left identity', ()=> {
  const a = LinkedList.empty();
  const b = LinkedList.of(1, 2);
  const c = a.concat(b);
  const d = b.concat(a);
  assert.strictEqual(c, d)
});
