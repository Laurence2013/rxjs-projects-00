/*
	desc-00: Example 2: merge 2 observables, instance method. Tag(s) rxjs-merge
	goal:
	line-code-added:
*/

const { interval } = require('rxjs');
const { concat, merge, mapTo } = require('rxjs/operators');

const first$ = interval(5000).pipe(mapTo('I am first'));
const second$ = interval(500).pipe(mapTo('I am second'));

const source00$ = first$.pipe(merge(second$));
const source01$ = first$.pipe(concat(second$));

source00$.subscribe(console.log);
