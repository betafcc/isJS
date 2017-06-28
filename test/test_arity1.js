const jsc = require('jsverify');

const is = require('../src/index.js');


const property = (funcName, generators, module, expected) =>
  jsc.property(
    funcName,
    jsc.sum(generators),
    ({value: arg}) => (module[funcName](arg) === expected)
  );


const mapBless = f => jscBlessed => jsc.bless({
  generator: jscBlessed.generator.map(f)
});


const nullable = jsc.oneof( 
  ...([null, undefined, NaN].map(jsc.constant))
);


const positiveGens = {
  'boolean'     : [jsc.bool],
  'number'      : [jsc.number],
  'integer'     : [jsc.integer],
  // 'float'       : [],
  'string'      : [jsc.string],
  'array'       : [jsc.array],
  // 'truthy'      : [],
  'falsy'       : [jsc.falsy],
  'plainObject' : [jsc.dict],
  'object'      : [jsc.dict, jsc.array],
  'dict'        : [jsc.dict],

  'nullable'    : [nullable],

  'map'         : [
    mapBless ( arr => new Map(arr) )
             ( jsc.array( jsc.tuple( [jsc.string, jsc.json] ) ) )
  ],

  'set'         : [
    mapBless (arr => new Set(arr))
             ( jsc.array() )
  ],

  'iterator'    : [
    mapBless (({value: arg}) => arg[Symbol.iterator]())
             ( jsc.sum([jsc.string, jsc.array]) )
  ],
  'iterable'    : [jsc.string, jsc.array],
};


const negativeGens = {
  'boolean'     : [nullable, jsc.number, jsc.string, jsc.array, jsc.dict],
  'number'      : [nullable, jsc.string, jsc.array, jsc.dict, jsc.bool],
  'integer'     : [nullable, jsc.string, jsc.array, jsc.dict, jsc.bool],
  'float'       : [nullable, jsc.integer, jsc.string, jsc.array, jsc.dict, jsc.bool],
  'string'      : [nullable, jsc.array, jsc.number, jsc.dict, jsc.bool],
  'array'       : [nullable, jsc.number, jsc.dict, jsc.string, jsc.bool],
  'truthy'      : [jsc.falsy],
  // 'falsy'       : [],
  'plainObject' : [nullable, jsc.array, jsc.number, jsc.string, jsc.bool],
  'object'      : [nullable, jsc.number, jsc.string, jsc.bool],
  'dict'        : [nullable, jsc.number, jsc.string, jsc.bool, jsc.array],

  // 'nullable'    : [],

  'map'         : [nullable, jsc.json],

  'set'         : [nullable, jsc.json],

  'iterator'    : [nullable, jsc.json],
  'iterable'    : [nullable, jsc.number, jsc.dict, jsc.bool],
};


describe('Arity 1', () => {

  describe('is.Arity1 testers', () => {
    describe('Positive Checks', () =>
      Object
        .entries(positiveGens)
        .forEach(
          ([funcName, generators]) =>
            property(funcName, generators, is, true)
        )
    )

    describe('Negative Checks', () =>
      Object
        .entries(negativeGens)
        .forEach(
          ([funcName, generators]) =>
            property(funcName, generators, is, false)
        )
    )
  });



  describe('is.not.Arity1 testers', () => {
    describe('Positive Checks', () =>
      Object
        .entries(positiveGens)
        .forEach(
          ([funcName, generators]) =>
            property(funcName, generators, is.not, false)
        )
    )

    describe('Negative Checks', () =>
      Object
        .entries(negativeGens)
        .forEach(
          ([funcName, generators]) =>
            property(funcName, generators, is.not, true)
        )
    )
  });

});
