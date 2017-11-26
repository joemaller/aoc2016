# [Day 3: Squares With Three Sides](http://adventofcode.com/2016/day/3)

## Part 1
I took the `A + B > C` triangle test and decided to run a simple test across the data set. Since the smallest sides would need to exceed the largest side, I also sorted each set of data before testing. Pretty simple: Read. Split. Map. Split. ParseInt. Sort. Filter. Almost a one-liner, a bit unglainly though.

The only hangup is remembering that JavaScript's `string.split()` returns strings, so the input numbers need to be cast to integers before testing.

## Part 2

Ok, that was just mean. We're not reading rows, we're reading columns and testing every three entries. This seems like an easy [awk][] task (after remembering how to use it). But sticking with JavaScript, I just ripped the rows into three arrays, then appended those together.

With all the data in one array, I used a splice from a do...while loop to chew the numbers down into a set of three element arrays. That set of data was filtered with the same check used in part 1. 

[awk]: https://en.wikipedia.org/wiki/AWK