const Fn = run => ({
  run,
  map: f => Fn(x => f(run(x))),
  chain: f => Fn(x => f(run(x)).run(x))
});
Fn.of = x => Fn(() => x);

const Task = fork => ({
  fork,
  map: f => Task((reject, resolve)=> fork(x => reject(x), x => resolve(f(x)))),
});

const a = Fn(x => x  + 4);
const f = a.map(x => 3 + x).chain(x =>  Fn(x => x + 190));
console.log(f.run(90))

const t = Task((reject, resolve)=> setTimeout(()=> reject('alvaro'), 100));
t.fork(e=> console.error('doy un error', e), c => console.log('vabien ', c))

console.log(t, '00000000')