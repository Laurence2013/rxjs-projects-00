/*
desc-00: Emitting only the first 2 values from an interval and logging them. Tag rxjs-combineall
goal:
line-code-added:
*/
const { take, map, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const source$ = interval(1000).pipe(take(2));

source$.subscribe(console.log);
