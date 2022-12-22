import { readFileSync } from 'node:fs'

const lines = readFileSync('day02.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n')
  .map((line) => line.split(' ')) // split each match in an array

const moves = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const mapInput = {
  A: moves.rock,
  B: moves.paper,
  C: moves.scissors,
  X: moves.rock,
  Y: moves.paper,
  Z: moves.scissors,
}

function score(opponentMove, ourMove) {
  // Draw
  if (opponentMove === ourMove) {
    return ourMove + 3
  }

  // we win
  if (
    (opponentMove === moves.rock && ourMove === moves.paper) ||
    (opponentMove === moves.paper && ourMove === moves.scissors) ||
    (opponentMove === moves.scissors && ourMove === moves.rock)
  ) {
    return ourMove + 6
  }

  // if not of this is true the only thing we have left is that we lost
  // we lost
  return ourMove
}

function partOne() {
  const outcomes = lines.map((line) => {
    const opponentMove = mapInput[line[0]]
    const ourMove = mapInput[line[1]]

    return score(opponentMove, ourMove)
  })

  const result = outcomes.reduce((a, b) => a + b, 0)
  console.log(result)
}

const solution = {
  A: {
    // rock
    X: moves.scissors, // lose
    Y: moves.rock, // draw
    Z: moves.paper, // win
  },
  B: {
    // paper
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors,
  },
  C: {
    // scissors
    X: moves.paper,
    Y: moves.scissors,
    Z: moves.rock,
  },
}

function partTwo() {
  const outcomes = lines.map((line) => {
    const opponentMove = mapInput[line[0]] // "scissors"

    // Guess our move from the instructions
    // line[0][line[1]] = A: { Y } draw
    const ourMove = solution[line[0]][line[1]] // "rock"

    return score(opponentMove, ourMove) // (rock, scissors)
  })

  const result = outcomes.reduce((a, b) => a + b, 0)
  console.log(result)
  return result
}

partOne()
partTwo()
