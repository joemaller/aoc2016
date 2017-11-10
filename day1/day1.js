const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");

const start = process.hrtime();
const input = fs.readFileSync("input.txt");

const data = input.toString().split(", ");

const distances = { n: 0, e: 0, s: 0, w: 0 };
const directions = "nesw";
// console.log(data)

let facing = 0; // maps to characters in directions: n:0, w: 1, s: 2, e:3

data.map(s => {
    const turn = (s[0] === "R") * 2 - 1;
    facing = (4 + facing + turn) % 4;
    distances[directions[facing]] += parseInt(s.slice(1));

    // console.log(s[0], turn, (4 + turn) % 4, facing, directions[facing])
});

const end = process.hrtime(start);

console.log("Distances", distances);
console.log(
    "North-South:",
    distances.n - distances.s,
    "East-West",
    distances.e - distances.w
);
console.log(
    "Total Blocks:",
    Math.abs(distances.n - distances.s + distances.e - distances.w)
);
console.log("finished in", prettyHrtime(end));
console.log("----");
