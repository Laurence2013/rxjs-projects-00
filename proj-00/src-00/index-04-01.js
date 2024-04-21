/*
desc-00: https://www.learnrxjs.io/learn-rxjs/operators/combination/concatall, tag rxjs-concatall
desc-01: Example 2: concatAll with promise
desc-02: Using new Promise() as an inner observable
desc-03: source02$ and source03$ outputs the same values from the interval()
goal:
line-code-added:
*/

const { interval } = require('rxjs');
const { concat, map, concatAll, take } = require('rxjs/operators');

const samplePromise$ = val => new Promise(resolve => resolve(`Val: ${val}`));

const source00$ = interval(2000).pipe(
	map(val => samplePromise$(val)),
	concatAll()
);
const source01$ = interval(1000).pipe(
	map(val => interval(1000).pipe(
		map(() => samplePromise$(val)),
		take(3),
		concatAll()
	)),
	concatAll()
);
const source02$ = interval(1000).pipe(
	concat(),
	take(3)
);
const source03$ = interval(1000).pipe(
	concat(samplePromise$),
	take(3)
);
source02$.subscribe(console.log);

