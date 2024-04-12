/*
desc-00: Combining multiple intervals with different delays, tag rxjs-combineall
desc-01:
goal:
line-code-added:
*/
const { take, map, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const source00$ = interval(1000).pipe(
	map(val => interval(val * 500).pipe(
		map(i => `Source(${val}): ${i}`),
		take(3)
	)),
	take(3)
);

source00$.pipe(combineAll()).subscribe(val => console.log(val));
