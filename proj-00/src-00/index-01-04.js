/*
desc-00: Creating a countdown timer with progressive delays, tag rxjs-combineall
goal:
line-code-added:
*/
const { map, take, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const delays = [1000, 500, 250];
const countdown$ = interval(1000).pipe(
	take(delays.length),
	map((i, index) => interval(delays[index]).pipe(
		take(2),
		map(_ => delays.length - i - 1)
	))
);

countdown$.pipe(combineAll()).subscribe(console.log);
//countdown$.subscribe(console.log);
