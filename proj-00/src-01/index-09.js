/*
	desc-00: Working with concatMap(). Tag(s) rxjs-concatmap()
	goal:
	line-code-added:
*/

const { concat, of, from } = require('rxjs');
const { concatMap, delay, map } = require('rxjs/operators');

const source00$ = of([1,2,3,4,5]);
const source01$ = of([6,7,8,9,10]);
const source02$ = of([11,12,13,14,15]);
const source03$ = from([
	{1: '21', 2: '22', 3: '23', 4: '24', 5: '25'},
	{1: '26', 2: '27', 3: '28', 4: '29', 5: '30'},
	{1: '31', 2: '32', 3: '33', 4: '34', 5: '35'}
]);

const test00$ = concat(source00$, source01$, source02$).pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const test00a$ = concat(source00$, source01$, source02$);
const test01$ = concat(source00$, source01$, source02$).pipe(
	concatMap(data00 => of(data00).pipe(
		concatMap(data01 => of(data01).pipe(delay(1000)))
	))
);
const test02$ = concat(source00$, source01$, source02$).pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const test02a$ = test02$.pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const test02b$ = concat(test02$).pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const test03$ = concat(source00$, source01$, source02$).pipe(
	concatMap(data00 => from(data00).pipe(
		concatMap(data01 => of(data01).pipe(delay(1000)))
	))
);
const test03a$ = concat(source00$, source01$, source02$).pipe(
	concatMap(data00 => from(data00).pipe(delay(1000)))
);
const test04$ = source03$.pipe(
	concatMap(data00 => of(data00).pipe(delay(1000)))
);
const test04a$ = source03$.pipe(
	concatMap(data00 => of(data00).pipe(
		concatMap(data01 => from(data01).pipe(1000))
	))
); // test04a$ doesn't work, throws a TypeError:
const test04b$ = source03$.pipe(
	concatMap(data00 => of(Object.values(data00)).pipe(
		concatMap(data01 => from(data01).pipe(delay(1000)))
	))
);
const test04c$ = source03$.pipe(
	concatMap(data00 => of(Object.values(data00)).pipe(
		concatMap(data01 => from(data01).pipe(
			concatMap(data02 => of(data02).delay(1000))
		))
	))
); // test04c$ doesn't work, throws a TypeError: 
const test04d$ = source03$.pipe(
	concatMap(data00 => of(Object.values(data00)).pipe(
		concatMap(data01 => from(data01).pipe(
			concatMap(data02 => from(data02).delay(1000))
		))
	))
); // test04d$ doesn't work, throws a TypeError: 

test04b$.subscribe(console.log);
