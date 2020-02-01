const {date: D} = require('./date');
const {map, concat, compose} = require('ramda');
const d = D.of('2020-01-01 19:20');
const f = D.of('2020-01-03 19:20');
const m = D.of('2020-02-02 10:10');
const m1 = D.of('2020-02-20 10:10');

const prop = key => o => o[key];
const setMinutes = minutes => d => new Date(d.setMinutes(minutes));
const setHours = hour => d => new Date(d.setHours(hour));
const setUTCHours = hour => d => new Date(d.setUTCHours(hour));
const daysFromMonday = d => d.getDay() + (d.getDay() ===0 ? 6 : -1);
const subtract = value => value * -1;
const milliSeconds = value => value * 24 * 60 * 60 * 1000;
const day = value => compose(D.of, milliSeconds)(value);
const getMondayDay = d => compose(day, subtract, daysFromMonday)(d)
const getMonday = d => compose(milliSeconds, subtract, daysFromMonday)(d)
const s = D.of(new Date(2 *24 * 60 * 60 * 1000))
/// Date :: d -> d a

const setMidnight = compose(setMinutes(0), setUTCHours(0));
const p = d.map(setMinutes(24)).map(setHours(8));
const y = p.map(setMidnight);
const r = y.map(compose(setMinutes(30), setUTCHours(9))).concat(s).concat(s);
const monday = m.concat(m.map(getMonday));
const monday1 = m1.concat(m1.map(getMonday));
const _monday_ = m1.concat(getMondayDay(prop('value')(m1)))

const week = Array.from({length: 7}, (_ , i)=> m1.concat(m1.map(getMonday)).concat(day(i)));

console.log(monday1, '00000', monday, _monday_, week);