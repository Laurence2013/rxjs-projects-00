/*
	desc-00: In RxJs explain in detail window() operator.
	desc-00a: rxjs-window
	desc-01: Example 1: Open window specified by inner observable
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Subject, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, take, delay, takeUntil, window, mergeAll, toArray, mergeMap, combineAll, scan } = require('rxjs/operators');

// desc-01
const source00$ = timer(0, 1000);
const windowBoundaries$ = source00$.pipe(window(interval(3000)));
const source01$ = windowBoundaries$.pipe(mapTo(10));

const result01$ = source01$.subscribe(val => console.log('Window ' + val));
const result02$ = windowBoundaries$.pipe(mergeAll()).subscribe(val => console.log(val));
