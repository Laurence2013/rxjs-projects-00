/*
	desc-00: Give more code examples to use iif() with combination operators like forkjoin(), map(), zip(). Tag rxjs-iif
	desc-01: 2. iif() with zip()
	desc-02: 3. iif() within a forkJoin() Array
	goal:
	line-code-added:
*/

const { of, from, concat, iif, forkJoin, interval, zip } = require('rxjs');
const { tap, map, concatMap, mergeMap, switchMap, delay, every, combineAll } = require('rxjs/operators');

// desc-01
const source00$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
const result00$ = source00$.pipe(
	mergeMap(val => zip(
		iif(() => val > 6,
			of(`Val greater than 6: ${val}`),
			of(`Val less than or equal to 6: ${val}`)
		)
	).pipe(delay(1000)))
)
result00$.subscribe(console.log);

// desc-02
const result01$ = source00$.pipe(
	mergeMap(val => forkJoin(
		iif(() => val > 6,
			of(`Val greater than 6: ${val}`),
			of(`Val less than or equal to 6: ${val}`)
		)
	).pipe(delay(1000)))
)
//result01$.subscribe(console.log);
