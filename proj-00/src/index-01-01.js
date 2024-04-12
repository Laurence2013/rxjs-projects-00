/*
desc-00: Combining multiple intervals with different delays and logging their latest values
desc-01: At source00$, tag rxjs-combineall
goal:
line-code-added:
*/
const { tap, take, map, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const source00$ = interval(1000).pipe(
	take(2),
	map(val => interval(val * 500).pipe(
		map(i => `Source(${val}): ${i}`),
		take(5)
	))
);
const source01$ = interval(1000).pipe(
	take(2),
	tap(val => interval(val * 500).pipe(
		tap(i => `Source(${val}): ${i}`),
		take(2)
	))
);

source00$.pipe(combineAll()).subscribe(console.log);
