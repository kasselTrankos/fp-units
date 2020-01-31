const {date: D} = require('./date');
const {map, compose} = require('ramda');
const d = D.of('2020-01-01 19:20');
const f = D.of('2020-01-03 19:20');
const m = D.of('2020-02-02 10:10');
const setMinutes = minutes => d => new Date(d.setMinutes(minutes));
const setHours = hour => d => new Date(d.setHours(hour));
const setUTCHours = hour => d => new Date(d.setUTCHours(hour));
const getDay = hour => d => new Date(d.getDay());
const getDate = hour => d => new Date(d.getDate());
const getMonday = d =>console.log(d.getDay(), d.getDay() + (d.getDay() ===0 ? 6 : 1)) ||  new Date(d.getDate() - d.getDay() + (d.getDay() ===0 ? 6 : 1));

const day = value => D.of(new Date(value * 24 * 60 * 60 * 1000));
const s = D.of(new Date(2 *24 * 60 * 60 * 1000))
/// Date :: d -> d a

const setMidnight = compose(setMinutes(0), setUTCHours(0));
const p = d.map(setMinutes(24)).map(setHours(8));
const y = p.map(setMidnight);
const r = y.map(compose(setMinutes(30), setUTCHours(9))).concat(s).concat(s);
const week = Array.from({length: 7}, (_ , i)=> d.concat(day(i)));
const monday = m.map(getMonday)
console.log(p, 'no es inmutable this is aquestion', '99999999', y, s, r, week, monday);