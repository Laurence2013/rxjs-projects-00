/*
	desc-00: In RxJs explain the bufferTime() operator.
	desc-00a: rxjs-bufferTime
	desc-01: Give code examples with rapid simulated API requests.
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, switchMap, bufferTime, throttleTime, delay, take, mergeAll } = require('rxjs/operators');

const apiReqs00$ = interval(100).pipe(
	take(20),
	map(data00 => `API requests ${data00 + 1}`)
);
const bufferedReqs00$ = apiReqs00$.pipe(bufferTime(1000));
bufferedReqs00$.subscribe(data01 => console.log(`Buffered Requests: ${data01}`));
