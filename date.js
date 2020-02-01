const {tagged} = require( 'daggy');
const date = tagged('date', ['value']);

date.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
date.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};
// Functor :: f => f a ~> (a->b) -> b 
date.prototype.map = function (f) {
  return date.of(f(this.value));
};

// Apply :: f => f a ~>f (a->b) -> f b
date.prototype.ap = function(b) {
  return date.of(b.map(this.value));
}

// Semigroup :: a ~> a -> a
date.prototype.concat = function(b) {
  return date.of(this.value.getTime() + b.value.getTime());
}

date.prototype.chain = function(f) {
  return date(this.map(f)).value;
}
//pide a gritos el maybe
date.of = function (x) {
  const value = x instanceof Date ? new Date(x.getTime()) 
    : x.value ? new Date(x.value.getTime()) :  new Date(x);
  return new date(value);
};


const diff = tagged('diff', ['f']);
diff.prototype.contramap = function(g) {
  return diff((x,y)=> this.f(g(x), g(y)));
}

const weeks = tagged('kalendar', ['f']);
//TODO: need to made the IO interfaz pattern


weeks.prototype.contramap = function (g) {
  return weeks(x => this.f(g(x)));
};


module.exports = {date, diff, weeks};