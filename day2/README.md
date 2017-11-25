# [Day 2](http://adventofcode.com/2016/day/2)

This one seemed like it shouldn't be too hard, basically just a two-dimensional array with a few simple functions that returned bounded values. However I did something a little bit stupid which was slightly difficult to track down. Here's one of my original, too-clever directional functions:

    const left = i => (--i[1] >= 0) ? i : [i[0], 0];

Here's why that's a disaster: [JavaScript passes arrays by reference][ref]. The input `i` is an array of coordinates. The function mutates that in the conditional to determine whether the result is out of bounds. If it's in-bounds, the mutated array is returned. 

The problem shows up later on. Each digit is calculated from the result of the previous row then that individual result array is stored in a results array. Since each row is seeded with the previous result, processing additional subsequent inputs changes the previous result.

A different clever bit that worked well was mapping the functions to object indexes that corresponded to the known commands.
``` js
const up = i => (i[0] == 0 ? i.slice() : [i[0] - 1, i[1]]);
const down = i => (i[0] == height - 1 ? i.slice() : [i[0] + 1, i[1]]);
const left = i => (i[1] == 0 ? i.slice() : [i[0], i[1] - 1]);
const right = i => (i[1] == width - 1 ? i.slice() : [i[0], i[1] + 1]);

const commands = { U: up, R: right, D: down, L: left };
```
Input commands are known to be `U`, `R`, `D` and `L`, and since we don't need to worry about sanitizing inputs, the input can be used to directly call the direction function in a reduce loop like this:
``` js
const getDigit = (steps, origin) =>
    steps.split("").reduce((prev, step) => commands[step](prev), origin);
```
The first call is seeded with origin `[1, 1]`.




 -->


I did something a little bit stupid here which was surprisingly hard to nail down.


[ref]: http://orizens.com/wp/topics/javascript-arrays-passing-by-reference-or-by-value/