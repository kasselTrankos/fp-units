// dates.js
const datetime = require('./../fp/data/datetime');
const d = datetime(new Date());
const a = datetime.of('2020-12-12');

const m = a.map(x => new Date(x.getTime() + 100000000)).chain(x => datetime(new Date()))
console.log(d, a, m);
