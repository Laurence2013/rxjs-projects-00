/*
	desc-00: In RxJs explain in detail mapTo() operator
	desc-00a: rxjs-mapto
	desc-01: 2.  Replacing error messages with a generic notification:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, catchError } = require('rxjs/operators');

const source00$ = of([1,2,3,4,'error',5]);
const result00$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeMap(data01 => Number.isInteger(data01) ? of(data01).pipe(map(data02 => data02 * 2)) : of(data01).pipe(mapTo('An Error has occured!'))),	
	delay(1000)
);
result00$.subscribe(console.log);
