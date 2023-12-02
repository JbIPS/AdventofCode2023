// In memory version
import * as Fs from 'fs/promises'

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function parse(line) {
	let i = 0
	const numbers = []
	while(i < line.length) {
		if(!isNaN(parseInt(line.charAt(i), 10))) numbers.push(parseInt(line.charAt(i), 10))
		else digits.map(d => line.substring(i).startsWith(d)).forEach((b, idx) => {
			if(b) numbers.push(idx)
		})
		i++
	}
	return numbers
}

async function start() {
	const file = await Fs.readFile('1.data', {encoding: 'utf8'})
	const  numbers = file.split('\n').map((line) => {
		if(line === '') return 0
		const convertedLine = parse(line)
		return parseInt(`${convertedLine[0]}${convertedLine[convertedLine.length-1]}`, 10)
	})
	console.log(numbers.reduce((memo, a) => memo + a), 0)
}

start()
