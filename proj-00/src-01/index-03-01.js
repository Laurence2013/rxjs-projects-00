/*
	desc-00: Give some RxJs code example where the merge() is from "import { merge } from 'rxjs/operators';". Tag(s) rxjs-merge
	desc-01: Example: Merging Delayed Observables
	goal: 
	line-code-added:
*/

const { of, interval, combineLatest } = require('rxjs');
const { merge, delay } = require('rxjs/operators');

const source00$ = of('A','B','C').pipe(delay(1000));
const source01$ = of('X','Y','Z').pipe(delay(500));

const merged00$ = source00$.pipe(merge(source01$));
const merged01$ = combineLatest(source01$, source00$);


merged01$.subscribe(console.log);
