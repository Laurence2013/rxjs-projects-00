/*
	desc-00: In RxJs explain the bufferToggle() operator.
	desc-00a: rxjs-bufferToggle
	desc-01: Example
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, bufferToggle, delay, take, mergeAll } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const opening00$ = interval(5000);
const clossing00$ = val => {
	//console.log(`Value ${val} emitted, starting buffer! Closing in 3s!`);
	return interval(3000);
};
const result00$ = source00$.pipe(
	bufferToggle(opening00$, clossing00$),
	take(3)
);
result00$.subscribe(val => console.log(`Emitted Buffer: ${val}`));
