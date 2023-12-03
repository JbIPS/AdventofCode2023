import * as Fs from 'fs/promises'

const file = await Fs.readFile('3.data', {encoding: 'utf8'})
function findAsterisk(asterisks, x, y, number) {
	const ast = asterisks.find(a => a.y === y && a.x === x)
	if(ast == null) asterisks.push({x, y, numbers:[number]})
	else ast.numbers.push(number)
}
const asterisks = file.split('\n').reduce((memo, line, index, lines) => {
	if(!line) return memo

	const {asterisks: lineAsterisks} = line.split('').concat(['.']).reduce((memo, c, idx, chars) => {
		if(c.match(/\d/) && memo.startIndex === undefined) memo.startIndex = idx
		else if(!c.match(/\d/) && memo.startIndex !== undefined) {
			memo.endIndex = idx
			const number = parseInt(chars.slice(memo.startIndex, memo.endIndex).join(''), 10)
			if(index > 0) {
				const y = index-1
				const offset = memo.startIndex === 0 ? 0 : memo.startIndex-1
				const up = lines[y].slice(offset, Math.min(chars.length, memo.endIndex + 1))
				for(let m of up.matchAll(/\*/g)) {
					findAsterisk(memo.asterisks, offset + m.index, y, number)
				}
			}
			if(memo.startIndex > 0 && chars[memo.startIndex-1] === '*') {
				findAsterisk(memo.asterisks, memo.startIndex-1, index, number)
			}
			if(memo.endIndex < chars.length && chars[memo.endIndex] === '*') {
				findAsterisk(memo.asterisks, memo.endIndex, index, number)
			}
			if(index < lines.length) {
				const y = index+1
				const offset = memo.startIndex === 0 ? 0 : memo.startIndex-1
				const down = lines[y].slice(offset, Math.min(chars.length, memo.endIndex + 1))
				for(let m of down.matchAll(/\*/g)) {
					findAsterisk(memo.asterisks, offset + m.index, y, number)
				}
			}
			return {startIndex: undefined, endIndex: undefined, asterisks: memo.asterisks}
		}
		return memo
	}, {startIndex: undefined, endIndex: undefined, asterisks: memo})
	return lineAsterisks
}, [])
console.log(asterisks.reduce((memo, a) => memo + (a.numbers.length === 2 ? a.numbers[0]*a.numbers[1] : 0), 0))
