const A1 = require('./arity1.js');
const A2 = require('./arity2.js');


const is = {
  not: {}
};


Object
  .keys(A1)
  .forEach(k => {
    is[k] = A1[k];
    is.not[k] =
      (...args) =>
        !A1[k](...args);
  });

Object
  .keys(A2)
  .forEach(k => {
    is[k] = A2[k];
    is.not[k] =
      (...args_0) =>
      (...args_1) =>
        !A2[k](...args_0)(...args_1);
  });


module.exports = is;
