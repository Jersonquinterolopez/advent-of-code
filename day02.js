import { readFileSync } from 'node:fs'

const RawMatches = readFileSync('day02.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n')

const scores = [
  { keyword: 'A', identifier: 'rock', score: 1 },
  { keyword: 'B', identifier: 'paper', score: 2 },
  { keyword: 'C', identifier: 'scissors', score: 3 },
  { keyword: 'X', identifier: 'rock', score: 1 },
  { keyword: 'Y', identifier: 'paper', score: 2 },
  { keyword: 'Z', identifier: 'scissors', score: 3 },
]

const findValue = (keyword) =>
  scores.find((element) => element.keyword === keyword)

const matches = RawMatches.map((keyword, index) => ({
  leftPlayer: { id: index, ...findValue(keyword.charAt(0)) },
  rightPlayer: {
    id: index,
    ...findValue(keyword.charAt(2)),
  },
}))

const WINNER_SCORE = 6
const LOSSER_SCORE = 0
const DRAW_SCORE = 3

function playMatch(match) {
  let leftPlayer = Object.values(match)[0]
  let rightPlayer = Object.values(match)[1]

  // Draw
  if (leftPlayer.identifier === rightPlayer.identifier)
    return rightPlayer.score + DRAW_SCORE

  // left player cases
  if (leftPlayer.identifier === 'rock') {
    if (rightPlayer.identifier === 'paper')
      return rightPlayer.score + WINNER_SCORE
    if (rightPlayer.identifier === 'scissors')
      return rightPlayer.score + LOSSER_SCORE
  }

  if (leftPlayer.identifier === 'paper') {
    if (rightPlayer.identifier === 'rock')
      return rightPlayer.score + LOSSER_SCORE
    if (rightPlayer.identifier === 'scissors')
      return rightPlayer.score + WINNER_SCORE
  }

  if (leftPlayer.identifier === 'scissors') {
    if (rightPlayer.identifier === 'rock')
      return rightPlayer.score + WINNER_SCORE
    if (rightPlayer.identifier === 'paper')
      return rightPlayer.score + LOSSER_SCORE
  }
}

function getFinalScore(matches) {
  let finalScore = 0
  for (const match of matches) {
    let score = playMatch(match)
    finalScore += score
  }
  console.log(finalScore)
}

getFinalScore(matches)

// result 9759
