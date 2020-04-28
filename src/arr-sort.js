import arrSortComparator from '@bemoje/arr-sort-comparator'
import assertArgs from '@bemoje/assert-args'
import assertType from '@bemoje/assert-type'
import isFunction from '@bemoje/is-function'

/**
 * Sort an array considerably faster than the native Array.prototype.sort as a drop-in replacement. Fork of of the famous timsort module, but this module allows for passing comparator-builder options instead of a comparator function. In short, advanced comparators made easy. Timsort: https://www.npmjs.com/package/timsort
 * @param {Array} arr - The array to sort.
 * @param {function|object} [compare] - Comparator function or comparator-builder options. Defaults to alphabetical compararison.
 * @param {boolean} [compare.numeric=false] - Sort numerically. Defaults to lexicographic/alphabetic sort.
 * @param {boolean} [compare.descending=false] - Sort in descending order. Defaults to ascending order.
 * @param {boolean} [compare.array=false] - Sort arrays. Nested arrays are also compared recursively.
 * @param {number|string|getter} [compare.by=undefined] - Sort by either array index, a callback(element): any - or by object keys with dot-notation support.
 * @param {number} [lo] - First element in the range (inclusive).
 * @param {number} [hi] - Last element in the range.
 * @returns {Array} The sorted array
 */
export default function arrSort(arr, compare, lo, hi) {
	assertArgs(arr)
	assertType(Array, arr)

	// Handle comparator-options or the case where a comparison function is not provided. Lexicographic sorting is default
	if (!compare) {
		compare = arrSortComparator()
	} else if (typeof compare === 'object') {
		compare = arrSortComparator(compare)
	} else if (!isFunction(compare)) {
		hi = lo
		lo = compare
		compare = arrSortComparator()
	}

	assertType(Number, lo)
	assertType(Number, hi)

	if (!lo) {
		lo = 0
	}
	if (!hi) {
		hi = arr.length
	}

	let remaining = hi - lo

	// The array is already sorted
	if (remaining < 2) {
		return
	}

	let runLength = 0
	// On small arrays binary sort can be used directly
	if (remaining < DEFAULT_MIN_MERGE) {
		runLength = makeAscendingRun(arr, lo, hi, compare)
		binaryInsertionSort(arr, lo, hi, lo + runLength, compare)
		return
	}

	let ts = new Sorter(arr, compare)

	let minRun = minRunLength(remaining)

	do {
		runLength = makeAscendingRun(arr, lo, hi, compare)
		if (runLength < minRun) {
			let force = remaining
			if (force > minRun) {
				force = minRun
			}

			binaryInsertionSort(arr, lo, lo + force, lo + runLength, compare)
			runLength = force
		}
		// Push new run and merge if necessary
		ts.pushRun(lo, runLength)
		ts.mergeRuns()

		// Go find next run
		remaining -= runLength
		lo += runLength
	} while (remaining !== 0)

	// Force merging of remaining runs
	ts.forceMergeRuns()

	return arr
}

/**
 * Callback type definition.
 * @callback getter
 * @param {*} a - The value
 * @returns {*} The value to be compared
 */

/**
 * Replace the native Array.prototype.sort method with arrSort.
 * @returns {void}
 */
arrSort.replaceNative = () => {
	Array.prototype.sort = function (compare, lo, hi) {
		return arrSort(this, compare, lo, hi)
	}
}

// Default minimum size of a run.
const DEFAULT_MIN_MERGE = 32

// Minimum ordered subsequece required to do galloping.
const DEFAULT_MIN_GALLOPING = 7

// Default tmp storage length. Can increase depending on the size of the smallest run to merge.
const DEFAULT_TMP_STORAGE_LENGTH = 256

// Compute minimum run length for sorter
function minRunLength(n) {
	let r = 0

	while (n >= DEFAULT_MIN_MERGE) {
		r |= n & 1
		n >>= 1
	}

	return n + r
}

