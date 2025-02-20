/*
	desc-00: In RxJs explain in detail window() operator.
	desc-00a: rxjs-window
	desc-01: Example:
	desc-02: 1. Buffering with a Closing Notification:
	desc-03: 1. Basic windowing with a Subject:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, take, delay, takeUntil, window, mergeAll, toArray, mergeMap, combineAll } = require('rxjs/operators');

// desc-01
const source00$ = timer(0, 1000).pipe(map(_ => 'Hello world 1'));
const source00a$ = interval(1000).pipe(map(_ => 'Hello world 1'));
const windowBoundaries$ = interval(5000).pipe(map(_ => 'Hello world 2'));
const result00$ = source00a$.pipe(
	window(windowBoundaries$),
	map(win => win.pipe(take(5))),
	mergeAll()
);
result00$.subscribe(console.log);

// desc-02
const source01$ = interval(1000);
const closingNotifier00$ = new Subject();

const result01$ = source01$.pipe(
	window(closingNotifier00$),
	takeUntil(closingNotifier00$),
	map(data00 => data00),
	mergeAll()
);
const result01a$ = source01$.pipe(
	window(closingNotifier00$),
	takeUntil(closingNotifier00$),
	mergeMap(data00 => of(data00)),
);
const result01b$ = source01$.pipe(
	takeUntil(closingNotifier00$),
	toArray()
);
//result01b$.subscribe(console.log);

setTimeout(_ => {
	closingNotifier00$.next();
	closingNotifier00$.complete();
}, 5000)

// desc-03
const source02$ = from([1,2,3,4,5])
const notifier00$ = new Subject();
const result02$ = source02$.pipe(
	window(notifier00$),
	mergeAll()
);
//result02$.pipe(toArray()).subscribe(console.log);
//setTimeout(_ => notifier00$.next(), 5000)
