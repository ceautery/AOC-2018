input = 440231

function digitsOf(num) {
  return ('' + num).split('').map(s => s | 0)
}

function tenAfter(count) {
  const limit = count + 10
  const recipes = [3, 7]
  let positions = [0, 1]

  while(recipes.length < limit) {
    const score = positions.reduce((acc, p) => acc + recipes[p], 0)
    const digits = digitsOf(score)
    digits.forEach(d => recipes.push(d))

    positions = positions.map(p => (p + recipes[p] + 1) % recipes.length)
  }

  return recipes.slice(count, count + 10).join('')
}

let pos = 0
function findPattern(source, pattern) {
  while(true) {
    const location = source.indexOf(pattern[0], pos)
    if (location == -1 || location + pattern.length > source.length) return -1

    pos = location + 1
    if (pattern.slice(1).every((d, index) => d == source[index + pos])) return location
  }
}

function when(pattern) {
  const recipes = [3, 7]
  let positions = [0, 1]
  let location = -1

  while(location == -1) {
    const score = positions.reduce((acc, p) => acc + recipes[p], 0)
    const digits = ('' + score).split('').map(s => s | 0)
    digits.forEach(d => recipes.push(d))
    location = findPattern(recipes, pattern)

    positions = positions.map(p => (p + recipes[p] + 1) % recipes.length)
  }

  return location
}

// console.log(tenAfter(9))
// console.log(tenAfter(5))
// console.log(tenAfter(18))
// console.log(tenAfter(2018))

// console.log(when(digitsOf('51589')))
// console.log(when(digitsOf('01245')))
// console.log(when(digitsOf('92510')))
// console.log(when(digitsOf('59414')))

star1 = tenAfter(input)
console.log(star1)

star2 = when(digitsOf(input))
console.log(star2)
