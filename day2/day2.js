const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");

const start = process.hrtime();
const input = fs.readFileSync("input.txt");


const data = input.toString().trim().split("\n");
// const data = `ULL
// RRDDD
// LURDL
// UUUUD
// `.trim().split("\n")


// first index is row, second is column (y,x)
// should probably transpose this
const keypad = [
[1,2,3],
[4,5,6],
[7,8,9]];

// assume normalized grid with all cells filled
const width = keypad[0].length;
const height = keypad.length;

// direction functions always return new arrays instead of mutating the existing arrays
const up = i => (i[0] == 0 ? i.slice() : [i[0] - 1, i[1]]);
const down = i => (i[0] == height - 1 ? i.slice() : [i[0] + 1, i[1]]);
const left = i => (i[1] == 0 ? i.slice() : [i[0], i[1] - 1]);
const right = i => (i[1] == width - 1 ? i.slice() : [i[0], i[1] + 1]);

const commands = { U: up, R: right, D: down, L: left };

const getDigit = (steps, origin) =>
    steps.split("").reduce((prev, step) => commands[step](prev), origin);

const code = [];

data.reduce((prev, curr) => {
    const last = getDigit(curr, prev);
    code.push(last)
    return last
}, [1,1])

const answer = code.map(index => keypad[index[0]][index[1]]).join('')

console.log("Bathroom keypad code is %s", answer);

const end = process.hrtime(start);

console.log("finished in", prettyHrtime(end));
console.log("----");