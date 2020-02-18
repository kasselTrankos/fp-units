const daggy = require('daggy');
const {Left, Right} = require('./fp/monad/either');
const Task = require('./fp/monad/task');
const Item = daggy.tagged('Item', ['title'])

const List = daggy.taggedSum('List', {
  Empty: [],
  Items: [Item],
})

const list = List.Empty
const items = List.Items([1])
const ok = Right(1);

items.cata({
  Empty: () => console.log('empty…'),
  Items: items => console.log(items) || items.map(console.log),
})
console.log(ok.cata)
ok.cata({
  Left: console.log,
  Right: x => console.log('eeeee', x)
});

const eitherToTask = either => new Task((reject, resolve)=> {
  either.cata({
    Left:reject,
    Right: resolve
  });
});
const prop = k => o => k in o ?  Right(o[k]) : Left(' no hay datos');
const d = {a: 1};
eitherToTask(prop('a')(d)).fork(console.log, console.log)

