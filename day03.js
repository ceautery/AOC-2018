// input = `
// #1 @ 1,3: 4x4
// #2 @ 3,1: 4x4
// #3 @ 5,5: 2x2
// `

fs = require('fs')
input = fs.readFileSync('inputs/03.txt', 'utf8')

lines = input.trim().split('\n')
sections = lines.map(line => {
  let [index, x, y, w, h] = line.match(/\d+/g).map(s => s | 0)
  return { index, x, y, w, h, r: x + w, b: y + h }
})

maxWidth = Math.max(...sections.map(s => s.r))
maxHeight = Math.max(...sections.map(s => s.b))
grid = Array(maxWidth).fill([]).map(_ => Array(maxHeight).fill(0))

sections.forEach(s => {
  for (let x = s.x; x < s.r; x++) {
    for (let y = s.y; y < s.b; y++) grid[x][y]++
  }
})

star1 = grid.map(row => row.filter(c => c > 1).length).reduce((a,b) => a + b)
console.log(star1)

nonOverlapped = sections.find(s => {
  for (let x = s.x; x < s.r; x++) {
    for (let y = s.y; y < s.b; y++) if (grid[x][y] > 1) return false
  }
  return true
})

star2 = nonOverlapped.index
console.log(star2)
