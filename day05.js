// input = 'dabAcCaCBAcCcaDA'

fs = require('fs')
input = fs.readFileSync('inputs/05.txt', 'utf-8').trim()

alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
pattern = alphabet.map(l => {
    u = l.toUpperCase()
    return `${l}${u}|${u}${l}`
}).join('|')

re = new RegExp(pattern, 'g')
star1Str = input.toString()

while (re.test(star1Str)) star1Str = star1Str.replace(re, '')

star1 = star1Str.length
console.log(star1)

function ignoreAndFold(c) {
  let str = input.replace(new RegExp(c, 'ig'), '')
  while (re.test(str)) str = str.replace(re, '')
  return str.length
}

star2 = alphabet.reduce((min, c) => Math.min(min, ignoreAndFold(c)), input.length)
console.log(star2)
