/*
	desc-00: In RxJs how does defaultIfEmpty() works? Tag rxjs-defaultIfEmpty, js-simulations
	goal:
	line-code-added:
*/

const { of, EMPTY } = require('rxjs');
const { tap, map, filter, defaultIfEmpty, delay } = require('rxjs/operators');

const source00$ = EMPTY.pipe(
	defaultIfEmpty('No values were emitted')
);
const source01$ = of(1,2,3,4,5).pipe(
	filter(nums => nums > 3),
	defaultIfEmpty('No values above 6'),
	delay(1000),
)
source01$.subscribe(console.log);
