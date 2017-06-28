# isJS
Runtime type-check JS utility


Install
-------

    npm install @betafcc/is


Usage
-----
```js
const is = require('@betafcc/is');

is.string('hello') // true
is.number('10') // false
is.oneOf(is.number, is.string)([1, 2, 3]) // false

is.not.oneOf(is.number, is.string)([1, 2, 3]) // true
is.not.in([1, 2, 3])(10) // true

```


Functions
---------


```js
is.not : Contains negated versions of each below

is.boolean     :: Any -> Boolean
is.number      :: Any -> Boolean
is.integer     :: Any -> Boolean
is.float       :: Any -> Boolean
is.string      :: Any -> Boolean
is.array       :: Any -> Boolean
is.truthy      :: Any -> Boolean
is.falsy       :: Any -> Boolean
is.plainObject :: Any -> Boolean
is.object      :: Any -> Boolean
is.dict        :: Any -> Boolean
is.nullable    :: Any -> Boolean
    // true for null or undefined or NaN
is.map         :: Any -> Boolean
is.set         :: Any -> Boolean
is.iterator    :: Any -> Boolean
is.iterable    :: Any -> Boolean


is.in :: Iterable -> Any -> boolean
    is.in([1, 2, 3])(2) -> true
    is.in([1, 2, 3])('2') -> false

is.equal :: Any -> Any -> Boolean
    is.equal([1, 2, 3])('foo') -> false
    is.equal([1, 2, 3])([1, 2, 3]) -> true

is.arrayOf :: (Any -> Boolean) -> Any -> Boolean
    is.arrayOf(is.integer)(['hello', 'world']) -> false
    is.arrayOf(is.integer)([1, 2, 3]) -> true

is.iterableOf :: (Any  -> Boolean) -> Any -> Boolean
    is.iterableOf(is.integer)(['hello', 'world']) -> false
    is.iterableOf(is.integer)([1, 2, 3]) -> true

is.tupleOf :: ([Any -> Boolean]) -> Any -> Boolean
    is.tupleOf([is.string, is.integer])(['hello', 10, 100]) -> false
    is.tupleOf([is.string, is.integer])(['hello', 10]) -> true

is.dictOf :: Any -> Any -> Boolean
    is.dictOf(is.integer)({a: 'hello', b: 10}) -> false
    is.dictOf(is.integer)({a: 2, b: 10}) -> true

is.oneOf :: (...(Any -> Boolean)) -> Any -> Boolean
    is.oneOf(is.string, is.number, is.array)({a: 10}) -> false
    is.oneOf(is.string, is.number, is.array)([{a: 10}]) -> true

is.keyIn :: PlainObject -> Any -> Boolean
    is.keyIn({foo: 10})('foo') -> true
    is.keyIn({foo: 10})('bar') -> false

is.valueIn :: PlainObject -> Any -> Boolean
    is.valueIn({foo: 10})(10) -> true
    is.valueIn({foo: 10})('foo') -> false

```
