/*
	desc-00: In RxJs explain the bufferToggle() operator.
	desc-00a: rxjs-bufferToggle
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, bufferToggle, delay, take, mergeAll } = require('rxjs/operators');

const source00$ = interval(1000).pipe(
	map(val => 'Evens: ' + val*2)
);
const source01$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
const opening00$ = interval(3000).pipe(
	map(val => 'Odds: ' + val*3)
);
const opening01$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
const opening02$ = of([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
const closing00$ = _ => interval(3000);
const closing01$ = val => {
	console.log(`Closing value ${val} emitted, starting buffer! Closing in 3s!`);
	return interval(3000)
}
const buffered00$ = source00$.pipe(
	bufferToggle(opening00$, closing01$),
);
const buffered00a$ = source01$.pipe(
	bufferToggle(opening00$, closing01$),
	take(3)
);
const buffered00b$ = source00$.pipe(
	bufferToggle(opening01$, closing01$),
	take(3)
);
const buffered00c$ = source00$.pipe(
	bufferToggle(opening02$, closing01$),
	take(3)
);
const buffered01$ = source00$.pipe(
	bufferToggle(opening00$, closing01$),
	mergeMap(data00 => from(data00)),
	take(3)
);
const buffered02$ = source00$.pipe(
	bufferToggle(opening00$, closing01$),
	mergeMap(data00 => data00),
	take(3)
);
buffered00$.subscribe(val => console.log(`Emitted Buffer: ${val}`));
