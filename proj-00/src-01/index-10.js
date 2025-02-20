/*
	desc-00: Working with withLatestFrom(). Tag(s) rxjs-withlatestfrom()
	desc-01: Example 1: Latest value from quicker second source
	desc-02: Example 2: Slower second source
	goal:
	line-code-added:
*/

const { interval, of, concat } = require('rxjs');
const { withLatestFrom, switchMap, concatMap, concatAll, map, filter, delay } = require('rxjs/operators');

const source00$ = interval(1000);
const inner00$ = of('a','b','c');
const inner01$ = of(10,20,30);
const inner02$ = of(['a','b','c','d','e','f','g','h','i']);
const inner03$ = of([10,20,30,40,50,60,70,80,90]);

const result00$ = source00$.pipe(
	withLatestFrom(inner00$, inner01$)
);
const result00a$ = source00$.pipe(
	withLatestFrom(inner02$, inner03$),
	switchMap(([source00, inner02, inner03]) => {
		const val00 = of(inner02).pipe(map(val => {
			return val.map(unit => [source00, unit])
		}));
		return val00;
	})
);
const result00aa$ = source00$.pipe(
	withLatestFrom(inner02$, inner03$),
	switchMap(([source00, inner02, inner03]) => {
		const val00 = of(inner02).pipe(map(val => val.map(unit => [source00, unit])));
		const val01 = of(inner03).pipe(map(val => val.map(unit => unit)));
		return [val00, val01];
	}),
	concatAll() //vs combineAll()
);
const result00b$ = source00$.pipe(
	withLatestFrom(inner00$, inner01$),
	concatMap(([source00, inner00, inner01]) => [source00, inner00, inner01])
);
const result00c$ = source00$.pipe(
	switchMap((val00, indx00) => inner02$.pipe(
		map(val01 => [val00, val01[indx00]])
	)),
	switchMap((val02, index) => inner03$.pipe(
		map(val03 => [val02, val03[index]].flat())
	))
)
result00aa$.subscribe(console.log);

// desc-01:
const source01$ = interval(5000);
const source03$ = interval(1000);

const result01$ = source03$.pipe(
	withLatestFrom(source01$),
	map(([first, second]) => `First Source (5s): ${first} Second Source (1s): ${second}`)
);
//result01$.subscribe(console.log);

// desc-02:
const result02$ = source01$.pipe(
	withLatestFrom(source03$),
	map(([first, second]) => {
		return `Source (1s): ${first} Latest From (5s): ${second}`;
	})
);
//result02$.subscribe(console.log);
