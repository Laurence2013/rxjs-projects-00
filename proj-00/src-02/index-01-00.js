/*
	desc-00: Give more code examples to use iif() with combination operators like forkjoin(), map(), zip(). Tag rxjs-iif
	desc-01: 1. iif() with forkJoin() and map()
	goal:
	line-code-added:
*/

const { of, from, concat, iif, forkJoin } = require('rxjs');
const { tap, map, concatMap, mergeMap, switchMap, delay, every, combineAll } = require('rxjs/operators');

const source00$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
const results00$ = source00$.pipe(
	mergeMap(val => forkJoin([
		of(val).pipe(delay(Math.random() * 2000)),
		of(val).pipe(delay(Math.random() * 4000))
	]).pipe(
		map(([val00, val01]) => ({'Sync value: ': val00, 'Async value: ': val01}))
	))
);
const results00a$ = source00$.pipe(
	concatMap(val => forkJoin([
		of(val).pipe(delay(Math.random() * 2000)),
		of(val).pipe(delay(Math.random() * 4000))
	]).pipe(
		map(([val00, val01]) => ({'Sync value: ': val00, 'Async value: ': val01}))
	))
);
const results01$ = source00$.pipe(
	mergeMap(val => iif(
		() => val > 6,
		of(`Val higher than 6: ${val}`).pipe(delay(Math.random() * 2000)),
		of(`Val less than 6: ${val}`).pipe(delay(Math.random() * 4000))
	))
);
const results01a$ = source00$.pipe(
	concatMap(val => iif(
		() => val > 6,
		of(`Val higher than 6: ${val}`).pipe(delay(Math.random() * 2000)),
		of(`Val less than 6: ${val}`).pipe(delay(Math.random() * 4000))
	))
);
results00a$.subscribe(console.log);
