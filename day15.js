input = `
#######
#E..G.#
#...#.#
#.G.#G#
#######
`

lines = input.split('\n').filter(l => l.length)

goblins = []
elves = []

function checkType(x, y, char) {
  if (char == '#') return char

  if (char == 'E') {
    const elf = new Combatant(x, y, 'elf')
    elves.push(elf)
    return elf
  }

  if (char == 'G') {
    const goblin = new Combatant(x, y, 'goblin')
    goblins.push(goblin)
    return goblin
  }
}

class Combatant {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    this.type = type
    this.hitPoints = 200
    this.attack = 3
  }

  alive() {
    return this.hitPoints > 0
  }
}

grid = lines.map((row, y) => row.split('').map((char, x) => checkType(x, y, char)))
console.log(grid)
console.log(elves)
console.log(goblins)
