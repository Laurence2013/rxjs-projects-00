/*
	desc-00: In RxJs explain in detail the finalize() operator.
	desc-00a: rxjs-finalize, rxjs-repeat, rxjs-timeInterval, rxjs-timeout
	desc-01: 1. Observable Completion:
	desc-02: 3. Managing Side Effects (e.g., Loading State):
	desc-03: repeat() -> Example:
	desc-04: timeInterval() -> Example 2: Time between emissions from an interval
	desc-05: timeInterval() -> 1.  Monitoring Network Requests
	desc-06: timeout() -> Simulate a request function with a variable delay
	desc-06a: timeout() -> 1. Timeout with a fallback observable:
	desc-06b: timeout() -> Can you give code example with 'each' in timeout() operator?
	desc-06c: timeout() -> 3. Timeout with first emission:
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, delay, take, flatMap, concatMap, switchMap, finalize, mapTo,
	repeat, timeInterval, mergeAll, timeout, catchError } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000).pipe(
	take(10),
	finalize(_ => console.log('Sequence completed or unsubscribed'))
);
/*source00$.subscribe(
	val => console.log(val),
	err => console.log(err),
	_ => console.log('Completed!')
)*/

// desc-02
let loading = false;

function fetchData$(){
	loading = true;
	console.log('Loading data...');

	return of('Data fetched!').pipe(
		delay(2000),
		finalize(_ => {
			loading = false;
			console.log('Loading finished', loading);
		})
	);
};
//fetchData$().subscribe(console.log);

// desc-03
const source01$ = of([1,2,3,4,5,6,7,8,9]).pipe(
	flatMap(dat00 => dat00),
	repeat({count: 3, delay: 2000})
);
/*source01$.subscribe(
	val => console.log(val),
	err => console.log('Error'),
	_ => console.log('Complete')
);*/

// desc-04
const source02$ = interval(1000).pipe(
	take(10),
	timeInterval()
);
//source02$.subscribe(console.log);

// desc-05
const simNetworkReq = _ => of('some url link...').pipe(delay(Math.random() * 30000));
const result01$ = of(1,2,3,4,5).pipe(map(_ => simNetworkReq()));
/*result01$.pipe(
	mergeAll(),
	timeInterval(),
	map(dat00 => `Request completed in ${dat00.interval}ms`)
).subscribe(console.log);*/

// desc-06
const makeReq$ = timeToDelay => of('Request Complete!').pipe(delay(timeToDelay));
const source03$ = of(4000, 3000, 2000, 1000).pipe(
	concatMap(duration => makeReq$(duration).pipe(
		timeout(2500),
		catchError(err => of(`Request timed out after: ${err}`))
	))
);
// desc-06a
const source03a$ = of(4000, 4500, 3000, 2000, 1000).pipe(
	concatMap(duration => makeReq$(duration).pipe(
		timeout({
			each: 2500,
			with: _ => of('Fallback value of: 22')
		}),
	))
);
const source03ab$ = of(4000, 4500, 3000, 2000, 1000).pipe(
	switchMap(duration => makeReq$(duration).pipe(
		timeout({
			each: 2500,
			with: _ => of('Fallback value of: 22')
		}),
	))
);
// desc-06b
const source03b$ = of(4000, 4500, 1000, 3000, 2000, 1000, 1000, 1000, 1000).pipe(
	concatMap(dat00 => of(dat00).pipe(
		delay(dat00),
		mapTo('Emission!'),
		timeout({
			each: 1900,
			with: _ => of('Fallback value of: 22')
		})
	))
);
// desc-06c
const source03c$ = of(4000, 4500, 1000, 3000, 2000, 1000, 1000, 1000, 1000).pipe(
	concatMap(dat00 => of(dat00).pipe(
		delay(dat00),
		mapTo('Emission!'),
		timeout({
			first: 1900
		}),
		catchError(err => of(`Request timed out after: ${err}`))
	))
);
source03b$.subscribe(console.log);
