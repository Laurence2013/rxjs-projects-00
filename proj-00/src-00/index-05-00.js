/*
	desc-00: Give some RxJs code examples for endWith(), using scenarios and examples. Tag rxjs-endwith
	desc-01: Scenario 2: Countdown Timer. Imagine a countdown timer that displays "Time's up!" at the end.
	goal:
	line-code-added:
*/

const { of, timer, interval } = require('rxjs');
const { concatAll, map, endWith, take } = require('rxjs/operators');

const setup$ = of(1,2,3,4,5,6,7,8,9,10);
const timer$ = (value) => {
	return timer(Math.random() * 2000).pipe(map(() => value - 1))
};

const source00 = setup$.pipe(
	map(value => timer$(value)),
	concatAll(),
	endWith('Time is up!')
);
const source01 = interval(1000).pipe(
	take(5),
	endWith('Time is up!')
);

source01.subscribe(console.log);
