/*
	desc-00: In RxJs give some harder code examples for groupby() operator. Tag(s) rxjs-groupBy
	desc-01: DeepSeek -> Example 2: Grouping with a Custom Duration Selector
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip, scan } = require('rxjs');
const { tap, map, reduce, filter, delay, take, takeUntil, flatMap, groupBy, toArray, mergeMap, concatMap } = require('rxjs/operators');

const source00$ = interval(1000).pipe(take(8));
const result00$ = source00$.pipe(
	groupBy(num99 => num99 % 2 === 0 ? 'even' : 'odd'),
	mergeMap(num98 => num98.pipe(
		take(8),
		toArray()
	))
);
result00$.subscribe(console.log);
