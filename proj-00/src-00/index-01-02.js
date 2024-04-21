/*
desc-00: Filtering even numbers from an interval and combining with a constant value, rxjs-combineall
desc-01: This throws a TypeError...
goal:
line-code-added:
*/
const { filter, map, combineAll, take, zip } = require('rxjs/operators');
const { of, interval } = require('rxjs');

const source00$ = interval(1000).pipe(
	filter(val => val % 2 === 0),
	take(4),
	map(val => val * 2)
);
const constant$ = of(10);
const combined00$ = source00$.pipe(combineAll(constant$));
const combined01$ = combineAll([source00$, constant$]);
const combined02$ = source00$.pipe(zip(constant$));

combined00$.subscribe(console.log);
