# [Day 2](http://adventofcode.com/2016/day/2)

## Part 1
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


## Part 2
I must have made some good choices on part one, because I didn't have to  adapt much to arrive at this solution.

For part one, it was possible to just check whether the keypad array indexes were in bounds. With the quirky keypad in part 2, that wasn't going to work and it would be necessary to evaluate the actual keypad values. 

To simplify, I decided initially the entire keypad should be bounded with zeros. I also wanted the code to look like the keypad diagram, but I'm really lazy and didn't want to use strings everywhere -- too many quotemarks. Instead, I used a clever little hack which assigned strings to uppercase constants. Using ES6 destructuring assignment, it's nearly pythonic:

``` js
const [A, B, C, D, _︎] = "ABCD_︎".split("");
```

Oh, and once I was there, I decided the zeros were too cumbersome and switched them out for an underscore (various unicode characters didn't work). This made me happy:

``` js
const keypad = [
    [_︎, _︎, _︎, _︎, _︎, _︎, _︎],
    [_︎, _︎, _︎, 1, _︎, _︎, _︎],
    [_︎, _︎, 2, 3, 4, _︎, _︎],
    [_︎, 5, 6, 7, 8, 9, _︎],
    [_︎, _︎, A, B, C, _︎, _︎],
    [_︎, _︎, _︎, D, _︎, _︎, _︎],
    [_︎, _︎, _︎, _︎, _︎, _︎, _︎]
];
```

Here are the revised directional commands, note that underscore becomes the falsey value. 

``` js
const up = i => (keypad[i[0] - 1][i[1]] != _︎ ? [i[0] - 1, i[1]] : i.slice());
const down = i => (keypad[i[0] + 1][i[1]] != _︎ ? [i[0] + 1, i[1]] : i.slice());
const left = i => (keypad[i[0]][i[1] - 1] != _︎ ? [i[0], i[1] - 1] : i.slice());
const right = i => (keypad[i[0]][i[1] + 1] != _︎ ? [i[0], i[1] + 1] : i.slice());
```

Moving on to day 3!

[ref]: http://orizens.com/wp/topics/javascript-arrays-passing-by-reference-or-by-value/