/*
	desc-00: In RxJs explain the conditional operator every(). Tag rxjs-every
	desc-01: Code Example
	goal:
	line-code-added:
*/

const { of, from } = require('rxjs');
const { map, concatMap, delay, every, combineAll } = require('rxjs/operators');

// dec-01
const source00$ = of(1,2,3,4,5);
const source01$ = of(2,4,6,8,10);
const source02$ = of(2,3,6,8,10);
const source03$ = from([[1,2],[2,4],[3,5],[6,7],[6,8]]);
const source04$ = of([[1,2],[2,4],[3,5],[6,7],[6,8]]);
const source04a$ = of([[2,2],[2,4],[6,8],[6,2],[6,8]]);
// const source05$ = of/from({[1,2],[2,4],[3,5],[6,7],[6,8]}); Both of() and from() throws -> SyntaxError: Unexpected token ','

const result00$ = source02$.pipe(every(num => num % 2 === 0));
const result01$ = source03$.pipe(
	concatMap(nums => of(nums).pipe(
		concatMap(num => every(n => n % 2 === 0)),
		delay(1000)
	))
);
const result01a$ = source03$.pipe(
	concatMap(nums => of(nums).pipe(
		map(num => every(n => n % 2 === 0)),
		delay(1000)
	))
);
const result01aa$ = source03$.pipe(
	concatMap(nums => of(nums).pipe(
		map(num => num.filter(n => n % 2 === 0)),
	))
);
const result01b$ = source03$.pipe(
	concatMap(nums => of(nums).pipe(
		map(num => num.map(n => n % 2 === 0)),
		delay(1000)
	))
);
const result02$ = source03$.pipe(concatMap(nums => of(nums).pipe(delay(1000))));
const result03$ = source04a$.pipe(
	map(nums => nums.flat()),
	map(nums => nums.every(n => n % 2 === 0)),
	delay(1000)
);
result01aa$.subscribe(console.log);
