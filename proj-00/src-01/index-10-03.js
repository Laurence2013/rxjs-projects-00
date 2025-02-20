/*
	desc-00: Give some RxJs code examples using withLatestFrom(), of() or interval() or from()
	desc-00a: Tag(s) rxjs-withlatestfrom()
	desc-01: 2. withLatestFrom() and interval()
	desc-02: 3. from() and withLatestFrom()
	desc-03: 1. Filtering with filter()
	goal:
	line-code-added:
*/

// desc-01
const { interval, of, from } = require('rxjs');
const { map, withLatestFrom, delay, combineAll } = require('rxjs/operators');

const source00$ = interval(1000);
const source01$ = of('Click 1', 'Click 2', 'Click 3');
const result00$ = source00$.pipe(
	withLatestFrom(source01$)
);
const result01$ = source00$.pipe(
	withLatestFrom(source01$),
	map(elem => of(elem).pipe(delay(1000))),
	combineAll()
);
//result01$.subscribe(console.log);

// desc-02
const source02$ = of([10,20,30,40,50]);
const source03$ = interval(1500);
const result02$ = source03$.pipe(
	withLatestFrom(source02$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
const result02a$ = source02$.pipe(
	withLatestFrom(source03$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
//result02$.subscribe(console.log);

// desc-03
const source04$ = interval(1000);
const source05$ = of([10,20,30,40,50]).pipe(map(nums => nums.map(num => num * 2)));
const source05a$ = of([10,20,30,40,50]).pipe(map(nums => nums.reduce((acc, curr) => acc + curr, 0)));
const source05b$ = of([10,20,30,40,50]).pipe(map(nums => nums.reduce((acc, curr) => {
	if(curr === 10) acc.push(curr)
	return acc;
}, [])));
const source05c$ = of([11,21,30,40,50]).pipe(map(nums => nums.reduce((acc, curr) => {
	if(curr % 2 === 0) acc.push(curr);
	return acc;
}, [])));
const source05ca$ = of([11,21,30,40,50]).pipe(map(nums => nums.reduce((acc, curr) => (curr % 2 === 0) ? acc.push(curr) : acc, [])));
const source05cb$ = of([11,21,30,40,50]).pipe(map(nums => nums.reduce((acc, curr) => (curr % 2 === 0, acc.push(curr)), [])));
const result03$ = source04$.pipe(
	withLatestFrom(source05c$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
result03$.subscribe(console.log);
