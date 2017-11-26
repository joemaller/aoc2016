const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");

const start = process.hrtime();
const input = fs.readFileSync("input.txt");

const numSort = (a, b) => a - b;

const isTri = arr => arr[0] + arr[1] > arr[2];

const data = input
    .toString()
    .trim()
    .split("\n")
    .map(n => n.trim().split(/\s+/).map(n => parseInt(n, 10)).sort(numSort))
    .filter(isTri);

const testData = [5, 10, 25].sort(numSort);
console.log(data);
console.log("there are %s triangles in the dataset", data.length);
console.log("[3, 4, 5]", isTri([3, 4, 5]));
console.log("[5, 4, 3]", isTri([5, 4, 3]));
console.log("[5, 3, 4]", isTri([5, 3, 4]));
console.log("[25, 10, 5]", isTri([25, 10, 5]));
console.log("[5, 25, 10]", isTri([5, 25, 10]));
console.log("[5, 10, 25]", isTri([5, 10, 25]));

const end = process.hrtime(start);

console.log("finished in", prettyHrtime(end));
console.log("----");