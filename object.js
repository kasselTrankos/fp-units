const {tagged} = require( 'daggy');
const object = tagged('object', ['o']);

object.prototype.map = function(f){
  return new object(f(this.o));
}

object.of = function(o) {
  return new object(o);
}

module.exports = {object};