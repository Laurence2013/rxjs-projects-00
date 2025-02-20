/*
	desc-00: Give some RxJs code examples using combineAll(), interval() and some other operators.
	desc-00a: Tag rxjs-combineall
	desc-01: Example 6: Combining with ConcatMap
	desc-02: Example 4: StartWith to provide initial value
	goal: 
	line-code-added:
*/

// desc-01
const { interval, of } = require('rxjs');
const { combineLatest, combineAll, combineLatestAll, concatMap, take, map, startWith } = require('rxjs/operators');

const source00$ = of('A', 'B');
const combined00$ = source00$.pipe(
	concatMap(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	))
);
const combined01$ = source00$.pipe(
	concatMap(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	)),
	combineLatestAll()
);
const combined02$ = source00$.pipe(
	concatMap(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	)),
	combineAll()
);
const combined03$ = source00$.pipe(
	concatMap(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	)),
);
const combined04$ = source00$.pipe(
	concatMap(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	)),
	combineLatest()
);
const combined05$ = source00$.pipe(
	map(val => interval(1000).pipe(
		map(ind => `${val} - ${ind}`),
		take(3)
	)),
	combineAll()
);
combined05$.subscribe(console.log);
//2: combined03$.pipe(combineAll()).subscribe(console.log);

// desc-02
