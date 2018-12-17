// input = `
// 1, 1
// 1, 6
// 8, 3
// 3, 4
// 5, 5
// 8, 9
// `

fs = require('fs')
input = fs.readFileSync('inputs/06.txt', 'utf-8')

lines = input.trim().split('\n')
coords = lines.map(l => l.match(/\d+/g).map(s => s | 0))

maxLeft = maxRight = coords[0][0]
maxTop = maxBottom = coords[0][1]

coords.forEach(point => {
  const [x, y] = point
  if (x < maxLeft) maxLeft = x
  if (x > maxRight) maxRight = x
  if (y < maxTop) maxTop = y
  if (y > maxBottom) maxBottom = y
})

function distance(p1, p2) {
  const [x1, y1] = p1
  const [x2, y2] = p2
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function findClosest(p1) {
  const distances = coords.map(p2 => distance(p1, p2))
  const shortest = Math.min(...distances)
  const count = distances.filter(d => d == shortest).length
  if (count == 1) return distances.indexOf(shortest)
}

function onEdge(x, y) {
  return x == maxLeft || x == maxRight || y == maxTop || y == maxBottom
}

function allDistances(p1) {
  return coords.reduce((acc, p2) => acc + distance(p1, p2), 0)
}

counts = coords.map(_ => 0)
infinites = coords.map(_ => false)

for (let y = maxTop; y <= maxBottom; y++) {
  for (let x = maxLeft; x <= maxRight; x++) {
    const closest = findClosest([x,y])
    if (closest != null) {
      counts[closest]++
      if (onEdge(x,y)) infinites[closest] = true
    }
  }
}

finiteCounts = counts.map((count, index) => infinites[index] ? 0 : count)

star1 = Math.max(...finiteCounts)
console.log(star1)

safeRegion = 0
maxDistance = 10000
for (let y = maxTop; y <= maxBottom; y++) {
  for (let x = maxLeft; x <= maxRight; x++) {
    if (allDistances([x, y]) < maxDistance) safeRegion++
  }
}

star2 = safeRegion
console.log(star2)
