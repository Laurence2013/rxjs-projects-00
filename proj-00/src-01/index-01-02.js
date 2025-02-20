/*
	desc-00: combineAll() and mergeAll()
	desc-00a: rxjs-combineall, rxjs-mergeall
	desc-01: Let's illustrate this with a simple example:
	goal:
	line-code-added:
*/
const { from, of } = require('rxjs');
const { combineAll, mergeAll, delay } = require('rxjs/operators');

const source00$ = from([
	of([1, 2, 3]),
  of([4, 5, 6]),
  of([7, 8, 9]),
  of(['a', ['b','c', 'd'], 'e']),
]);
const source01$ = from([   
	of(1, 2, 3),   
	of(4, 5, 6),   
	of(7, 8, 9) 
]);
const result00$ = source00$.pipe(
	delay(1000),
	mergeAll()
);
const result01$ = source01$.pipe(
	delay(1000),
	mergeAll()
);
const result02$ = source01$.pipe(
	delay(1000),
	combineAll()
)
result00$.subscribe(console.log);
result01$.subscribe(console.log);
result02$.subscribe(console.log);
