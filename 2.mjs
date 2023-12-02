import * as Fs from 'fs/promises'

const file = await Fs.readFile('2.data', {encoding: 'utf8'})
const sum = file.split('\n').reduce((memo, line) => {
	if(!line) return memo

	const max = {red: 0, green: 0, blue: 0}
	const [game, cubes] = line.split(': ')
	const gameId = parseInt(game.split(' ').pop(), 10)
	cubes.split('; ').forEach(set => {
		set.split(', ').forEach(cube => {
			const [num, color] = cube.split(' ')
			const number = parseInt(num)
			if(max[color] < number) max[color] = number
		})
	})
	memo += Object.values(max).reduce((memo, val) => val*memo, 1)
	return memo
}, 0)

console.log(sum)
