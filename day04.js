// input = `
// [1518-11-01 00:00] Guard #10 begins shift
// [1518-11-01 00:05] falls asleep
// [1518-11-01 00:25] wakes up
// [1518-11-01 00:30] falls asleep
// [1518-11-01 00:55] wakes up
// [1518-11-01 23:58] Guard #99 begins shift
// [1518-11-02 00:40] falls asleep
// [1518-11-02 00:50] wakes up
// [1518-11-03 00:05] Guard #10 begins shift
// [1518-11-03 00:24] falls asleep
// [1518-11-03 00:29] wakes up
// [1518-11-04 00:02] Guard #99 begins shift
// [1518-11-04 00:36] falls asleep
// [1518-11-04 00:46] wakes up
// [1518-11-05 00:03] Guard #99 begins shift
// [1518-11-05 00:45] falls asleep
// [1518-11-05 00:55] wakes up
// `

fs = require('fs')
input = fs.readFileSync('inputs/04.txt', 'utf-8')

lines = input.trim().split('\n').sort()
guards = {}

function guardNumber(l) {
  return l.match(/#(\d+)/)[1]
}

function getMinute(l) {
  return l.match(/:(\d+)/)[1] | 0
}

function minutesAsleep(guard) {
  return guard.reduce((a,b) => a + b.length, 0)
}

function favoriteMinute(guard) {
  const minutes = Array(60).fill(0)
  guard.forEach(day => day.forEach(minute => minutes[minute]++))
  let count = Math.max(...minutes)
  return [count, minutes.indexOf(count)]
}

guardNumbers = new Set(lines.filter(l => l.includes('#')).map(guardNumber))
guardNumbers.forEach(n => guards[n] = [])

let current, day, sleep, wake

lines.forEach(l => {
  if(/#/.test(l)) {
    if (current) guards[current].push(day)
    current = guardNumber(l)
    day = []
  } else if (/asleep/.test(l)) {
    sleep = getMinute(l)
  } else if (/wakes/.test(l)) {
    wake = getMinute(l)
    for (let minute = sleep; minute < wake; minute++) day.push(minute)
  }
})
guards[current].push(day)

let max = 0, maxGuard
for (let guard in guards) {
  let minutes = minutesAsleep(guards[guard])
  if (minutes > max) {
    max = minutes
    maxGuard = guard
  }
}

let fav = favoriteMinute(guards[maxGuard])[1]
star1 = maxGuard * fav
console.log(star1)

max = 0, maxCount = 0
for (let guard in guards) {
  let [count, minute] = favoriteMinute(guards[guard])
  if (count > maxCount) {
    max = minute
    maxCount = count
    maxGuard = guard
  }
}

star2 = maxGuard * max
console.log(star2)
