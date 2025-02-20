/*
desc-00: Filtering even numbers and combining with a constant value at the end, tag rxjs-combineall
goal: 
line-code-added:
*/
const { take, filter, merge, map, concat, switchMap } = require('rxjs/operators');
const { interval, of } = require('rxjs');

const source00$ = interval(1000).pipe(
	filter(val => val % 2 === 0),
	take(5),
	map(val => val * 2)
);
const constant00$ = of(10);
const combined00$ = source00$.pipe(concat(constant00$));

combined00$.subscribe(console.log);

// Combining even numbers with a constant value periodically
const source01$ = interval(1000).pipe(
	filter(val => val % 2 === 0),
	take(2),
	map(val => val * 2)
);
const constant01$ = interval(3000).pipe(map(() => 10));
const combined01$ = source01$.pipe(switchMap(() => constant01$));
const combined02$ = source01$.pipe(switchMap(() => constant01$), take(5));
const combined03$ = source01$.pipe(merge(constant01$));
const combined04$ = source01$.pipe(merge(constant01$), take(2));

//combined02$.subscribe(console.log);
