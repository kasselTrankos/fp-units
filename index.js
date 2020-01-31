const {date: D} = require('./date');
const {map, compose} = require('ramda');
const d = D.of('2020-01-01 19:20');
const f = D.of('2020-01-03 19:20');
const s = D.of(new Date(2 *24 * 60 * 60 * 1000))
/// Date :: d -> d a
const setMinutes = minutes => d => new Date(d.setMinutes(minutes));
const setHours = hour => d => new Date(d.setHours(hour));
const setUTCHours = hour => d => new Date(d.setUTCHours(hour));

const setMidnight = compose(setMinutes(0), setUTCHours(0));
const p = d.map(setMinutes(24)).map(setHours(8));
const y = p.map(setMidnight);
const r = y.map(compose(setMinutes(30), setUTCHours(9))).concat(s).concat(s);
// const week = Array.from({length: 7}, (_ , i)=> )
console.log(p, 'no es inmutable this is aquestion', '99999999', y, s, r);