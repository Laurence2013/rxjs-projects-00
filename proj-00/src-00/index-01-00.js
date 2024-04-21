/*
desc-00: Mapping to inner interval observable and logging them
desc-01: At example00$ and example01$, the rest are just tests, tag rxjs-combineall
goal:
line-code-added:
*/
const { take, map, tap, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const source$ = interval(1000).pipe(take(2));

const example00$ = source$.pipe(
	map(i => `Result: ${i}`),
	take(5)
);
const example01$ = source$.pipe(
	map(val => interval(1000).pipe(
		map(i => `Result (${val}: ${i})`),
		take(5)
	))
);
const example02$ = source$.pipe(
	map(val => interval(1000).pipe(
		tap(i => `Result (${val}: ${i})`),
		take(5)
	))
);
const example03$ = source$.pipe(
	map(val => interval(5000).pipe(
		map(i => `Result (${val}: ${i})`),
		take(5)
	))
);
const example04$ = source$.pipe(
	map(val00 => interval(1000).pipe(
		map(val01 => interval(1000).pipe(
			map(i => `Result: ${val00} - ${val01} - ${i}`),
			take(3)
		))
	))
);

example00$.pipe(combineAll()).subscribe(console.log); // this combines with source$ and output the data in an array via map()
// example00$.subscribe(console.log); // this does not combine with source$
