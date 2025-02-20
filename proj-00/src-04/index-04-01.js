/*
	desc-00: In RxJs what is takeUntil() operator?
	desc-00a: In RxJs what is takeWhile() operator?
	desc-00b: In RxJs what is the throttle() operator?
	desc-00c: rxjs-take, rxjs-takelast, rxjs-takeuntil, rxjs-takeWhile, rxjs-throttle, rxjs-throttleTime
	desc-01: Example
	desc-02: Example 2: Simulating an API call with a timeout
	desc-03: Example 1: Automatically stopping an interval after a timeout
	desc-04: Example 1: Basic usage
	desc-05: Simulating Rate-Limited API Requests 
	desc-06: Delayed Execution
	desc-07: https://www.learnrxjs.io/learn-rxjs/operators/filtering/throttle -> Example 2: Throttle with promise
	desc-08: Throttling API Calls
	goal:
	line-code-added:
*/
const { interval, timer, from, of, combineLatest, combineAll, Subject, BehaviorSubject, asyncScheduler } = require('rxjs');
const { tap, map, find, filter, switchMap, concatMap, delay, take, takeUntil, takeWhile, skipWhile, throttle, throttleTime } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const stop00$ = new Subject();
const result00$ = source00$.pipe(takeUntil(stop00$));

//result00$.subscribe(console.log);
//setTimeout(_ => stop00$.next(), 5000)

// desc-02
const source01$ = new BehaviorSubject(false);
const result01$ = of('API response').pipe(
	delay(5000),
	takeUntil(source01$)
);
/*result01$.subscribe(
	res => console.log('API success: ', res),
	err => console.log('API timeout')
);
setTimeout(_ => source01$.next(true), 3000);*/

// desc-03
const source03$ = new BehaviorSubject(false);

setTimeout(_ => source03$.next(true), 5000);

const result02$ = interval(1000).pipe(
	map(val => `Value is ${val}`),
	takeUntil(source03$.pipe(filter(val => val)))
);
//result02$.subscribe(console.log);

// desc-04
const source04$ = new Subject();

setTimeout(_ => source04$.next(1), 1000);
setTimeout(_ => source04$.next(2), 2000);
setTimeout(_ => source04$.next(3), 3000);
setTimeout(_ => source04$.next(4), 4000);
setTimeout(_ => source04$.next(5), 5000);

const result03$ = source04$.pipe(takeWhile(res => res < 3));
const result03a$ = source04$.pipe(skipWhile(res => res < 3));
const result03b$ = source04$.pipe(takeWhile(res => res < 3, true));

/*result03b$.subscribe(
	res => console.log(`API resonse: ${res}`),
	err => console.log(`API error: ${err}`),
	_ => console.log('API request completed!')
);

setTimeout(_ => result03b$.unsubscribe(), 5000);*/

// desc-05
const source05$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,29);
const result04$ = source05$.pipe(
	throttle(_ => interval(1000)),
	delay(500)
);
//result04$.subscribe(res => console.log(`Processing API request: ${res}`));

// desc-06
const source06$ = of('task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9');
const source06a$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,29);
const result05$ = source06a$.pipe(
	concatMap(val => of(val).pipe(delay(1000))),
	throttle(_ => interval(2000))
);
//result05$.subscribe(console.log);

// desc-07
const source07$ = interval(1000);
const promise = val => new Promise(res => setTimeout(_ => res(`Resolved: ${val}`), val * 100));
const result06$ = source07$.pipe(
	throttle(promise),
	map(val => `Throttled off Promise: ${val}`)
);
//result06$.subscribe(console.log);

// desc-08
const apiCall00 = data => {
	return new Promise(res => {
		setTimeout(_ => {
			console.log(`API call made with data: ${data}`);
			res(`Response for ${data}`);
		}, 1000);
	});
};

const throttleApiCall00 = data => from(apiCall00(data)).pipe(throttle(interval(3000)));
const throttleApiCall01 = data => from(apiCall00(data));
const throttleApiCall02 = data => throttle(apiCall00(data), 3000, asyncScheduler);
const throttleApiCall03 = data => from(apiCall00(data)).pipe(throttleTime(3000));
const throttleApiCall04 = data => from(apiCall00(data)).pipe(throttle(_ => interval(3000)));

throttleApiCall04('request-1').subscribe(res => console.log(res));
throttleApiCall04('request-2').subscribe(res => console.log(res));
throttleApiCall04('request-3').subscribe(res => console.log(res));

setTimeout(_ => {
	throttleApiCall04('request-4').subscribe(res => console.log(res));
	throttleApiCall04('request-5').subscribe(res => console.log(res));
	throttleApiCall04('request-6').subscribe(res => console.log(res));
}, 5000)
