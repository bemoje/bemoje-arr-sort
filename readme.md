# @bemoje/arr-sort

Sort an array considerably faster than the native Array.prototype.sort as a drop-in replacement. Fork of of the famous timsort module, but this module allows for passing comparator-builder options instead of a comparator function. In short, advanced comparators made easy. Timsort: https://www.npmjs.com/package/timsort

#### Version

<span><a href="https://npmjs.org/@bemoje/arr-sort" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/arr-sort" alt="NPM version" /></a></span>

#### Travis CI

<span><a href="https://npmjs.org/@bemoje/arr-sort" title="View this project on NPM"><img src="https://travis-ci.org/bemoje/bemoje-arr-sort.svg?branch=master" alt="dependencies" /></a></span>

#### Dependencies

<span><a href="https://npmjs.org/@bemoje/arr-sort" title="View this project on NPM"><img src="https://david-dm.org/bemoje/bemoje-arr-sort.svg" alt="dependencies" /></a></span>

#### Stats

<span><a href="https://npmjs.org/@bemoje/arr-sort" title="View this project on NPM"><img src="https://img.shields.io/npm/dt/@bemoje/arr-sort" alt="NPM downloads" /></a></span>
<span><a href="https://github.com/bemoje/bemoje-arr-sort/fork" title="Fork this project"><img src="https://img.shields.io/github/forks/bemoje/bemoje-arr-sort" alt="Forks" /></a></span>

#### Donate

<span><a href="https://www.buymeacoffee.com/bemoje" title="Donate to this project using Buy Me A Beer"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?label=Buy me a beer!" alt="Buy Me A Beer donate button" /></a></span>
<span><a href="https://paypal.me/forstaaloen" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg?label=PayPal" alt="PayPal donate button" /></a></span>

## Installation

```sh
npm install @bemoje/arr-sort
npm install --save @bemoje/arr-sort
npm install --save-dev @bemoje/arr-sort
```

## Usage

