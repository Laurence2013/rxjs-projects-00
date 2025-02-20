/*
	desc-00: In RxJs explain in detail scan() operator
	desc-00a: rxjs-scan
	desc-01: Example 1: Accumulating Values with a Condition
	desc-02: Example 2: Accumulating Objects
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, scan, startWith, pairwise } = require('rxjs/operators');

// desc-01
const source99$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const result99$ = source99$.pipe(
	scan((acc, curr) => curr % 2 === 0 ? acc += curr : acc += 0, 0)
); 
const result99a$ = source99$.pipe(
	filter(num99 => num99 % 2 === 0),
	scan((acc, curr) => acc += curr, 0)
);
// result99a$.subscribe(console.log);

// desc-02
const source98$ = of(
  { type: 'click', timestamp: 1000 },
  { type: 'scroll', timestamp: 2000 },
  { type: 'click', timestamp: 3000 },
  { type: 'keypress', timestamp: 4000 },
  { type: 'click', timestamp: 5000 }i
);
const result98$ = source98$.pipe(

);
