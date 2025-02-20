/*
	desc-00: In RxJs explain in detail window() operator.
	desc-00a: rxjs-window, rxjs-windowTime
	desc-01: Example:
	desc-01a: Example:
	desc-02: 1. Windowing based on a Time Interval
	desc-03: 1. Batching API Requests
	desc-04: 3. Monitoring API Usage
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject } = require('rxjs');
const { tap, map, mapTo, scan, reduce, filter, delay, takeUntil, window, concatMap,
	windowTime, mergeAll, toArray, flatMap, mergeMap } = require('rxjs/operators');

// desc-01
const source00$ = timer(0, 1000);
const source00a$ = interval(1000);

const example00$ = source00a$.pipe(window(interval(3000)));
const count00$ = example00$.pipe(scan((acc, curr) => acc + 1, 0));

//count00$.subscribe(val => console.log(`Window ${val}:`));
//example00$.pipe(mergeAll()).subscribe(val => console.log(val));

// desc-01a
const source01$ = interval(1000);

const result00$ = source01$.pipe(window(interval(3000)));
const result00a$ = result00$.pipe(mapTo(12));
//const result00b$ = result00$.pipe(reduce((acc, curr) => acc + curr, 0)); this cannot happen because it has to wait for the interval to finish
//const result00c$ = result00$.pipe(map(dat00 => dat00 * 2)); this output transforms to an array by default

//result00$.pipe(mergeAll()).subscribe(console.log);
//result00a$.subscribe(val => console.log(`Window ${val}`));

// desc-02
const source02$ = interval(500);
const result01$ = source02$.pipe(
	windowTime(3000),
	tap(_ => console.log('NEW WINDOW!')),
	mergeAll()
);
//result01$.subscribe(console.log);

// desc-03
const apiRequest00$ = timer(1000, 1000).pipe(map(id => ({id, data: `Request data ${id}`})));
const apiRequest01$ = timer(1000, 100).pipe(map(id => ({id, data: `Request data ${id}`})));
const result02$ = apiRequest01$.pipe(
	windowTime(5000),
	mergeMap(window$ => window$.pipe(
		toArray(),
		tap(batch00 => console.log('Sending batch: ', batch00)),
		mergeMap(_ => of('API response for batch').pipe(delay(1000)))
	))
);
//result02$.subscribe(res => console.log(`Response: ${res}`))

// desc-04
const apiCall00$ = timer(1000, 800).pipe(map(_ => 'API call'));
const result03$ = apiCall00$.pipe(
	windowTime(5000),
	mergeMap(window$ => window$.pipe( // You can try concatMap() as its in bound, venn diagram
		scan((count, _) => count + 1, 0),
		tap(count => console.log('API calls in the last 5 seconds: ', count))
	))
);
const result03a$ = apiCall00$.pipe(
	windowTime(9000),
	mergeMap(window$ => window$.pipe( // You can try concatMap() as its in bound, venn diagram
		scan((count, _) => count + 1, 0),
		tap(count => console.log('API calls in the last 9 seconds: ', count))
	))
);
result03$.subscribe();
result03a$.subscribe();
