/*
	desc-00: In RxJs explain in detail windowWhen() operator.
	desc-00a: rxjs-windowWhen
	desc-01: Example:
	desc-02: 2. Buffering Network Requests:
	desc-03: 3. Dynamically Adjusting Polling Intervals:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject, concat } = require('rxjs');
const { tap, map, mapTo, scan, reduce, filter, delay, takeUntil, window, concatMap, bufferCount, switchMap,
	windowWhen, windowCount, mergeAll, toArray, flatMap, mergeMap } = require('rxjs/operators');

// desc-01
const source00$ = from([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
const source00a$ = timer(0, 1000);
const closingNotifier00$ = interval(2000);
const result00$ = source00a$.pipe(
	windowWhen(_ => closingNotifier00$),
	tap(_ => console.log('CLOSING WINDOW')),
	mergeAll()
);
const result01$ = source00a$.pipe( //TypeError: closingSelector is not a function
	windowWhen(2000),
	mergeMap(dat00 => dat00.pipe(toArray())),
	mergeAll()
);
//result01$.subscribe(console.log);

// desc-02
const source01$ = of(
  { url: '/api/data1', data: 'Some data...' },
  { url: '/api/data2', data: 'Some data...' },
  { url: '/api/data3', data: 'Some data...' },
  { url: '/api/data4', data: 'Some data...' },
  { url: '/api/data5', data: 'Some data...' },
  { url: '/api/data6', data: 'Some data...' },
  { url: '/api/data7', data: 'Some data...' },
  { url: '/api/data8', data: 'Some data...' },
  { url: '/api/data9', data: 'Some data...' },
  { url: '/api/data10', data: 'Some data...' }
);
const source01a$ = interval(1000);
const source01b$ = from([1,2,3,4,5,6]);

const flushTrigger$ = interval(2000);
const result02$ = source01a$.pipe(
	windowWhen(_ => flushTrigger$),
	tap(_ => console.log('CLOSING WINDOW')),	
	mergeAll(),
	bufferCount(2),
);
//result02$.subscribe(batch => console.log('Sending batch of requests: ', batch));

// desc-03
const source02$ = interval(1000);
const source02b$ = concat([1000, 3000]);
const source02d$ = of(1000, 5000);
const source02a$ = new Subject();

const result03$ = source02$.pipe(
	windowWhen(_ => interval(5000)),
	tap(_ => console.log('NEW WINDOW')),	
	mergeAll(),
);
const result03a$ = source02d$.pipe(
	mergeMap(dat00 => interval(dat00).pipe(
		windowWhen(_ => interval(10000)),
	)),
	tap(_ => console.log('NEW WINDOW')),	
	mergeAll(),
);
const result03b$ = source02$.pipe(
	windowWhen(_ => source02a$.pipe(
		switchMap(dat00 => interval(dat00))
	)),
	tap(_ => console.log('NEW WINDOW')),	
	mergeAll(),
);
const result03c$ = source02$.pipe(
	windowWhen(_ => interval(5000)),
	switchMap(_ => source02a$.pipe(
		switchMap(dat00 => interval(dat00)),
		tap(_ => console.log('NEW WINDOW'))
	)),
);
const result03d$ = source02b$.pipe(
	switchMap((dat00, idx00) => of(dat00).pipe(
		map(_ => interval(dat00))
	)),
	mergeAll()
);
const result03e$ = source02d$.pipe(
	concatMap((dat00, idx00) => of(dat00).pipe(
		map(_ => interval(dat00))
	)),
	mergeAll()
);
const result03f$ = source02a$.pipe(
	concatMap(dat00 => interval(dat00)),
	tap(_ => console.log('NEW WINDOW'))
)
/*result03f$.subscribe(val00 => console.log('Polling...', val00));
setTimeout(_ => source02a$.next(5000), 0);
setTimeout(_ => source02a$.next(9000), 0);*/

const result04$ = of(5000, 2000).pipe(
	concatMap(dat00 => interval(dat00)),
	tap(_ => console.log('NEW WINDOW')),
);
const result04a$ = interval(1000).pipe(
	map((dat00, idx00) => idx00),
	windowWhen(_ => interval(5000)),
	tap(_ => console.log('NEW WINDOW')),
	mergeAll()
)
const result04b$ = interval(1000).pipe(
	map((dat00, idx00) => idx00),
	windowWhen(_ => interval(5000)),
	tap({
		next: val => console.log('NEW WINDOW'),
		error: err => console.log(err.message),
		complete: _ => console.log('on complete!')
	}),
	mergeAll()
)
result04b$.subscribe(val00 => console.log('Polling...', val00));
