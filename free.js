const {taggedSum, tagged} = require('daggy');
const {Identity, Task} = require('./fp/monad');
const compose = (f, g) => x => f(g(x))
const kCompose = (f, g) => x => f(x).chain(g);
const I = x => x;
// const Free = {
//   A,
//   map: f => f(a),
//   flatmap: f => 
// }
// in world haskell chain is flatmap
// Return(a: A): Free[F[_], A] -- Sequential  Pure
// Suspend(f: F[Free[F,A]]): Free[F[_], A] --- Parallel

// parece que necesita un sum type

///x - es el valor de trabajo
const Free = taggedSum('Free', {Suspend: ['x', 'f'], Pure: ['x']});
const {Suspend, Pure} = Free;
Free.of = Pure;
Free.prototype.chain = function (g){
  return this.cata({
    Pure: x => g(x),
    Suspend: (x, f) =>  Suspend(x, kCompose(f, g))
  });
}

Free.prototype.map = function(f) {
 
  return this.chain(a => Free.of(f(a)))
}


/// elevate to Free
const liftF = command => Suspend(command, Pure);
const ContType = tagged('ContType', ['t']); 
const Cont = f => liftF(ContType((new Task(f))));

const IO = taggedSum('IO', {IO: ['f']});
const List = taggedSum('List', {List: ['x']});
const unsafePerformIO = free => free.cata({
  Pure: I,
  Suspend: (m, q) => unsafePerformIO(q(m.f()))
});
const freeList = free => free.cata({
  Pure: I,
  Suspend: (m, q) => freeList(q(m.x))
});
const asyncGet = n =>
  Cont((rej, res) => setTimeout(() => res(n), 100))

const items = [
  {name: 'alvaro'},
  {name: 'vera'},
  {name: 'marijose'},
  {name: 'juan'}
]
const list = compose(liftF, List.List);
const io = compose(liftF, IO.IO);
const lista = list(items);
const localStorage = io(() => items);
const a = lista
  .chain(x=> list(x.map(y => Object.assign({}, y, {m: 1}))))
  // .map(x=> x.push('p0adfdff'))
  // .map(x=> console.log(x, 'tttttt'))
  .map(x => {
    x.push('0000');
  return x;})
// const i = localStorage
  
//   .map(l => l.map(I))
//   .chain(x => io(()=>console.log(x, '000000')));
  
// unsafePerformIO(i)
const m = freeList(a)
console.log('023331', m)

console.log('111111111', asyncGet('am'))