const {LinkedList} = require('./../fp/monad');
const daggy = require('daggy');

const { Loop, Done } = daggy.taggedSum('chainRec',{
    Done: ['b'], Loop: ['a']
  })