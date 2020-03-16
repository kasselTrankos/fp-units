
const Fn = run => ({
  run,
  map: f => Fn(x => f(run(x))),
  chain: f => Fn(x => f(run(x)).run(x))
});
Fn.of = x => Fn(() => x);

const Task = fork => ({
  fork,
  chain: f => Task((reject, resolve)=> fork(a => reject(a), a=> f(a).fork(reject, resolve))),
  map: f => Task((reject, resolve)=> fork(x => reject(x), x => resolve(f(x)))),
});
Task.of = x =>console.log(1, 'ccccc', x) ||  Task((_, resolve) => resolve(x));
const a = Fn(x => x  + 4);
const f = a.map(x => 3 + x).chain(x =>  Fn(x => x + 190));
// console.log(f.run(90))

const t = Task((_, resolve)=> setTimeout(()=> resolve([1]), 100))
  // .map(x => console.log(x, '222222222222') ||  x.map(b => b.map(console.log)))
  // .chain(x => Task.of(x.map(a => a + '--- more clear -')))
  .fork(e=> console.error('doy un error', e), console.log)
// console.log(t, '1919991')
// console.log(t, '00000000')