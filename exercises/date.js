const {datetime} = require('./../fp/data');
const {map, concat, compose, curry} = require('ramda');
const d = datetime.from('2020-01-01 19:20');
const f = datetime.from('2020-01-03 19:20');
const m = datetime.from('2020-02-02 10:10');
const m1 = datetime.from('2020-02-20 10:10');

const prop = key => o => o[key];
const setMinutes = curry((minutes, date) => new Date(date.setMinutes(minutes)))
const setHours =curry((hour, date) => new Date(date.setHours(hour)));
const setUTCHours = curry((hour, date) => new Date(date.setUTCHours(hour)));
const daysFromMonday = date => date.getDay() + (date.getDay() ===0 ? 6 : -1);
const subtract = value => value * -1;
const milliSeconds = value => value * 24 * 60 * 60 * 1000;
// Int :: d  => d -> Date morphism 
const getDay = value => compose(datetime.from, milliSeconds)(value);
// Date :: d  => d -> D morphism
const getMondayDay = date => compose(milliSeconds, subtract, daysFromMonday)(date);
/// Date :: d -> d a
const setMidnight = compose(setMinutes(0), setUTCHours(0));

const s = datetime.of(new Date(2 * 24 * 60 * 60 * 1000))
const p = d.map(setMinutes(24)).map(setHours(8));
const y = p.map(setMidnight);
const r = y.map(compose(setMinutes(11), setUTCHours(9))).concat(s).concat(s);
const today = datetime.of(new Date())
const monday = today.concat(today.map(getMondayDay));
// const monday1 = m1.map(setMinutes(11)).map(setHours(8)).concat(m1.map(getMondayDay));
// const _monday_ = m1.concat(getMondayDay(prop('value')(m1)));

console.log('zero date with 2 days: ', s);
console.log('zero date plus 8h and 24 min: ', p);
console.log('zero date to midnight', y);
console.log('zero date plus s twice: ', r);
console.log('Today : ', today)
console.log('Monday of this week: ', monday)

const week = Array.from({length: 7}, (_ , i)=> m1.concat(m1.map(getMondayDay)).concat(getDay(i)));
console.log('WEEK: ', week);
// console.log(monday1, '00000', monday, _monday_, week);
// console.log(m.map(getMondayDay))