/*
	desc-00: In RxJs explain in detail the finalize() operator.
	desc-00a: rxjs-timeoutWith
	desc-01: Example 1: Timeout after 1 second
	desc-02: Illustrative Example
	desc-03: 1. HTTP Request with Timeout and Retry
	goal:
	line-code-added:
*/
const { of, from, interval, timer, throwError } = require('rxjs');
const { tap, map, filter, delay, take, flatMap, concatMap, switchMap, finalize, mapTo, retryWhen,
	repeat, timeInterval, mergeAll, timeoutWith, catchError } = require('rxjs/operators');

// desc-01
const fakeRequest$ = delayTime => of('!response!').pipe(delay(delayTime));
const reqTimeoutLogger$ = of('logging request timeout');
const timeoutThreshold = 1000;
const result00$ = of(timeoutThreshold + 1, timeoutThreshold - 1, timeoutThreshold + 3).pipe(
	concatMap(dat00 => fakeRequest$(dat00).pipe(timeoutWith(timeoutThreshold, reqTimeoutLogger$)))
);
//result00$.subscribe(console.log);

// desc-02
const source00$ = of(1,2,3,4,5,6,7,8).pipe(timeoutWith(1000, of(9,10,11)));
//source01$.subscribe(console.log);

// desc-03
const makeHttpReq00$ = _ => timer(5000).pipe(
	catchError(err => err.message === 'Timeout' ? throwError(_ => new Error('Request timed out!')) : throwError(_ => err))
);
const makeHttpReq01$ = _ => timer(5000);
const result01$ = makeHttpReq01$().pipe(timeoutWith(4000, throwError(_ => new Error('Timeout'))));
const result01a$ = makeHttpReq01$().pipe(
	timeoutWith(4000, throwError(_ => new Error('Second attempt!'))),
	retryWhen(err => err.pipe(
		tap(val => console.log(`Value ${val} was too high!`)),
		delay(7000)
	))
);
result01a$.subscribe({
	next: res => console.log('Response:', res),
  error: err => console.error('Error:', err.message)
});
