/*
	desc-00: In RxJs explain in great detail exhaustMap() operator
	desc-00a: rxjs-exhaustMap
	desc-01: https://www.learnrxjs.io/learn-rxjs/operators/transformation/exhaustmap
	desc-01a: Example 1: exhaustMap with interval
	desc-02: Example 2: Another exhaustMap with interval
	goal:
	line-code-added:
*/
const { of, from, interval, merge } = require('rxjs');
const { tap, map, filter, delay, take, flatMap, concatMap, exhaustMap } = require('rxjs/operators');

// desc-01a
const source00$ = interval(1000).pipe(map(data00 => `At source00$: ${data00}`));
const source00a$ = source00$.pipe(delay(10), take(4));
const source00b$ = source00$.pipe(delay(10), take(8));
const source01$ = interval(5000).pipe(
	map(data01 => `At source01$: ${data01}`),
	delay(1000), 
	take(4)
);
const result00$ = merge(source00a$, of(true)).pipe(
	concatMap(_ => source00$.pipe(take(5)))
);
const result01$ = merge(source01$, of(true)).pipe(
	exhaustMap(_ => source00$.pipe(take(5)))
);
const result02$ = merge(source01$, of(true)).pipe(
	map(data01 => `At source01$: ${data01}`),
	exhaustMap(_ => source00$.pipe(take(5), delay(2000)))
);
//result01$.subscribe(console.log);

// desc-02
const source02$ = interval(1000).pipe(take(10));
const source03$ = interval(1000).pipe(take(3));
const result03$ = source02$.pipe(
	exhaustMap(data00 => {
		console.log(`Emissions corrected of first interval: ${data00}`);
		return source03$;
	})
);
result03$.subscribe(console.log);
