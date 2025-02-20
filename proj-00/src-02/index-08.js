/*
	desc-00: In RxJs give some code examples using generate() and RxJs conditionals in Javascript not Typescript
	desc-00a: destructuring
	desc-01: 4. Destructuring with combineLatest
	desc-02: 1. Basic Array Destructuring
	desc-03: 2. Destructuring with Rest Operator
	goal:
	line-code-added:
*/
const { generate, of, timer, throwError, iif, combineLatest } = require('rxjs');
const { map, filter, delay, mergeMap, catchError, takeWhile, scan } = require('rxjs/operators');

// desc-01
const source00$ = of([1,2]);
const source01$ = of(['x','y','z']);
const result00$ = combineLatest(source00$, source01$).pipe(
	map(([nums, letters]) => {
		const [num1, num2] = nums;
		const [lett1, lett2] = letters;
		return `${num1}${lett1} - ${num2}${lett2}`
	})
);
//result00$.subscribe(console.log);

// desc-02
const source02$ = generate(
	0,
	i => i < 40,
	i => i + 1,
	i => [i, i * 2, i + 200]
);
//source02$.subscribe(([first, sec, third]) => console.log(`${first} - ${sec} - ${third}`))

// desc-03
const source03$ = generate(
  [1, 2, 3],
  arr => arr.length > 0,
  arr => arr.slice(1),
  arr => arr
);
source03$.subscribe(([first, ...rest]) => console.log(`First: ${first}, Rest: ${rest}`));
