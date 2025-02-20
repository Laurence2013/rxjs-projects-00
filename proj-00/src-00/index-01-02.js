/*
desc-00: Filtering even numbers from an interval and combining with a constant value, rxjs-combineall
desc-01: This throws a TypeError...
goal:
line-code-added:
*/
const { of, interval } = require('rxjs');
const { filter, flatMap, map, combineAll, take, zip } = require('rxjs/operators');

const source00$ = interval(1000).pipe(
	filter(val => val % 2 === 0),
	take(8),
	map(val => val * 2)
);
const source01$ = interval(500).pipe(
	filter(val => val % 2 === 0),
	take(8),
	map(val00 => of(10).pipe(
		map(val01 => [val00 * 2, val01])
	))
);
const constant$ = of(10);
const combined00$ = source00$.pipe(combineAll(constant$));
const combined01$ = combineAll([source00$, constant$]);
const combined02$ = source00$.pipe(zip(constant$));
const combined03$ = source01$.pipe(combineAll());

combined03$.subscribe(console.log);
