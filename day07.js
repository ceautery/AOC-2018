// input = `
// Step C must be finished before step A can begin.
// Step C must be finished before step F can begin.
// Step A must be finished before step B can begin.
// Step A must be finished before step D can begin.
// Step B must be finished before step E can begin.
// Step D must be finished before step E can begin.
// Step F must be finished before step E can begin.
// `

fs = require('fs')
input = fs.readFileSync('inputs/07.txt', 'utf-8')

lines = input.trim().split('\n')
re = /^Step ([A-Z]).+step ([A-Z])/
steps = {}

function init(step) {
  if (!steps[step]) {
    steps[step] = { parents: [], children: [] }
  }
}

lines.forEach(line => {
  let [_, parent, child] = line.match(re)
  init(parent); init(child)
  steps[parent].children.push(child)
  steps[child].parents.push(parent)
})

const available = []
for (let step in steps) {
  if (!steps[step].parents.length) {
    available.push(step)
  }
}

let order = ''
let seconds = 0
const workers = 5
const baseTaskLength = 60
const working = new Set()

function pickUpWork() {
  while (available.length && working.size < workers) {
    const nextName = available.sort().shift()
    const step = steps[nextName]
    step.doneAt = baseTaskLength + nextName.charCodeAt() - 64 + seconds
    working.add(nextName)
  }
}

while (available.length || working.size) {
  pickUpWork()
  working.forEach(nextName => {
    if (seconds == steps[nextName].doneAt) {
      working.delete(nextName)
      order += nextName
      steps[nextName].children.forEach(child => {
        if (steps[child].parents.every(p => order.includes(p))) {
          available.push(child)
        }
      })
      pickUpWork()
    }
  })

  seconds++
}

console.log(order)
console.log(seconds - 1)
