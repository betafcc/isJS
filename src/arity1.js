const isFunction = require('lodash.isfunction');
const isPlainObject = require('lodash.isplainobject');


const A1 = {
  boolean : arg => ((arg === false) || (arg === true)),
  number  : arg => (Number(arg) === arg),
  integer : arg => Number.isInteger(arg),

  nan     : arg => Number.isNaN(arg),
  finite  : arg => Number.isFinite(arg),

  float   : arg => (A1.number(arg) && (arg % 1 !== 0)),
  string  : arg => (
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
    A1.undefined(arg)
    || A1.null(arg)
    || A1.nan(arg)
  ),

  null    : arg => (arg === null),

  undefined: arg => (arg === undefined),

  // Unreliable on currying
  // strictUndefined: (...args) => (
  //   (args.length === 0) ? false :
  //   A1.undefined(args[0])
  // ),


  map: arg => (A1.nullable(arg)) ? false : (arg.constructor === Map),
  set: arg => (A1.nullable(arg)) ? false : (arg.constructor === Set),


  iterator: arg => (A1.nullable(arg)) ? false : !!arg.next,
  iterable: arg => (A1.nullable(arg)) ? false : !!arg[Symbol.iterator],
  promise : arg => (A1.nullable(arg)) ? false : (arg.constructor === Promise),
};


module.exports = A1;
