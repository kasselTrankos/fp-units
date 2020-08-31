const {LinkedList, Stream} = require('./fp/monad');
const fs = require('fs');
const {pipe, chain, map, filter, lift, reduce} = require('ramda');
const lift2 =(f, a, b, c) => c.ap(b.ap(a.map(f)))

const BASE = './fp';

const read = dir => new Stream(({error, complete, next}) => {
  return fs.readdir(dir, (err, files) => {
    // On error, show it and return
    if(err) return error(err);
    next(LinkedList.from(files))
    complete();
  });
});
const log = message => (acc, elm)=> console.log(message, elm)
const append = x => y => xs => console.log('x', x, 'y',y, 'xs', xs) || LinkedList.of(x).concat(y.concat(xs));//[x, y, ...xs];
const redus = xs => xs.reduce((acc, el)=> lift2(append, Stream.of(el), read(BASE+'/'+ el), acc), Stream.of(LinkedList.empty()))
const recursive = arr => console.log( arr) || arr.reduce((acc, el) => [...acc, read(BASE+'/'+ el)], [])

const clean = x => x!=='.bin';

const program = pipe(
  read,
  // map(filter(clean)),
  // chain(redus),
);
program(BASE).subscribe({
  next: e => console.log(e)
});
