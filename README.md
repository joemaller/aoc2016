# aoc2016
Advent of Code 2016, if I have time

I'm not in a place where I need or want to learn a new language this year, so I chose to solve these using modern JavaScript. 

Each day should have it's own package.json file, so run npm install for each day. 

Run `npm start` in each directory to kick off a simple [chokidar-cli][] watch which re-runs the script whenever it's saved. Makes iterating fast and easy.

This may not stick, but initial goals are to solve each day's puzzles without libraries, then to go back and try to use libraries to save work. Theoretically this should help be better understand what each lib does, and exactly how much time they could save me. (the only exception is [pretty hrtime][] for reporting)

[chokdar-cli]: https://github.com/kimmobrunfeldt/chokidar-cli
[pretty-hrtime]: https://www.npmjs.com/package/pretty-hrtime