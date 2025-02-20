/*
	desc-00: In RxJs explain in great detail groupBy() operator
	desc-00a: rxjs-groupBy
	desc-01: 1. Grouping objects by property:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, groupBy, toArray, mergeMap, concatMap } = require('rxjs/operators');

// desc-01
const source00$ = of([
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Los Angeles' },
  { name: 'Charlie', age: 30, city: 'Chicago' },
  { name: 'David', age: 25, city: 'New York' },
  { name: 'Mark', age: 25, city: 'San Francisco' },
]);
const result00$ = source00$.pipe( // Just look at the way it created an array around it
	flatMap(data00 => data00),
	groupBy(data01 => data01.age),
	mergeMap(data02 => of(data02).pipe(
		toArray()
	))
);
const result00a$ = source00$.pipe(
	flatMap(data00 => data00),
	groupBy(data01 => data01.age),
	mergeMap(data02 => of(data02).pipe(
		mergeMap(data03 => zip(of(data03.key), data03.pipe(toArray())))
	))
);
const result00b$ = source00$.pipe(
	flatMap(data00 => data00),
	groupBy(data01 => data01.age),
	mergeMap(data02 => of(data02).pipe(
		toArray(),
		map(data03 => of({age: data03.key, data03})),
		combineAll()
	)),
);
const result00c$ = source00$.pipe(
	flatMap(data00 => data00),
	groupBy(data01 => data01.age),
	mergeMap(data02 => data02.pipe(
		toArray(),
		map((data03, index) => ({age: data03[index].age, info: data03})),
	)),
);
const result00d$ = source00$.pipe(
	flatMap(data00 => data00),
	groupBy(data01 => data01.age),
	map(data02 => data02.pipe(
		toArray(),
		map((data03, index) => ({age: data03[index].age, info: data03})),
	)),
);
result00a$.subscribe(console.log);
