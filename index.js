const {date: D} = require('./date');
const {map, compose} = require('ramda');
const d = D.of('2020-01-01 19:20');
const f = D.of('2020-01-03 19:20');
/// Date :: d -> d a
const setMinutes = minutes => d => new Date(d.setMinutes(minutes));
const setHours = hour => d => new Date(d.setHours(hour));
const setMidnight = compose(setMinutes(0), setHours(0));
const p = d.map(setMinutes(24)).map(setHours(8));
const y = f.map(setMidnight)
console.log(p, 'no es inmutable this is aquestion', '99999999', y);