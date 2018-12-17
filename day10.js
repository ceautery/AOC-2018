// input = `
// position=< 9,  1> velocity=< 0,  2>
// position=< 7,  0> velocity=<-1,  0>
// position=< 3, -2> velocity=<-1,  1>
// position=< 6, 10> velocity=<-2, -1>
// position=< 2, -4> velocity=< 2,  2>
// position=<-6, 10> velocity=< 2, -2>
// position=< 1,  8> velocity=< 1, -1>
// position=< 1,  7> velocity=< 1,  0>
// position=<-3, 11> velocity=< 1, -2>
// position=< 7,  6> velocity=<-1, -1>
// position=<-2,  3> velocity=< 1,  0>
// position=<-4,  3> velocity=< 2,  0>
// position=<10, -3> velocity=<-1,  1>
// position=< 5, 11> velocity=< 1, -2>
// position=< 4,  7> velocity=< 0, -1>
// position=< 8, -2> velocity=< 0,  1>
// position=<15,  0> velocity=<-2,  0>
// position=< 1,  6> velocity=< 1,  0>
// position=< 8,  9> velocity=< 0, -1>
// position=< 3,  3> velocity=<-1,  1>
// position=< 0,  5> velocity=< 0, -1>
// position=<-2,  2> velocity=< 2,  0>
// position=< 5, -2> velocity=< 1,  2>
// position=< 1,  4> velocity=< 2,  1>
// position=<-2,  7> velocity=< 2, -2>
// position=< 3,  6> velocity=<-1, -1>
// position=< 5,  0> velocity=< 1,  0>
// position=<-6,  0> velocity=< 2,  0>
// position=< 5,  9> velocity=< 1, -2>
// position=<14,  7> velocity=<-2,  0>
// position=<-3,  6> velocity=< 2, -1>
// `

fs = require('fs')
input = fs.readFileSync('inputs/10.txt', 'utf8')

lines = input.trim().split('\n')

positions = []
vectors = []

lines.forEach(line => {
  const [x, y, vx, vy] = line.match(/-?\d+/g).map(s => s | 0)
  positions.push([x, y])
  vectors.push([vx, vy])
})

function normalize() {
  const minX = positions.map(p => p[0]).reduce((a,b) => Math.min(a, b))
  const minY = positions.map(p => p[1]).reduce((a,b) => Math.min(a, b))
  return positions.map(p => [p[0] - minX, p[1] - minY])
}

step = 0

function show() {
  const xMax = 120
  const yMax = 30
  const pos = normalize()

  const field = Array(yMax).fill(null).map(_ => Array(xMax).fill('.'))
  pos.forEach(p => {
    [x, y] = p
    if (x < xMax && y < yMax) field[y][x] = '#'
  })

  console.log(step)
  console.log(field.map(l => l.join('')).join('\n'))
}

function advance() {
  step++
  positions.forEach( (position, index) => {
    [vx, vy] = vectors[index]
    position[0] += vx
    position[1] += vy
  })
}
console.log('ready')

const stdin = process.openStdin();

while(step < 10050) advance()

stdin.addListener('data', _ => {
  advance()
  show()
})
