function play(playerCount, lastMarble) {
  const rootNode = { val: 0 }
  rootNode.prev = rootNode
  rootNode.next = rootNode

  const scores = Array(playerCount).fill(0)
  let player = 0
  let position = 0
  let current = rootNode

  for (let m = 1; m <= lastMarble; m++) {
    if (m % 23 == 0) {
      scores[player] += m
      for (let i = 0; i < 7; i++) current = current.prev
      scores[player] += current.val
      current.prev.next = current.next
      current.next.prev = current.prev
      current = current.next
    } else {
      current = current.next
      const node = { val: m, prev: current, next: current.next }
      current.next.prev = node
      current.next = node
      current = node
    }
    player = (player + 1) % playerCount
  }

  return scores.reduce((a, b) => Math.max(a, b))
}

star1 = play(405, 70953)
console.log(star1)

star2 = play(405, 7095300)
console.log(star2)
