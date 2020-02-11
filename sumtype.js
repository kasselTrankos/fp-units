const daggy = require('daggy');
const either = require('./either');
const Item = daggy.tagged('Item', ['title'])

const List = daggy.taggedSum('List', {
  Empty: [],
  Items: [Item],
})

const list = List.Empty
const items = List.Items([1])
const ok = either.Right(1);

items.cata({
  Empty: () => console.log('empty…'),
  Items: items => console.log(items) || items.map(console.log),
})
