/*
desc-00: Creating a countdown timer with progressive delays, tag rxjs-combineall
goal:
line-code-added:
*/
const { map, take, combineAll } = require('rxjs/operators');
const { interval } = require('rxjs');

const delays = [1000, 500, 250];
const countdown00$ = interval(1000).pipe(
	take(delays.length),
	take(4),
	map((num, index) => interval(delays[index]).pipe(
		take(2),
		map(_ => delays.length - num - 1)
	))
);
const countdown01$ = interval(1000).pipe(
	take(5),
	map((num, index) => interval(delays[index]).pipe(
		take(2),
		map(_ => delays.length - num - 1)
	))
);

countdown01$.pipe(combineAll()).subscribe(console.log);
//countdown$.subscribe(console.log);
