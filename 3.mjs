import * as Fs from 'fs/promises'

const file = await Fs.readFile('3.data', {encoding: 'utf8'})
const sum = file.split('\n').reduce((memo, line, index, lines) => {
	if(!line) return memo

	const lineTotal = line.split('').concat(['.']).reduce((memo, c, idx, chars) => {
		if(c.match(/\d/) && memo.startIndex === undefined) memo.startIndex = idx
		else if(!c.match(/\d/) && memo.startIndex !== undefined) {
			memo.endIndex = idx
			if([].concat(
				index > 0 ? lines[index-1].slice(Math.max(0, memo.startIndex - 1), Math.min(chars.length, memo.endIndex + 1)) : [],
				memo.startIndex > 0 ? chars[memo.startIndex-1] : [],
				memo.endIndex < chars.length ? chars[memo.endIndex] : [],
				index < lines.length ? lines[index+1].slice(Math.max(0, memo.startIndex - 1), Math.min(chars.length, memo.endIndex + 1)) : []
			)
			.some(c => c.match(/[^0-9.]/))) {
				return {startIndex: undefined, endIndex: undefined, sum: memo.sum + parseInt(chars.slice(memo.startIndex, memo.endIndex).join(''), 10)}
			} else {
				// console.log(`${chars.slice(memo.startIndex, memo.endIndex).join('')} not accounted`)
				return {startIndex: undefined, endIndex: undefined, sum: memo.sum}
			}
		}
		return memo
	}, {startIndex: undefined, endIndex: undefined, sum: 0}).sum
	// console.log(`line ${index}: ${lineTotal}`)
	return memo + lineTotal
}, 0)

console.log(sum)