```javascript

import arrSort from '@bemoje/arr-sort'

/**
 * OPTIONAL: REPLACE native Array.prototype.sort
 *
 * instead of calling sort(arr, options), you can also use arr.sort(options).
 *
 * It's generally not recommended to replace native class prototype methods, but since timsort is sturdy, tested and tried and proven to be considerably faster and IS truly a drop-in replacement, this might be a case where it could be considered a viable option.
 *
 * To activate this, do:
 */

arrSort.replaceNative()

/**
 * DATA: STRINGS
 * --------------
 */

let arr = ['5', '2', '4', '30', '1', '3']

/**
 * SORT ALPHABETICALLY BY DEFAULT
 * ------------------------------
 */

arrSort(arr)
//=> ['1', '2', '3', '30', '4', '5']

// OR
arr.sort()
//=> ['1', '2', '3', '30', '4', '5']

/**
 * DATA: NUMERIC VALUES
 * ----------------------
 */

arr = [5, 2, 4, 30, 1, 3]

/**
 * SORT NUMERICALLY
 * ----------------
 */

arrSort(arr, {
  numeric: true,
})
//=> [1, 2, 3, 4, 5, 30]

/**
 * SORT DESCENDING
 * ---------------
 */

arrSort(arr, {
  numeric: true,
  descending: true,
})
//=> [30, 5, 4, 3, 2, 1]

/**
 * DATA: PERSON OBJECTS
 * --------------------
 */

arr = [
  { name: 'john', age: 4 },
  { name: 'bill', age: 8 },
]

/**
 * SORT OBJECTS BY PROPERTY
 * ------------------------
 */

arrSort(arr, {
  by: 'name',
})

/* =>
  [
    { name: 'bill', age: 8 },
    { name: 'john', age: 4 },
  ]
*/

arrSort(arr, {
  numeric: true,
  by: 'age',
})

/* =>
  [
    { name: 'john', age: 4 },
    { name: 'bill', age: 8 },
  ]
*/

/**
 * DATA: PERSON OBJECTS WITH NESTED NAME OBJECTS
 * ---------------------------------------------
 */

arr = [
  { id: 0, name: { first: 'snoop', last: 'doggy' } },
  { id: 1, name: { first: 'kurt', last: 'qobain' } },
]

/**
 * SORT OBJECTS BY NESTED PROPERTY WITH DOT NOTATION
 * -------------------------------------------------
 */

arrSort(arr, {
  by: 'name.first',
})

/* =>
  [
    { id: 1, name: { first: 'kurt', last: 'qobain' } },
    { id: 0, name: { first: 'snoop', last: 'doggy' } },
  ]
*/

arrSort(arr, {
  by: 'name.last',
})

/* =>
  [
    { id: 0, name: { first: 'snoop', last: 'doggy' } },
    { id: 1, name: { first: 'kurt', last: 'qobain' } },
  ]
*/

/**
 * DATA: STRING DIRECTORY PATHS SPLIT IN ARRAYS
 * --------------------------------------------
 */

arr = [
  ['repo', 'src', 'compare.js'],
  ['repo', 'docs', 'index.html'],
]

/**
 * SORT BY ARRAY INDEX
 * -------------------
 */

arrSort(arr, {
  by: 2,
})

/* =>
  [
    ['repo', 'src', 'compare.js'],
    ['repo', 'docs', 'index.html'],
  ]
*/

arrSort(arr, {
  by: 1,
})

/* =>
  [
    ['repo', 'docs', 'index.html' ],
    ['repo', 'src', 'compare.js'],
  ]
*/

/**
 * DATA: DIRECTORY PATHS ARRAYS WITH SUB-ARRAYS
 * --------------------------------------------
 */

arr = [
  ['repo', 'src', ['compare', 'json']],
  ['repo', 'src', ['compare', 'ts']],
  ['repo', 'src', ['compare', 'js']],
]

/**
 * SORT ARRAYS AND SUB-ARRAYS RECURSIVELY
 * ------------------------------------
 */

arrSort(arr, {
  arrays: true,
})

/* =>
  [
    ['repo', 'src', ['compare', 'js']],
    ['repo', 'src', ['compare', 'json']],
    ['repo', 'src', ['compare', 'ts']],
  ]
*/

/**
 * DATA: IP ADDRESSES AS ARRAYS
 * ----------------------------
 */

arr = [
  [192, 168, 0, 1],
  [192, 168, 0, 101],
  [172, 0, 0, 1],
]

/**
 * SORT NUMERIC IP-ADDRESSES AS ARRAYS
 * -----------------------------------
 */

arrSort(arr, {
  numeric: true,
  arrays: true,
})

/* =>
  [
    [172, 0, 0, 1],
    [192, 168, 0, 1],
    [192, 168, 0, 101],
  ]
*/

/**
 * DATA: USER CLASS INSTANCES
 * --------------------------
 */

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}

arr = [
  new User('john', 'doe'),
  new User('peter', 'wick'),
  new User('peter', 'johnson'),
  new User('les', 'paul'),
]

/**
 * SORT BY GETTER-FUNCTION
 * ------------------------
 */

arrSort(arr, {
  by: (user) => {
    return user.fullName
  },
})

/* =>
  [
    { firstName: 'john', lastName: 'doe'},
    { firstName: 'les', lastName: 'paul'},
    { firstName: 'peter', lastName: 'johnson'},
    { firstName: 'peter', lastName: 'wick'},
  ]
*/

```

## Benchmark
Note: For short arrays, the speedup is insignificant or about the same. The more
data there is, the faster the algorithms of timsort become, proportionally.
Although timsort is a bit slower for short arrays, we're talking about a few
milliseconds. So the overall improvement from Array.prototype.sort is quite
unquestionable, imo.

