const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");

const start = process.hrtime();
const input = fs.readFileSync("input.txt");

const numSort = (a, b) => a - b;

const isTri = arr => arr[0] + arr[1] > arr[2];

const cols = [[], [], []];

input
    .toString()
    .trim()
    .split("\n")
    .map(n =>
        n.trim().split(/\s+/).map((n, i) => cols[i].push(parseInt(n, 10)))
    );
const allCols = [].concat(...cols);

const data = [];

do {
    const arr = allCols.splice(0, 3).sort(numSort);
    data.push(arr);
} while (allCols.length);

const tris = data.filter(isTri);

const testData = [5, 10, 25].sort(numSort);
console.log("there are %s triangles in the dataset", tris.length);

const end = process.hrtime(start);

console.log("finished in", prettyHrtime(end));
console.log("----");