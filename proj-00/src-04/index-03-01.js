/*
	desc-00: In RxJs what is distinct()? In RxJs what is distinctUntilChanged()? In RxJs what is distinctUntilKeyChanged()?
	desc-00a: rxjs-distinct, rxjs-distinctUntilChanged, rxjs-distinctUntilKeyChanged
	desc-01: Example 1: Using distinct() with scan() to Accumulate Unique Values
	desc-02: Example 2: Using distinct() with reduce() to Accumulate Unique Values
	desc-03: Example 3: Using distinct() with scan() to Accumulate Unique Objects
	goal:
	line-code-added:
*/
const { interval, of, from } = require('rxjs');
const { tap, map, scan, reduce, delay, flatMap, mergeMap, switchMap, distinct } = require('rxjs/operators');

// desc-01
const source00$ = of(1, 2, 2, 3, 1, 4, 4);
const result00$ = source00$.pipe(
	distinct(),
	scan((acc, curr) => [acc + curr], [])
);
const result00a$ = source00$.pipe(
	distinct(),
	scan((acc, curr) => [...acc, curr], [])
);
// result00$.subscribe(console.log);

// desc-02
const source01$ = of(1,2,1,2,2,3,4,3,5,5,6,9,9,8,7,6,6);
const result01$ = source01$.pipe(
	distinct(),
	reduce((acc, curr) => [...acc, curr], [])
);
// result01$.subscribe(console.log);

// desc-03
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Charlie' }
];
const result02$ = of(...users).pipe(
	distinct(user => user.id),
	scan((acc, curr) => [...acc, curr], []),
);
result02$.subscribe(console.log);
