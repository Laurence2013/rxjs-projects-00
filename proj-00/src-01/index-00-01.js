/*
	desc-00: Give some RxJs code examples for forkJoin(), using scenarios and examples. Tag(s) rxjs-forkjoin()
	desc-01: From https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin, code example
	desc-02: Example 3: Making a variable number of requests (uses deprecated API)
	goal:
	line-code-added:
*/

const { forkJoin, of, from, interval, concat } = require('rxjs');
const { mergeMap, take, map, concatMap, delay } = require('rxjs/operators');

const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise resolved: ${val}`), 2000));

const source00$ = of([1,2,3,4,5]);
const source01$ = of([6,7,8,9,10]);
const source02$ = of([11,12,13,14,15]);
const source03$ = from([16,17,18,19,20]);
const source04$ = from([
	{1: '21', 2: '22', 3: '23', 4: '24', 5: '25'}
]);
const source04a$ = from([
	{1: '21', 2: '22', 3: '23', 4: '24', 5: '25'},
	{1: '26', 2: '27', 3: '28', 4: '29', 5: '30'},
	{1: '31', 2: '32', 3: '33', 4: '34', 5: '35'}
]);

const result00$ = source00$.pipe(
	mergeMap(data => forkJoin(...data.map(myPromise)))
);
const result01$ = source00$.pipe(
	mergeMap(data => forkJoin(data.map(myPromise)))
);
const result01a$ = source00$.pipe(
	map(data => forkJoin(data.map(myPromise)))
);
const result02$ = concat(source00$, source01$, source02$).pipe(
	mergeMap(data => forkJoin(...data.map(myPromise)))
);
const result02a$ = concat(source00$, source01$, source02$).pipe(
	map(data => forkJoin(...data.map(myPromise)))
);
const result03$ = source00$.pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const result03a$ = source03$.pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const result03b$ = source04$.pipe(
	concatMap(data => of(data).pipe(
		map(val => Object.values(val)),
		delay(1000),
	))
);
const result03c$ = source04a$.pipe(
	concatMap(data => of(data).pipe(
		map(val => Object.values(val)),
		delay(1000),
	))
);

result00$.subscribe(console.log);
