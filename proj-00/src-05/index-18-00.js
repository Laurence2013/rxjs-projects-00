/*
	desc-00: In RxJs explain in detail windowToggle() operator.
	desc-00a: rxjs-windowToggle
	desc-01: Example:
	desc-02: 2. Dynamic window duration:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject } = require('rxjs');
const { tap, map, mapTo, scan, reduce, filter, delay, takeUntil, window, concatMap,
	windowToggle, mergeAll, toArray, flatMap, mergeMap } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const opening00$ = timer(1000, 3000);
const opening01$ = timer(1000, 9000);
const closing00$ = _ => timer(2000);
const closing01$ = val => timer(val);

const result00$ = source00$.pipe(
	windowToggle(opening01$, closing01$),
	tap(_ => console.log('NEW WINDOW!')),
	mergeAll()
);
//result00$.subscribe(console.log);

// desc-02
const source01$ = interval(1000);
const opening02$ = timer(0, 3000);
const closing02$ = val => {
	console.log('CLOSING WINDOW');
	return timer((val + 1) * 1000);
};
const result01$ = source01$.pipe(
	windowToggle(opening02$, closing02$),
	mergeAll()
);
result01$.subscribe(console.log);
