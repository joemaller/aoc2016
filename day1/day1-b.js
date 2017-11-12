const fs = require("fs");
const prettyHrtime = require("pretty-hrtime");
const start = process.hrtime();
const input = fs.readFileSync("input.txt");
const data = input.toString().split(", ");

const visited = [];
const intersections = [];
const intersection = [0, 0];

const distances = { n: 0, e: 0, s: 0, w: 0 };
const directions = "nesw";
// console.log(data)

let facing = 0; // maps to characters in directions: n:0, w: 1, s: 2, e:3

function* range(start, end, interval = 1) {
    if (start < end) {
        for (let i = start; i < end; i += interval) {
            yield i;
        }
    } else {
        for (let i = start; i > end; i -= interval) {
            yield i;
        }
    }
}

const distanceTo = p => Math.abs(p[0]) + Math.abs(p[1]);

const between = (p1, p2) => {
    const xRange = range(Math.min(p1[0], p2[0]), Math.max(p1[0], p2[0]));
    const yRange = range(Math.min(p1[1], p2[1]), Math.max(p1[1], p2[1]));

    for (i of range(p1[0], p2[0])) {
        visited.push([i, p1[1]].join(","));
    }
    for (i of yRange) {
        visited.push([p2[0], i].join(","));
    }

    return p2;
};

data.map(s => {
    const turn = (s[0] === "R") * 2 - 1;
    const distance = parseInt(s.slice(1));
    facing = (4 + facing + turn) % 4;
    distances[directions[facing]] += distance;

    switch (facing) {
        case 0:
            intersection[1] += distance;
            break;
        case 1:
            intersection[0] += distance;
            break;
        case 2:
            intersection[1] -= distance;
            break;
        case 3:
            intersection[0] -= distance;
            break;
    }
    intersections.push(intersection.slice());
});

intersections.reduce(between);

const repeats = visited.filter((corner, index, arr) =>
    arr.slice(0, index).includes(corner)
);

const end = process.hrtime(start);

console.log("Distances:", distances);
console.log("Intersections visited:", visited.length);
console.log(
    "Unique intersections visited:",
    Array.from(new Set(visited)).length
);
console.log("Intersections visited more than once:", repeats.length);
console.log(
    "Distance to first intersection visited twice:",
    distanceTo(repeats[0].split(","))
);
console.log(
    "North-South:",
    distances.n - distances.s,
    "East-West:",
    distances.e - distances.w
);
console.log(
    "Total Blocks:",
    Math.abs(distances.n - distances.s + distances.e - distances.w)
);
console.log("finished in", prettyHrtime(end));
console.log("----");