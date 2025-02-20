/*
	desc-00: Give some RxJs code examples using combineAll(), interval() and some other operators.
	desc-00a: Tag rxjs-combineall
	desc-01: Example 1: Basic Interval Mapping with combineAll()
	desc-02: Example 2: Combining Multiple Intervals with Different Periods
	desc-03: 2. Creating a countdown timer with progressive delays. My own take to it!
	goal: 
	line-code-added:
*/

// desc-01
const { from, interval, of, timer } = require('rxjs');
const { combineAll, map, delay, take, filter } = require('rxjs/operators');

const interval00$ = interval(1000).pipe(take(5));
const source00$ = interval00$.pipe(
	map(m => interval(500).pipe(
		map(n => `"Result (${m}): ${n}"`),
		take(2)
	)),
	combineAll()
);
const source00a$ = interval00$.pipe(
	map(m => interval(1000).pipe(
		map(n => `"Result (${m}): ${n}"`),
		take(5)
	)),
);
//source00a$.subscribe(console.log);

// desc-02
const interval01$ = interval(1000).pipe(take(5));
const interval02$ = interval(2000).pipe(take(3));
const interval03$ = interval(500).pipe(take(7));

const source01$ = from([interval01$, interval02$, interval03$]).pipe(combineAll());
//source01$.subscribe(console.log);

// desc-03
const arr00 = [1,2,3,4,5,6,7,8,9];

const source02$ = from(arr00).pipe(
	filter(num => num % 2 === 0),
	map(num => Array.from({ length: num }).map((u, i) => num))
);
source02$.subscribe(console.log);
