export default class ArrayGenerator {
	static randomInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(parseInt(Math.random() * 9007199254740992))
		}
		return arr
	}

	static descendingInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(n - i)
		}
		return arr
	}

	static ascendingInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(i)
		}
		return arr
	}

	static ascending3RandomExchangesInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(i)
		}
		for (i = 0; i < 1; i++) {
			var first = parseInt(Math.random() * n)
			var second = parseInt(Math.random() * n)
			var tmp = arr[first]
			arr[first] = arr[second]
			arr[second] = tmp
		}
		return arr
	}

	static ascending10RandomEndInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(i)
		}
		var endStart = n - 10
		for (i = endStart; i < n; i++) {
			arr[i] = parseInt(Math.random() * n)
		}
		return arr
	}

	static allEqualInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(42)
		}
		return arr
	}

	static manyDuplicateInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(
				parseInt(Math.random() * ((n / 2) * (Math.log(n) / Math.LN10))),
			)
		}
		return arr
	}

	static someDuplicateInt(n) {
		var arr = []
		for (var i = 0; i < n; i++) {
			arr.push(parseInt(Math.random() * n))
		}
		return arr
	}
}
