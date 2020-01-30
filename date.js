const {tagged} = require( 'daggy');
const date = tagged('date', ['value']);

date.prototype.equals = function(that) {
  return this.value.getTime() === that.getTime();
};
date.prototype.lte = function (that) {
  return this.value.getTime() < that.getTime();
};
date.prototype.map = function (f) {
  return date.of(f(this.value));
};
date.prototype.chain = function(f) {
  return date(this.map(f)).value;
}

date.of = function (x) {
  const value = x instanceof Date ? new Date(x.getTime()) : new Date(x);
  return new date(value);
};

date.prototype.setMinutes = function (m) {
  return date.of(new Date(this.value).setMinutes(m));
};

date.prototype.setHours = function (h) {
  return date.of(new Date(this.value).setHours(h));
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