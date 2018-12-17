// input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'

fs = require('fs')
input = fs.readFileSync('inputs/08.txt', 'utf8')

vals = input.match(/\d+/g).map(s => s | 0)

nodes = []

function makeNode() {
  const node = { children: [], metadata: []}
  node.index = nodes.length
  nodes.push(node)
  const numChildren = vals.shift()
  const numMetadata = vals.shift()

  for (let i = 0; i < numChildren; i++) node.children.push(makeNode())
  for (let i = 0; i < numMetadata; i++) node.metadata.push(vals.shift())
  return node
}

const rootNode = makeNode()

function sum(a, b) { return a + b }
star1 = nodes.map(node => node.metadata.reduce(sum)).reduce(sum)
console.log(star1)

function getValue(node) {
  if (node.children.length == 0) {
    return node.metadata.reduce(sum)
  }

  const children = node.metadata
    .map(m => node.children.find( (child, index) => m - 1 == index ))
    .filter(c => c)

  return children.reduce( (acc, child) => acc + getValue(child), 0)
}

star2 = getValue(rootNode)
console.log(star2)