| ArrayType                    | Length | arrSort | Array.prototype.sort | Times faster |
| ---------------------------- | ------ | ------- | -------------------- | ------------ |
| randomInt                    | 10     | 715     | 954                  | 1.33         |
| randomInt                    | 100    | 6878    | 14034                | 2.04         |
| randomInt                    | 1000   | 104597  | 210992               | 2.02         |
| randomInt                    | 10000  | 1560955 | 2804903              | 1.80         |
| descendingInt                | 10     | 571     | 389                  | 0.68         |
| descendingInt                | 100    | 1122    | 1971                 | 1.76         |
| descendingInt                | 1000   | 4946    | 17183                | 3.47         |
| descendingInt                | 10000  | 43319   | 170926               | 3.95         |
| ascendingInt                 | 10     | 534     | 369                  | 0.69         |
| ascendingInt                 | 100    | 1022    | 1842                 | 1.80         |
| ascendingInt                 | 1000   | 4460    | 16485                | 3.70         |
| ascendingInt                 | 10000  | 36601   | 157912               | 4.31         |
| ascending3RandomExchangesInt | 10     | 649     | 541                  | 0.83         |
| ascending3RandomExchangesInt | 100    | 1757    | 3817                 | 2.17         |
| ascending3RandomExchangesInt | 1000   | 6584    | 18115                | 2.75         |
| ascending3RandomExchangesInt | 10000  | 46194   | 172214               | 3.73         |
| ascending10RandomEndInt      | 10     | 792     | 750                  | 0.95         |
| ascending10RandomEndInt      | 100    | 2430    | 3578                 | 1.47         |
| ascending10RandomEndInt      | 1000   | 8165    | 19885                | 2.44         |
| ascending10RandomEndInt      | 10000  | 50357   | 176797               | 3.51         |
| allEqualInt                  | 10     | 526     | 397                  | 0.75         |
| allEqualInt                  | 100    | 1048    | 1949                 | 1.86         |
| allEqualInt                  | 1000   | 4400    | 16789                | 3.82         |
| allEqualInt                  | 10000  | 35976   | 162857               | 4.53         |
| manyDuplicateInt             | 10     | 833     | 770                  | 0.92         |
| manyDuplicateInt             | 100    | 7806    | 11705                | 1.50         |
| manyDuplicateInt             | 1000   | 110968  | 173539               | 1.56         |
| manyDuplicateInt             | 10000  | 1491473 | 2255993              | 1.51         |
| someDuplicateInt             | 10     | 797     | 747                  | 0.94         |
| someDuplicateInt             | 100    | 7797    | 11712                | 1.50         |
| someDuplicateInt             | 1000   | 112189  | 174973               | 1.56         |
| someDuplicateInt             | 10000  | 1526839 | 2301187              | 1.51         |

## Tests
Uses *Jest* to test module functionality. Run tests to get coverage details.

```bash
npm run test
```

## API
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [arrSort][1]

    -   [Parameters][2]

    -   [replaceNative][3]

-   [getter][4]

    -   [Parameters][5]

## arrSort

Sort an array considerably faster than the native Array.prototype.sort as a drop-in replacement. Fork of of the famous timsort module, but this module allows for passing comparator-builder options instead of a comparator function. In short, advanced comparators made easy. Timsort: [https://www.npmjs.com/package/timsort][6]

##### Parameters

-   `arr` **[Array][7]** The array to sort.

-   `compare` **([function][8] \| [object][9])?** Comparator function or comparator-builder options. Defaults to alphabetical compararison.

    -   `compare.numeric` **[boolean][10]** Sort numerically. Defaults to lexicographic/alphabetic sort. (optional, default `false`)

    -   `compare.descending` **[boolean][10]** Sort in descending order. Defaults to ascending order. (optional, default `false`)

    -   `compare.array` **[boolean][10]** Sort arrays. Nested arrays are also compared recursively. (optional, default `false`)

    -   `compare.by` **([number][11] \| [string][12] \| [getter][13])** Sort by either array index, a callback(element): any - or by object keys with dot-notation support. (optional, default `undefined`)

-   `lo` **[number][11]?** First element in the range (inclusive).

-   `hi` **[number][11]?** Last element in the range.

Returns **[Array][7]** The sorted array

#### replaceNative

Replace the native Array.prototype.sort method with arrSort.

Returns **void** 

## getter

Callback type definition.

Type: [Function][8]

##### Parameters

-   `a` **any** The value

Returns **any** The value to be compared

[1]: #arrsort

[2]: #parameters

[3]: #replacenative

[4]: #getter

[5]: #parameters-1

[6]: https://www.npmjs.com/package/timsort

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[10]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[13]: #getter