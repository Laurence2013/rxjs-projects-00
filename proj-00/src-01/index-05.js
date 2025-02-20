/*
	desc-00: Give some RxJs code examples for pairwise(), using scenarios and examples. Tag(s) rxjs-pairwise
	desc-01: Scenario 2: Combining with startWith()
	desc-02: The startWith() operator is often used in conjunction with pairwise() to ensure an emission happens 
		even if the source Observable begins with a single value.
	goal:
	line-code-added:
*/

const { of, from, concat } = require('rxjs');
const { pairwise, startWith, map } = require('rxjs/operators');

const values$ = from([1, 3, 2, 5, 3, 7, 8 ,4, 2, 8, 4]);
const source00$ = from([1, 3, 2, 5, 3, 7, 8 ,4, 2, 8, 4]);
const source01$ = from([1, 3, 2, 5, 3, 7, 8 ,4, 2, 8, 4]);

const tempReading$ = of(25).pipe(
	startWith(-1),
	pairwise(),
	map(([prev, curr]) => curr - prev)
);

const results$ = values$.pipe(
	pairwise(),
	map(([prev, curr]) => {
		if(curr > prev) return 'Increasing';
		if(curr < prev) return 'Decreasing';
		return 'Stable';
	})
);
const result00$ = concat(source00$, source01$).pipe(
	pairwise(),
	map(([prev, curr]) => prev - curr)
);


//1: tempReading$.subscribe(console.log);
//2: results$.subscribe(console.log);
result00$.subscribe(console.log);