// Counts the length of a monotonically ascending or strictly monotonically descending sequence (run) starting at array[lo] in the range [lo, hi). If the run is descending it is made ascending.
function makeAscendingRun(arr, lo, hi, compare) {
	let runHi = lo + 1

	if (runHi === hi) {
		return 1
	}

	// Descending
	if (compare(arr[runHi++], arr[lo]) < 0) {
		while (runHi < hi && compare(arr[runHi], arr[runHi - 1]) < 0) {
			runHi++
		}

		reverseRun(arr, lo, runHi)
		// Ascending
	} else {
		while (runHi < hi && compare(arr[runHi], arr[runHi - 1]) >= 0) {
			runHi++
		}
	}

	return runHi - lo
}

// Reverse an array in the range [lo, hi).
function reverseRun(arr, lo, hi) {
	hi--

	while (lo < hi) {
		let t = arr[lo]
		arr[lo++] = arr[hi]
		arr[hi--] = t
	}
}

// Perform the binary sort of the array in the range [lo, hi) where start is the first element possibly out of order.
function binaryInsertionSort(arr, lo, hi, start, compare) {
	if (start === lo) {
		start++
	}

	for (; start < hi; start++) {
		let pivot = arr[start]

		// Ranges of the array where pivot belongs
		let left = lo
		let right = start

		// pivot >= array[i] for i in [lo, left)
		// pivot <  array[i] for i in  in [right, start)
		while (left < right) {
			let mid = (left + right) >>> 1

			if (compare(pivot, arr[mid]) < 0) {
				right = mid
			} else {
				left = mid + 1
			}
		}

		// Move elements right to make room for the pivot. If there are elements equal to pivot, left points to the first slot after them: this is also a reason for which sorter is stable
		let n = start - left

		// Switch is just an optimization for small arrays
		switch (n) {
			case 3:
				arr[left + 3] = arr[left + 2]
			/* falls through */
			case 2:
				arr[left + 2] = arr[left + 1]
			/* falls through */
			case 1:
				arr[left + 1] = arr[left]
				break
			default:
				while (n > 0) {
					arr[left + n] = arr[left + n - 1]
					n--
				}
		}

		arr[left] = pivot
	}
}

