/*
	desc-00: Working with switchMap(). Tag(s) rxjs-switchmap()
	desc-01: Use switchMap() with three different arrays and switching between then once each is finished
	goal:
	line-code-added:
*/

const { from, of, concat } = require('rxjs');
const { concatMap, switchMap, map, toArray, delay } = require('rxjs/operators');

const arr00 = [1, 2, 3, 4];
const arr01 = [10, 20, 30];
const arr02 = [31, 50, 52];

const test00$ = from([arr00, arr01, arr02]).pipe(
	switchMap(arr => from(arr).pipe(
		map(data => data * 2),
		toArray()
	))
);
const test00a$ = from([arr00, arr01, arr02]).pipe(
	switchMap(arr => from(arr).pipe(
		map(data => data * 2)
	))
);
const test00b$ = from([arr00, arr01, arr02]).pipe(
	switchMap(arr => from(arr).pipe(
		map(data => data * 2),
		delay(1000)
	))
);
const test00c$ = from([arr00, arr01, arr02]).pipe(
	concatMap(arr => from(arr).pipe(
		map(data => data * 2),
		delay(1000)
	))
);
const test01$ = of([arr00, arr01, arr02]).pipe(
	switchMap(arr => from(arr).pipe(
		map(data => data * 2),
		toArray()
	))
);
const test02$ = concat(of(arr00), of(arr01), of(arr02)).pipe(
	switchMap(arr => from(arr).pipe(
		map(data => data * 2),
		delay(1000)
	))
);
const test02a$ = concat(of(arr00), of(arr01), of(arr02)).pipe(
	concatMap(arr => from(arr).pipe(
		map(data => data * 2),
		delay(1000)
	))
);

test02a$.subscribe(console.log);
