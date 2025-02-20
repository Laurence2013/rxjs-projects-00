/*
	desc-00: In RxJs explain in detail windowCount() operator.
	desc-00a: rxjs-windowCount
	desc-01: Example:
	desc-02: Example 1: Batching API Requests
	desc-03: Example 2:  Handling Rate Limits
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject } = require('rxjs');
const { tap, map, mapTo, scan, reduce, filter, delay, takeUntil, window, concatMap,
	windowCount, mergeAll, toArray, flatMap, mergeMap } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const result00$ = source00$.pipe(
	windowCount(3),
	tap(_ => console.log('NEW WINDOW!')),
	mergeAll()
);
// result00$.subscribe(val => console.log(val));

// desc-02
const fetchUserDetails$ = userIds => {
	console.log(`Fetching details for users: ${userIds.join(', ')}`);
	return of(userIds.map(id => ({id, name: `User ${id}`})));
};
const userIds = [1,2,3,4,5,6,7,8,9];
const source01$ = interval(1000);
const results01$ = from(userIds).pipe(
	windowCount(3),
	tap(_ => console.log('NEW WINDOW!')),
	mergeAll()
);
const results01a$ = from(userIds).pipe(
	windowCount(3),
	tap(_ => console.log('NEW WINDOW!')),
	mergeMap(dat00 => dat00.pipe(toArray())),
	mergeMap(dat01 => fetchUserDetails$(dat01)),
);
const results02$ = source01$.pipe(
	windowCount(3),
	tap(_ => console.log('New Window!')),
	mergeAll()
);
const results02a$ = source01$.pipe(
	windowCount(3),
	tap(_ => console.log('New Window!')),
	mergeMap(dat00 => dat00.pipe(toArray())),
	mergeAll()
);
const results02b$ = source01$.pipe(
	windowCount(3),
	tap(_ => console.log('New Window!')),
	mergeMap(dat00 => dat00.pipe(toArray()))
);
const results02c$ = source01$.pipe(
	windowCount(3),
	tap(_ => console.log('New Window!')),
	concatMap(dat00 => dat00.pipe(toArray()))
);
//results02c$.subscribe(val00 => console.log('Array is: ', val00));

// desc-03
const rateLimitedApiRequest$ = data => {
	console.log(`Sending API request with data: ${data}`);
	return of(`Response for ${data}`).pipe(delay(1000));
}
const source02$ = interval(1000);
const results03$ = source02$.pipe(
	windowCount(3),
	tap(_ => console.log('NEW WINDOW')),
	mergeMap(dat00 => dat00.pipe(toArray())),
	mergeMap(dat01 => rateLimitedApiRequest$(dat01)),
);
const results03a$ = source02$.pipe(
	windowCount(3),
	mergeMap(dat00 => dat00.pipe(mergeMap(rateLimitedApiRequest$)))
);
// results03a$.subscribe(console.log);
