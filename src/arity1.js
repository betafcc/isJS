const isFunction = require('lodash.isfunction');
const isPlainObject = require('lodash.isplainobject');


const A1 = {
  boolean: arg => ((arg === false) || (arg === true)),
  number: arg => (Number(arg) === arg),
  integer: Number.isInteger,
  float : arg => (A1.number(arg) && (arg % 1 !== 0)),
  string: arg => (
    (typeof arg === 'string')
    || (arg instanceof String)
  ),


  array: Array.isArray,


  truthy  : arg => !!arg,
  falsy   : arg => !arg,


  plainObject: isPlainObject,
  function: isFunction,
  object: arg => (arg !== null && typeof arg === 'object'),
  dict: arg => A1.plainObject(arg),


  nullable: arg => (
    (arg === undefined)
    || (arg === null)
    || Number.isNaN(arg)
  ),


  map: arg => (A1.nullable(arg)) ? false : (arg.constructor === Map),
  set: arg => (A1.nullable(arg)) ? false : (arg.constructor === Set),


  iterator: arg => (A1.nullable(arg)) ? false : !!arg.next,
  iterable: arg => (A1.nullable(arg)) ? false : !!arg[Symbol.iterator],
};


module.exports = A1;
