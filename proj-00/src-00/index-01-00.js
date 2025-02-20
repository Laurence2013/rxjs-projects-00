/*
desc-00: Mapping to inner interval observable and logging them
desc-01: At example00$ and example01$, the rest are just tests, tag rxjs-combineall
goal:
line-code-added:
*/
const { take, map, tap, combineAll, filter } = require('rxjs/operators');
const { interval, of } = require('rxjs');

const source$ = interval(1000).pipe(take(2));
const source00$ = interval(1000).pipe(take(6));

const example00$ = source$.pipe(
	map(i => `Result: ${i}`),
	take(5)
);
const example00a$ = source$.pipe(
	tap(dat00 => console.log('Result: ', dat00)),
	take(5)
)
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
const example05$ = source00$.pipe(
	filter(data00 => data00 % 2 === 0),
	map(data01 => data01 * 2)
);
const constant$ = of(10);

//example05$.subscribe(console.log);
example05$.pipe(combineAll(constant$)).subscribe(console.log);

//example03$.pipe(combineAll()).subscribe(console.log);

//example02$.pipe(combineAll()).subscribe(console.log);
//example01$.subscribe(console.log);

//example00$.pipe(combineAll()).subscribe(console.log); // this combines with source$ and output the data in an array via map()
//example00$.subscribe(console.log); // this does not combine with source$

//example00a$.pipe(combineAll()).subscribe();
//example00a$.subscribe();

