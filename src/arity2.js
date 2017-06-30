const zipWith = require('lodash.zipwith');
const _isEqual = require('lodash.isequal');

const A1 = require('./arity1.js');


const A2 = {
  equal: arg_0 => arg_1 => _isEqual(arg_0, arg_1),

  arrayOf: test => arg => (
    !A1.array(arg)) ? false :
    arg.every(el => test(el)
  ),

  iterableOf: test => arg => {
    if (!A1.iterable(arg))
      return false;

    for (const el of arg)
      if (!test(el))
        return false;

    return true;
  },

  tupleOf: tests => arg => (
    (!A1.array(arg))              ? false :
    (tests.length !== arg.length) ? false :
    zipWith(tests, arg, (tst, a) => tst(a))
      .every(el => el === true)
  ),

  dictOf: test => arg => (
    (!A1.dict(arg)) ? false :
    Object.values(arg).every(el => test(el))
  ),


  oneOf: (...tests) => arg => tests.some(f => f(arg)),


  keyIn  : obj => A2.in(Object.keys(obj)),
  valueIn: obj => A2.in(Object.values(obj)),

  in: it => arg => {
    for (const el of it)
      if (A2.equal(el)(arg))
        return true;
    return false;
  },
};


module.exports = A2;
