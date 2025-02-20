/*
	desc-00: In RxJs explain the bufferTime() operator.
	desc-00a: rxjs-bufferTime
	desc-01: Example 1: Buffer for 2 seconds
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, switchMap, bufferTime, throttleTime, delay, take, mergeAll } = require('rxjs/operators');

// desc-00
function simulateAPIRequest(data){
	return of(data).pipe(
		tap(_ => console.log('API request started')),
		delay(Math.random() * 4000 + 1000),
		tap(_ => console.log('API request completed!'))
	);
};
const dataStream$ = interval(900).pipe(
	map(val => ({id: val + 1, value: `Data ${val + 1}`}))
);
const bufferedRequests = dataStream$.pipe(
	bufferTime(2000),
	map(buffer => {
		console.log(`Processing buffer: ${buffer.map(data00 => data00.value)}`);
		return simulateAPIRequest(buffer);
	}),
	mergeAll(),
	take(2)
);
//bufferedRequests.subscribe(res => console.log(`API response: ${res}`));

// desc-01
const source00$ = interval(100);
const result00$ = source00$.pipe(
	bufferTime(1000),
	take(5)
);
result00$.subscribe(console.log);
