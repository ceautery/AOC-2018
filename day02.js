fs = require('fs')
input = fs.readFileSync('inputs/02.txt', 'utf8')

// input = `
// abcdef
// bababc
// abbcde
// abcccd
// aabcdd
// abcdee
// ababab`

lines = input.trim().split('\n')

function checksum() {
  counts = { '2': 0, '3': 0 }

  lines.forEach(line => {
    let sorted = line.split('').sort().join('')
    let groups = sorted.replace(/(.)\1*/g, "$&,").split(',')
    if (groups.some(g => g.length == 2)) counts[2]++
    if (groups.some(g => g.length == 3)) counts[3]++
  })

  return counts[2] * counts[3]
}

function offByOne() {
  let common
  lines.some( (line, index) => {
    return lines.slice(index + 1).some(line2 => {
      common = line.split('').filter( (c,i) => line2[i] == c )
      return common.length + 1 == line.length
    })
  })
  return common.join('')
}

star1 = checksum()
console.log(star1)

star2 = offByOne()
console.log(star2)
