/*
	desc-00: Example 1: merging multiple observables, static method. Tag(s) rxjs-merge
	goal:
	line-code-added:
*/

const { interval, merge } = require('rxjs');
const { mapTo, startWith } = require('rxjs/operators');

const first = interval(2500);
const second = interval(2000);
const third = interval(1500);

const source00$ = merge(
	first.pipe(mapTo('THIRD')),
	second.pipe(mapTo('SECOND')),
	third.pipe(mapTo('FIRST'))
);

source00$.subscribe(console.log);
