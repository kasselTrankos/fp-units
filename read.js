const {LinkedList, Stream} = require('./fp/monad');
const fs = require('fs');
const {pipe, chain, map, filter} = require('ramda');

const BASE = './node_modules';

const read = dir => new Stream(({error, complete, next}) => {
  return fs.readdir(dir, (err, files) => {
    // On error, show it and return
    if(err) return error(err);
    next(LinkedList.from(files))
    complete();
  });
});

const recursive = arr => arr.reduce((acc, el) => [...acc, read(BASE+'/'+ el)], [])

const clean = x => x!=='.bin';

const program = pipe(
  read,
  map(filter(clean)),
  // map(x => chain(recursive(x))),
);
program(BASE).subscribe({
  next: e => console.log(' mmm files -> ', e)
});
