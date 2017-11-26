const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");

const start = process.hrtime();
const input = fs.readFileSync("input.txt");

const data = input.toString().trim().split("\n");
const testData = ["ULL", "RRDDD", "LURDL", "UUUUD"];

// This is a lovely hack for simpler keypad code
const [A, B, C, D, _︎] = "ABCD_︎".split("");

// first index is row, second is column (y,x)
// since we'll be checking inputs, the keypad is bordered with 0s
const keypad = [
    [_︎, _︎, _︎, _︎, _︎, _︎, _︎],
    [_︎, _︎, _︎, 1, _︎, _︎, _︎],
    [_︎, _︎, 2, 3, 4, _︎, _︎],
    [_︎, 5, 6, 7, 8, 9, _︎],
    [_︎, _︎, A, B, C, _︎, _︎],
    [_︎, _︎, _︎, D, _︎, _︎, _︎],
    [_︎, _︎, _︎, _︎, _︎, _︎, _︎]
];

// assume normalized grid with all cells filled
const width = keypad[0].length;
const height = keypad.length;

// direction functions always return new arrays instead of mutating the existing arrays
const up = i => (keypad[i[0] - 1][i[1]] != _︎ ? [i[0] - 1, i[1]] : i.slice());
const down = i => (keypad[i[0] + 1][i[1]] != _︎ ? [i[0] + 1, i[1]] : i.slice());

const left = i => (keypad[i[0]][i[1] - 1] != _︎ ? [i[0], i[1] - 1] : i.slice());
const right = i => (keypad[i[0]][i[1] + 1] != _︎ ? [i[0], i[1] + 1] : i.slice());

const commands = { U: up, R: right, D: down, L: left };

const getDigit = (steps, origin) =>
    steps.split("").reduce((prev, step) => commands[step](prev), origin);

function decode(data) {
    const code = [];

    data.reduce(
        (prev, curr) => {
            const last = getDigit(curr, prev);
            code.push(last);
            return last;
        },
        [4, 1]
    );

    return code.map(index => keypad[index[0]][index[1]]).join("");
}

console.log("Bathroom keypad code is %s (test data)", decode(testData));
console.log("Bathroom keypad code is %s", decode(data));

const end = process.hrtime(start);

console.log("finished in", prettyHrtime(end));
console.log("----");