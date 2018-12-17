// input = `
// initial state: #..#.#..##......###...###
//
// ...## => #
// ..#.. => #
// .#... => #
// .#.#. => #
// .#.## => #
// .##.. => #
// .#### => #
// #.#.# => #
// #.### => #
// ##.#. => #
// ##.## => #
// ###.. => #
// ###.# => #
// ####. => #
// `

fs = require('fs')
input = fs.readFileSync('inputs/12.txt', 'utf-8')

const initial_state = input.match(/initial state: (.+)/)[1]
const rules = input.match(/^[.#].+(?= => #$)/gm)
const offset = 550

let pots = Array(2 * offset + initial_state.length).fill('.')
initial_state.split('').forEach( (char, index) => pots[index + offset] = char )

// let count = 0
// let prev = 0
function step() {
  // count++
  pots = pots.map( (pot, index, arr) => {
    if (index < 2) return '.'

    const section = arr.slice(index - 2, index + 3).join('')
    return rules.includes(section) ? '#' : '.'
  })
  // const score = pots.reduce( (acc, char, index) => char == '#' ? acc + index - offset : acc, 0 )
  // console.log(count, score, score - prev)
  // prev = score
  let start = pots.indexOf('#')
  console.log(pots.slice(start, start + 200).join('').replace(/\.\./g, '.'))
}

for (let i = 0; i < 20; i++) step()
star1 = pots.reduce( (acc, char, index) => char == '#' ? acc + index - offset : acc, 0 )
for (let i = 0; i < 500; i++) step()

console.log(star1)

const stepNum = 191
const score = 6505
const increment = 34

star2 = score + (50000000000 - stepNum) * increment
console.log(star2)
