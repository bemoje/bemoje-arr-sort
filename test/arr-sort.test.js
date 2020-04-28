import sort from '../src/arr-sort'

describe('arrSort', () => {
	test('type checks - correct', () => {
		let arr, compare, lo, hi
		const ARRAY = [2, 1]
		const FUNCTION = function () {}
		const OBJECT = {}
		const NUMBER = 2
		const NUMBER_OBJECT = new Number(2)
		const STRING = 's'

		expect(() => {
			sort(ARRAY)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER_OBJECT, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER_OBJECT, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER_OBJECT, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER_OBJECT, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER_OBJECT, NUMBER)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER, NUMBER_OBJECT)
		}).not.toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER_OBJECT, NUMBER_OBJECT)
		}).not.toThrow(TypeError)
	})

	test('type checks - incorrect', () => {
		let arr, compare, lo, hi
		const ARRAY = [2, 1]
		const FUNCTION = function () {}
		const OBJECT = {}
		const NUMBER = 2
		const NUMBER_OBJECT = new Number(2)
		const STRING = 's'

		expect(() => {
			sort(STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER_OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER_OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, FUNCTION, NUMBER_OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, OBJECT, NUMBER_OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER_OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(STRING, NUMBER_OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING, NUMBER)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, STRING, NUMBER_OBJECT)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, FUNCTION, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)

		expect(() => {
			sort(ARRAY, OBJECT, NUMBER_OBJECT, STRING)
		}).toThrow(TypeError)
	})

	test('replaceNative', () => {
		sort.replaceNative()

		const arr = [5, 2, 4, 30, 1, 3]

		/**
		 * SORT NUMERICALLY
		 * ----------------
		 */

		arr.sort({
			numeric: true,
		})

		const expected = [1, 2, 3, 4, 5, 30]

		expect(arr).toStrictEqual(expected)
	})

	test('short arrays - comparator builder options', () => {
		const arr = [5, 3, 4, 2, 1]

		sort(arr, {
			numeric: true,
		})

		expect(arr).toStrictEqual([1, 2, 3, 4, 5])
	})

	test('short arrays - comparator function', () => {
		const arr = [5, 3, 4, 2, 1]

		sort(arr, (a, b) => {
			return a - b
		})

		expect(arr).toStrictEqual([1, 2, 3, 4, 5])
	})

	test('examples', () => {
		let arr, expected

		/**
		 * DATA: STRINGS
		 * --------------
		 */
		arr = ['5', '2', '4', '30', '1', '3']

		/**
		 * SORT ALPHABETICALLY BY DEFAULT
		 * ------------------------------
		 */
		sort(arr)

		expected = ['1', '2', '3', '30', '4', '5']

		expect(arr).toStrictEqual(expected)

		/**
		 * DATA: NUMERIC VALUES
		 * ----------------------
		 */
		arr = [5, 2, 4, 30, 1, 3]

		/**
		 * SORT NUMERICALLY
		 * ----------------
		 */

		sort(arr, {
			numeric: true,
		})

		expected = [1, 2, 3, 4, 5, 30]

		expect(arr).toStrictEqual(expected)

		/**
		 * SORT DESCENDING
		 * ---------------
		 */
		sort(arr, {
			numeric: true,
			descending: true,
		})

		expected = [30, 5, 4, 3, 2, 1]

		expect(arr).toStrictEqual(expected)

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
		sort(arr, {
			by: 'name',
		})

		expected = [
			{ name: 'bill', age: 8 },
			{ name: 'john', age: 4 },
		]

		expect(arr).toStrictEqual(expected)

		sort(arr, {
			numeric: true,
			by: 'age',
		})

		expected = [
			{ name: 'john', age: 4 },
			{ name: 'bill', age: 8 },
		]

		expect(arr).toStrictEqual(expected)

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
		sort(arr, {
			by: 'name.first',
		})

		expected = [
			{ id: 1, name: { first: 'kurt', last: 'qobain' } },
			{ id: 0, name: { first: 'snoop', last: 'doggy' } },
		]

		expect(arr).toStrictEqual(expected)

		sort(arr, {
			by: 'name.last',
		})

		expected = [
			{ id: 0, name: { first: 'snoop', last: 'doggy' } },
			{ id: 1, name: { first: 'kurt', last: 'qobain' } },
		]

		expect(arr).toStrictEqual(expected)

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
		sort(arr, {
			by: 2,
		})

		expected = [
			['repo', 'src', 'compare.js'],
			['repo', 'docs', 'index.html'],
		]

		expect(arr).toStrictEqual(expected)

		sort(arr, {
			by: 1,
		})

		expected = [
			['repo', 'docs', 'index.html'],
			['repo', 'src', 'compare.js'],
		]

		expect(arr).toStrictEqual(expected)

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
		sort(arr, {
			arrays: true,
		})

		expected = [
			['repo', 'src', ['compare', 'js']],
			['repo', 'src', ['compare', 'json']],
			['repo', 'src', ['compare', 'ts']],
		]

		expect(arr).toStrictEqual(expected)

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

		sort(arr, {
			numeric: true,
			arrays: true,
		})

		expected = [
			[172, 0, 0, 1],
			[192, 168, 0, 1],
			[192, 168, 0, 101],
		]

		expect(arr).toStrictEqual(expected)

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

		sort(arr, {
			by: (user) => {
				return user.fullName
			},
		})

		expected = [
			new User('john', 'doe'),
			new User('les', 'paul'),
			new User('peter', 'johnson'),
			new User('peter', 'wick'),
		]

		expect(arr).toStrictEqual(expected)
	})
})
