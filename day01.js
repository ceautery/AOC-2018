fs = require('fs')
input = fs.readFileSync('inputs/01.txt', 'utf8')

function sum(a,b) { return a + b }

lines = input.trim().split('\n')
numbers = lines.map(l => l | 0)

star1 = numbers.reduce(sum)
console.log(star1)

function findDuplicateFrequency() {
  let frequencies = new Set()
  let current = 0
  let duplicate
  while (!duplicate) {
    duplicate = numbers.some(num => {
      frequencies.add(current)
      current += num
      if (frequencies.has(current)) return true
    })
  }
  return current
}

star2 = findDuplicateFrequency()
console.log(star2)
