input = 7139

// input = 18
const serialNumber = input
const size = 300

function hundredsPlace(num) {
  return  num / 100 % 10 | 0
}
nums = []
function powerLevel(cell) {
  const [x, y] = cell
  const rackID = x + 10
  let pl = rackID * y
  pl += serialNumber
  pl *= rackID
  pl = hundredsPlace(pl)
  nums.push(pl - 5)
  return pl - 5
}

let grid = Array(size).fill(null).map(_ => Array(size).fill(0))

function matrix(cell, n) {
  const [x, y] = cell
  if (x + n + 1 >= size || y + n + 1 >= size) return 0

  let pl = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let inc = x + j < size && y + i < size ? grid[y + i][x + j] : 0
      pl += inc
    }
  }

  return pl
}

grid = grid.map( (row, y) => row.map( (cell, x) => powerLevel([x+1, y+1]) ) )

function getMax(n) {
  const totals = grid.map( (row, y) => row.map( (cell, x) => matrix([x, y], n) ) )
  let max = 0, xMax = 0, yMax = 0
  totals.forEach( (row, y) => row.forEach( (cell, x) => {
    if (cell > max) {
      max = cell
      xMax = x
      yMax = y
    }
  }))

  return [max, xMax + 1, yMax + 1]
}


star1 = getMax(3)
console.log(star1)

console.log(getMax(16))

