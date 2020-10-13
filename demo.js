// demo is
const {Maybe} = require('./fp/monad');
const { Just, Nothing} = Maybe;
const { pipe, chain, filter, ap } = require('./utils');
const { readdirSync, lstatSync } = require('fs');

// + :: readdir a => Just [a]
const readdir = (a) => {
	try {
		return Just(readdirSync(a));
	}catch(e){
		return Nothing;
	}
};

const minimum = xs => xs.reduce((x, y) => Math.min(x, y), 1/0)

// + :: isDirectory a => Bool
const isDirectory = a => 
{
  try{
    return lstatSync(`${a}`).isDirectory()
  }catch(e){
    return false;
  }
};

// + :: getDirectories Just [] => Just []
const getDirectories = ap(Just(filter(isDirectory)));

const proc = pipe(
	getDirectories,
	readdir,
);

const _r = proc('./');
const m = minimum([1,2,3,4,57])
console.log(_r)
console.log(m, 1/0)

