import arrSort from '../src/arr-sort'
import ArrayGenerator from '../test/array-generator.js'

function numberCompare(a, b) {
	return a - b
}

var lengths = [10, 100, 1000, 10000]

function repetitionsFromLength(n) {
	return parseInt(12000000 / (n * (Math.log(n) / Math.LN10)))
}

var PrettyPrinter = function () {
	this.str = ''
}

PrettyPrinter.prototype.addAt = function (value, at) {
	while (at > this.str.length) {
		this.str += ' '
	}
	this.str += value
}

PrettyPrinter.prototype.toString = function () {
	return this.str
}

var defaultResults = {}
var timsortResults = {}

var printer = new PrettyPrinter()
printer.addAt('ArrayType', 0)
printer.addAt('Length', 30)
printer.addAt('arrSort', 37)
printer.addAt('Native sort', 47)
printer.addAt('Times faster', 59)
console.log(printer.toString())

const generators = [
	'randomInt',
	'descendingInt',
	'ascendingInt',
	'ascending3RandomExchangesInt',
	'ascending10RandomEndInt',
	'allEqualInt',
	'manyDuplicateInt',
	'someDuplicateInt',
]

for (var generatorName of generators) {
	if (ArrayGenerator.hasOwnProperty(generatorName)) {
		var generator = ArrayGenerator[generatorName]
		defaultResults[generatorName] = {}
		timsortResults[generatorName] = {}

		for (var j = 0; j < lengths.length; j++) {
			var length = lengths[j]

			var defaultTime = 0
			var timsortTime = 0
			var repetitions = repetitionsFromLength(length)

			for (var i = 0; i < repetitions; i++) {
				var arr1 = generator(length)
				var arr2 = arr1.slice()

				var start = process.hrtime()
				arr1.sort(numberCompare)
				var stop = process.hrtime()

				var startNano = start[0] * 1000000000 + start[1]
				var stopNano = stop[0] * 1000000000 + stop[1]
				defaultTime += stopNano - startNano

				start = process.hrtime()
				arrSort(arr2, numberCompare)
				stop = process.hrtime()

				startNano = start[0] * 1000000000 + start[1]
				stopNano = stop[0] * 1000000000 + stop[1]
				timsortTime += stopNano - startNano
			}

			defaultResults[generatorName][length] = defaultTime / repetitions
			timsortResults[generatorName][length] = timsortTime / repetitions
			printer = new PrettyPrinter()
			printer.addAt(generatorName, 0)
			printer.addAt(length, 30)
			printer.addAt(parseInt(timsortResults[generatorName][length]), 37)
			printer.addAt(parseInt(defaultResults[generatorName][length]), 47)
			printer.addAt(
				parseFloat(
					(
						defaultResults[generatorName][length] /
						timsortResults[generatorName][length]
					).toString(),
				).toFixed(2),
				59,
			)
			console.log(printer.toString())
		}
	}
}
