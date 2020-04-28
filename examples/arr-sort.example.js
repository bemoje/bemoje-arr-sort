import arrSort from '../src/arr-sort'

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
