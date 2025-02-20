/*
	desc-00: Removing combineAll() operator, understanding higher-order observables, rxjs-combinelatest, higher-order-observables
	desc-01: In RxJs give code examples for combineLatest()
		desc-01-00: Example 1: Combining two simple observables
		desc-01-01: Example 2: Using a projection function
	goal:
	line-code-added:
*/

const { of, from, Subject, interval, timer, combineLatest, zip } = require('rxjs');
const { map, take, concatAll, mergeMap, flatMap } = require('rxjs/operators');

// desc-01-00
const sources00$ = of(11,22,33,44,55);
const sources00a$ = of([1,2,3,4,5]);
const sources01$ = timer(500, 1000);

const result00$ = combineLatest([sources00a$, sources01$]);
const result01$ = sources00a$.pipe(flatMap(val00 => val00));
const result02$ = zip(sources00$, sources01$)

//result02$.subscribe(console.log);

// desc-01-01
const name$ = of('Alice', 'Bob', 'Charlie');
const age$ = of(25, 30, 40);

const result03$ = combineLatest(name$, age$);
const result03a$ = combineLatest(age$, name$);
const result03b$ = zip(name$, age$);

//result03$.subscribe(console.log);
