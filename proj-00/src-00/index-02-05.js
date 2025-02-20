/*
	desc-00: https://rxjs.dev/api/index/function/combineLatest
	desc-00a: Tag rxjs-combinelatest
	desc-01: Combine an array of Observables
	goal:
	line-code-added:
*/

const { of, combineLatest, concat, merge, forkJoin } = require('rxjs');
const { startWith, delay, map, concatAll } = require('rxjs/operators');

const arr00 = [1,2,3,4,5];

const source00$ = arr00.map(n => of(n).pipe(
	delay(1000 * n),
	startWith(0)
));
const source01$ = of([1,2,3,4,5]).pipe(
	map(n => delay(1000 * n)),
	startWith(0)
);
const source02$ = arr00.map(n => of(n).pipe(
	delay(1000 * n),
	startWith(0),
	concatAll()
));
const source03$ = arr00.map(n => of(n).pipe(
	map(n => n * 2),
	delay(1000)
));
const source04$ = arr00.map(n => of(n).pipe(
	startWith(0)
));
const source05$ = arr00.map(n => of(n).pipe(
	delay(1000 * n),
));
const result00$ = combineLatest(source00$);
const result01$ = concat(source00$);
const result02$ = combineLatest(source03$);
const result03$ = combineLatest(source04$);
const result04$ = combineLatest(source05$);
const result05$ = concat(source00$);
const result06$ = merge(source00$);
const result07$ = forkJoin(source00$);
const result08$ = combineLatest(source02$);

result08$.subscribe(console.log);

