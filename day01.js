import { readFileSync } from 'node:fs'

const elves = readFileSync('day01.txt', { encoding: 'utf-8' }) // read .txt file content
  .replace(/\r/g, '') // remove all /r characters to avoid issues on windows
  .trim() // Remove starting/ending whitespace
  .split('\n\n') // split on new line
// .map(Number) // parse each linea into a number

function part1() {
  const calories = elves.map((elf) => {
    const caloriesPerElf = elf.split('\n').map(Number) // split elves that are one line separate and then convert them into integers
    return caloriesPerElf.reduce((previus, current) => previus + current, 0) // sum all calories in each array
  })

  console.log(Math.max(...calories)) // find the highest number in an array of numbers
}

part1()