// Find the position at which to insert a value in a sorted range. If the range contains elements equal to the value the leftmost element index is returned (for stability).
function gallopLeft(value, arr, start, length, hint, compare) {
	let lastOffset = 0
	let maxOffset = 0
	let offset = 1

	if (compare(value, arr[start + hint]) > 0) {
		maxOffset = length - hint

		while (
			offset < maxOffset &&
			compare(value, arr[start + hint + offset]) > 0
		) {
			lastOffset = offset
			offset = (offset << 1) + 1

			if (offset <= 0) {
				offset = maxOffset
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset
		}

		// Make offsets relative to start
		lastOffset += hint
		offset += hint

		// value <= array[start + hint]
	} else {
		maxOffset = hint + 1
		while (
			offset < maxOffset &&
			compare(value, arr[start + hint - offset]) <= 0
		) {
			lastOffset = offset
			offset = (offset << 1) + 1

			if (offset <= 0) {
				offset = maxOffset
			}
		}
		if (offset > maxOffset) {
			offset = maxOffset
		}

		// Make offsets relative to start
		let tmp = lastOffset
		lastOffset = hint - offset
		offset = hint - tmp
	}

	// Now array[start+lastOffset] < value <= array[start+offset], so value belongs somewhere in the range (start + lastOffset, start + offset]. Do a binary search, with invariant array[start + lastOffset - 1] < value <= array[start + offset].
	lastOffset++
	while (lastOffset < offset) {
		let m = lastOffset + ((offset - lastOffset) >>> 1)

		if (compare(value, arr[start + m]) > 0) {
			lastOffset = m + 1
		} else {
			offset = m
		}
	}
	return offset
}

// Find the position at which to insert a value in a sorted range. If the range contains elements equal to the value the rightmost element index is returned (for stability).
function gallopRight(value, arr, start, length, hint, compare) {
	let lastOffset = 0
	let maxOffset = 0
	let offset = 1

	if (compare(value, arr[start + hint]) < 0) {
		maxOffset = hint + 1

		while (
			offset < maxOffset &&
			compare(value, arr[start + hint - offset]) < 0
		) {
			lastOffset = offset
			offset = (offset << 1) + 1

			if (offset <= 0) {
				offset = maxOffset
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset
		}

		// Make offsets relative to start
		let tmp = lastOffset
		lastOffset = hint - offset
		offset = hint - tmp

		// value >= array[start + hint]
	} else {
		maxOffset = length - hint

		while (
			offset < maxOffset &&
			compare(value, arr[start + hint + offset]) >= 0
		) {
			lastOffset = offset
			offset = (offset << 1) + 1

			if (offset <= 0) {
				offset = maxOffset
			}
		}

		if (offset > maxOffset) {
			offset = maxOffset
		}

		// Make offsets relative to start
		lastOffset += hint
		offset += hint
	}

	// Now array[start+lastOffset] < value <= array[start+offset], so value belongs somewhere in the range (start + lastOffset, start + offset]. Do a binary search, with invariant array[start + lastOffset - 1] < value <= array[start + offset].
	lastOffset++

	while (lastOffset < offset) {
		let m = lastOffset + ((offset - lastOffset) >>> 1)

		if (compare(value, arr[start + m]) < 0) {
			offset = m
		} else {
			lastOffset = m + 1
		}
	}

	return offset
}

class Sorter {
	constructor(array, compare) {
		this.minGallop = DEFAULT_MIN_GALLOPING
		this.tmpStorageLength = DEFAULT_TMP_STORAGE_LENGTH
		this.stackSize = 0

		this.array = array
		this.compare = compare

		this.length = array.length

		if (this.length < 2 * DEFAULT_TMP_STORAGE_LENGTH) {
			this.tmpStorageLength = this.length >>> 1
		}

		this.tmp = new Array(this.tmpStorageLength)

		this.stackLength =
			this.length < 120
				? 5
				: this.length < 1542
				? 10
				: this.length < 119151
				? 19
				: 40

		this.runStart = new Array(this.stackLength)
		this.runLength = new Array(this.stackLength)
	}

	// Push a new run on sorter's stack.
	pushRun(runStart, runLength) {
		this.runStart[this.stackSize] = runStart
		this.runLength[this.stackSize] = runLength
		this.stackSize += 1
	}

	// Merge runs on sorter's stack
	mergeRuns() {
		while (this.stackSize > 1) {
			let n = this.stackSize - 2

			if (
				(n >= 1 &&
					this.runLength[n - 1] <=
						this.runLength[n] + this.runLength[n + 1]) ||
				(n >= 2 &&
					this.runLength[n - 2] <=
						this.runLength[n] + this.runLength[n - 1])
			) {
				if (this.runLength[n - 1] < this.runLength[n + 1]) {
					n--
				}
			} else if (this.runLength[n] > this.runLength[n + 1]) {
				break
			}
			this.mergeAt(n)
		}
	}

	// Merge all runs on sorter's stack until only one remains.
	forceMergeRuns() {
		while (this.stackSize > 1) {
			let n = this.stackSize - 2

			if (n > 0 && this.runLength[n - 1] < this.runLength[n + 1]) {
				n--
			}

			this.mergeAt(n)
		}
	}

	// Merge the runs on the stack at positions i and i+1. Must be always be called with i=stackSize-2 or i=stackSize-3 (that is, we merge on top of the stack).
	mergeAt(i) {
		let compare = this.compare
		let array = this.array

		let start1 = this.runStart[i]
		let length1 = this.runLength[i]
		let start2 = this.runStart[i + 1]
		let length2 = this.runLength[i + 1]

		this.runLength[i] = length1 + length2

		if (i === this.stackSize - 3) {
			this.runStart[i + 1] = this.runStart[i + 2]
			this.runLength[i + 1] = this.runLength[i + 2]
		}

		this.stackSize--

		// Find where the first element in the second run goes in run1. Previous elements in run1 are already in place
		let k = gallopRight(array[start2], array, start1, length1, 0, compare)
		start1 += k
		length1 -= k

		if (length1 === 0) {
			return
		}

		// Find where the last element in the first run goes in run2. Next elements in run2 are already in place
		length2 = gallopLeft(
			array[start1 + length1 - 1],
			array,
			start2,
			length2,
			length2 - 1,
			compare,
		)

		if (length2 === 0) {
			return
		}

		// Merge remaining runs. A tmp array with length = min(length1, length2) is used
		if (length1 <= length2) {
			this.mergeLow(start1, length1, start2, length2)
		} else {
			this.mergeHigh(start1, length1, start2, length2)
		}
	}

	// Merge two adjacent runs in a stable way. The runs must be such that the first element of run1 is bigger than the first element in run2 and the last element of run1 is greater than all the elements in run2. The method should be called when run1.length <= run2.length as it uses sorter temporary array to store run1. Use mergeHigh if run1.length > run2.length.
	mergeLow(start1, length1, start2, length2) {
		let compare = this.compare
		let array = this.array
		let tmp = this.tmp
		let i = 0

		for (i = 0; i < length1; i++) {
			tmp[i] = array[start1 + i]
		}

		let cursor1 = 0
		let cursor2 = start2
		let dest = start1

		array[dest++] = array[cursor2++]

		if (--length2 === 0) {
			for (i = 0; i < length1; i++) {
				array[dest + i] = tmp[cursor1 + i]
			}
			return
		}

		if (length1 === 1) {
			for (i = 0; i < length2; i++) {
				array[dest + i] = array[cursor2 + i]
			}
			array[dest + length2] = tmp[cursor1]
			return
		}

		let minGallop = this.minGallop

		while (true) {
			let count1 = 0
			let count2 = 0
			let exit = false

			do {
				if (compare(array[cursor2], tmp[cursor1]) < 0) {
					array[dest++] = array[cursor2++]
					count2++
					count1 = 0

					if (--length2 === 0) {
						exit = true
						break
					}
				} else {
					array[dest++] = tmp[cursor1++]
					count1++
					count2 = 0
					if (--length1 === 1) {
						exit = true
						break
					}
				}
			} while ((count1 | count2) < minGallop)

			if (exit) {
				break
			}

			do {
				count1 = gallopRight(
					array[cursor2],
					tmp,
					cursor1,
					length1,
					0,
					compare,
				)

				if (count1 !== 0) {
					for (i = 0; i < count1; i++) {
						array[dest + i] = tmp[cursor1 + i]
					}

					dest += count1
					cursor1 += count1
					length1 -= count1
					if (length1 <= 1) {
						exit = true
						break
					}
				}

				array[dest++] = array[cursor2++]

				if (--length2 === 0) {
					exit = true
					break
				}

				count2 = gallopLeft(
					tmp[cursor1],
					array,
					cursor2,
					length2,
					0,
					compare,
				)

				if (count2 !== 0) {
					for (i = 0; i < count2; i++) {
						array[dest + i] = array[cursor2 + i]
					}

					dest += count2
					cursor2 += count2
					length2 -= count2

					if (length2 === 0) {
						exit = true
						break
					}
				}
				array[dest++] = tmp[cursor1++]

				if (--length1 === 1) {
					exit = true
					break
				}

				minGallop--
			} while (
				count1 >= DEFAULT_MIN_GALLOPING ||
				count2 >= DEFAULT_MIN_GALLOPING
			)

			if (exit) {
				break
			}

			if (minGallop < 0) {
				minGallop = 0
			}

			minGallop += 2
		}

		this.minGallop = minGallop

		if (minGallop < 1) {
			this.minGallop = 1
		}

		if (length1 === 1) {
			for (i = 0; i < length2; i++) {
				array[dest + i] = array[cursor2 + i]
			}
			array[dest + length2] = tmp[cursor1]
		} else if (length1 === 0) {
			throw new Error('mergeLow preconditions were not respected')
		} else {
			for (i = 0; i < length1; i++) {
				array[dest + i] = tmp[cursor1 + i]
			}
		}
	}

	// Merge two adjacent runs in a stable way. The runs must be such that the first element of run1 is bigger than the first element in run2 and the last element of run1 is greater than all the elements in run2. The method should be called when run1.length > run2.length as it uses sorter temporary array to store run2. Use mergeLow if run1.length <= run2.length.
	mergeHigh(start1, length1, start2, length2) {
		let compare = this.compare
		let array = this.array
		let tmp = this.tmp
		let i = 0

		for (i = 0; i < length2; i++) {
			tmp[i] = array[start2 + i]
		}

		let cursor1 = start1 + length1 - 1
		let cursor2 = length2 - 1
		let dest = start2 + length2 - 1
		let customCursor = 0
		let customDest = 0

		array[dest--] = array[cursor1--]

		if (--length1 === 0) {
			customCursor = dest - (length2 - 1)

			for (i = 0; i < length2; i++) {
				array[customCursor + i] = tmp[i]
			}

			return
		}

		if (length2 === 1) {
			dest -= length1
			cursor1 -= length1
			customDest = dest + 1
			customCursor = cursor1 + 1

			for (i = length1 - 1; i >= 0; i--) {
				array[customDest + i] = array[customCursor + i]
			}

			array[dest] = tmp[cursor2]
			return
		}

		let minGallop = this.minGallop

		while (true) {
			let count1 = 0
			let count2 = 0
			let exit = false

			do {
				if (compare(tmp[cursor2], array[cursor1]) < 0) {
					array[dest--] = array[cursor1--]
					count1++
					count2 = 0
					if (--length1 === 0) {
						exit = true
						break
					}
				} else {
					array[dest--] = tmp[cursor2--]
					count2++
					count1 = 0
					if (--length2 === 1) {
						exit = true
						break
					}
				}
			} while ((count1 | count2) < minGallop)

			if (exit) {
				break
			}

			do {
				count1 =
					length1 -
					gallopRight(
						tmp[cursor2],
						array,
						start1,
						length1,
						length1 - 1,
						compare,
					)

				if (count1 !== 0) {
					dest -= count1
					cursor1 -= count1
					length1 -= count1
					customDest = dest + 1
					customCursor = cursor1 + 1

					for (i = count1 - 1; i >= 0; i--) {
						array[customDest + i] = array[customCursor + i]
					}

					if (length1 === 0) {
						exit = true
						break
					}
				}

				array[dest--] = tmp[cursor2--]

				if (--length2 === 1) {
					exit = true
					break
				}

				count2 =
					length2 -
					gallopLeft(array[cursor1], tmp, 0, length2, length2 - 1, compare)

				if (count2 !== 0) {
					dest -= count2
					cursor2 -= count2
					length2 -= count2
					customDest = dest + 1
					customCursor = cursor2 + 1

					for (i = 0; i < count2; i++) {
						array[customDest + i] = tmp[customCursor + i]
					}

					if (length2 <= 1) {
						exit = true
						break
					}
				}

				array[dest--] = array[cursor1--]

				if (--length1 === 0) {
					exit = true
					break
				}

				minGallop--
			} while (
				count1 >= DEFAULT_MIN_GALLOPING ||
				count2 >= DEFAULT_MIN_GALLOPING
			)

			if (exit) {
				break
			}

			if (minGallop < 0) {
				minGallop = 0
			}

			minGallop += 2
		}

		this.minGallop = minGallop

		if (minGallop < 1) {
			this.minGallop = 1
		}

		if (length2 === 1) {
			dest -= length1
			cursor1 -= length1
			customDest = dest + 1
			customCursor = cursor1 + 1

			for (i = length1 - 1; i >= 0; i--) {
				array[customDest + i] = array[customCursor + i]
			}

			array[dest] = tmp[cursor2]
		} else if (length2 === 0) {
			throw new Error('mergeHigh preconditions were not respected')
		} else {
			customCursor = dest - (length2 - 1)
			for (i = 0; i < length2; i++) {
				array[customCursor + i] = tmp[i]
			}
		}
	}
}
