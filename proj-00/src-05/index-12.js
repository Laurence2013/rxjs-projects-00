/*
	desc-00: In RxJs explain in detail mergeScan() operator
	desc-00a: rxjs-mergescan
	desc-01: Give code examples using simulated API requests that randomly have paused times.
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, mergeScan } = require('rxjs/operators');

// desc-01
function mockApiRequests(id){
	const randomDelay = Math.floor(Math.random() * 3000) + 1000;
	return new Promise(res => setTimeout(_ => res({id, value: `Response ${id}`}), randomDelay));
}
const requestId$ = from([1,2,3,4,5,6,7,8,9]);
const responses00$ = requestId$.pipe(
	mergeScan((acc, curr) => {
		return of(curr).pipe(
			map(data00 => [acc + curr])
		)
	}, 0)
);
const responses01$ = requestId$.pipe(
	mergeScan((acc, curr) => {
		acc =+ curr * 2;
		return of(acc);
	}, 0)
);
const responses01a$ = requestId$.pipe(
	mergeScan((acc, curr) => {
		curr % 2 === 0 ? acc['evens'] =+ curr * 2 : acc['odds'] =+ curr * 3
		return of(acc);
	}, [])
);
const responses01aa$ = requestId$.pipe(
	mergeScan((acc, curr) => of(curr % 2 === 0 ? acc['evens'] =+ curr * 2 : acc['odds'] =+ curr * 3), 0)
);
const responses01aaa$ = requestId$.pipe(
	mergeScan((acc, curr) => of([curr % 2 === 0 ? acc['evens'] =+ curr * 2 : acc['odds'] =+ curr * 3]), [])
);
const responses02$ = requestId$.pipe(
	mergeScan((_, id) => {
		return from(mockApiRequests(id)).pipe(
			map(data00 => [data00])
		)
	}, [])
);
const responses02a$ = requestId$.pipe(
	reduce((_, id) => {
		return from(mockApiRequests(id)).pipe(
			map(data00 => [data00])
		)
	}, []),
	combineAll()
);
responses02$.subscribe(console.log);
