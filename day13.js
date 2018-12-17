// input = `
// /->-\\
// |   |  /----\\
// | /-+--+-\\  |
// | | |  | v  |
// \\-+-/  \\-+--/
//   \\------/
// `

fs = require('fs')
input = fs.readFileSync('inputs/13.txt', 'utf-8')

directions = [
  {name: '^', xd:  0, yd: -1},
  {name: '>', xd:  1, yd:  0},
  {name: 'v', xd:  0, yd:  1},
  {name: '<', xd: -1, yd:  0}
]
debugger
grid = input.split('\n').filter(l => l.length).map(line => line.split(''))

cars = []
collisions = []

grid.forEach((row, y) => row.forEach( (cell, x) => {
  if (/[><v^]/.test(cell)) {
    const direction = directions.findIndex(d => d.name == cell)
    cars.push({nextIntersection: 0, direction, x, y})
  }
}))

function collision(car) {
  const collidedWith = cars.find(c => c != car && c.x == car.x && c.y == car.y)
  if (collidedWith) {
    collisions.push(collidedWith)
    collisions.push(car)
    collidedWith.wrecked = true
    car.wrecked = true
  }
  return !!collidedWith
}

stepnum = 0

function step() {
  stepnum++
  let hasCollision = false
  cars.sort((a, b) => a.y - b.y || a.x - b.x).forEach(car => {
    if (car.wrecked) return

    const direction = directions[car.direction]
    car.x += direction.xd
    car.y += direction.yd
    if (collision(car)) hasCollision = true

    const cell = grid[car.y][car.x]
    if (cell == '/') car.direction += car.direction % 2 ? -1 : 1
    else if (cell == '\\') car.direction += car.direction % 2 ? 1 : -1
    else if (cell == '+') {
      car.direction += car.nextIntersection - 1
      car.nextIntersection = (car.nextIntersection + 1) % 3
    }

    if (car.direction < 0) car.direction = 3
    else if (car.direction > 3) car.direction = 0
  })

  if (hasCollision) cars = cars.filter(c => !collisions.includes(c))
}

while (cars.length > 1) step()
console.log(collisions[0])
console.log(cars)
console.log(stepnum)
