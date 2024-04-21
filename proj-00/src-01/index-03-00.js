/*
	desc-00: Example 2: merge 2 observables, instance method. Tag(s) rxjs-merge
	goal:
	line-code-added:
*/

const { interval } = require('rxjs');
const { merge } = require('rxjs/operators');

const first$ = interval(2500);
const second$ = interval(1000);

const source$ = first$.pipe(merge(second$));

source$.subscribe(console.log);
