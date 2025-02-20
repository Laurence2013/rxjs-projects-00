/*
	desc-00: Give some RxJs code examples for pairwise(), using scenarios and examples. Tag(s) rxjs-pairwise
	desc-01: 
	goal:
	line-code-added:
*/

const { of, from, concat, combineLatest, merge, interval } = require('rxjs');
const { delay, pairwise, map, filter, concatMap, concatAll, combineAll, mergeAll, switchMap, mergeMap } = require('rxjs/operators');

const arr00$ = of([1,2,3,4,5,6,7,8,9]);
const arr01$ = of([10,11,12,13,14,15]).pipe(delay(3000));
const arr02$ = from([1,2,3,4,5,6,7,8,9]);
const arr03$ = from([10,11,12,13,14,15]).pipe(delay(3000));

const result00$ = concat(arr00$, arr01$).pipe(
	pairwise(),
	map(([prev, curr]) => curr - prev)
);
const result01$ = arr00$.pipe(
	concatMap(_ => arr01$),
);
const result02$ = combineLatest([arr00$, arr01$], (arr00, arr01) => {
	return {
		arr_00: arr00,
		arr_01: arr01
	}
});
const result03$ = arr00$.pipe(
	mergeAll(),
	concatMap(_ => arr01$)
);
const result04$ = merge(arr00$, arr01$);
const result05$ = merge(arr02$, arr03$);
const result06$ = arr03$.pipe(
	filter(data => data % 2 === 0)
)
const result07$ = arr02$.pipe(
	concatMap(data => of(data).pipe(delay(2000)))
);
const result07a$ = arr02$.pipe(
	concatMap(data => of(data).pipe(
		delay(1000),
	)),
);
const result08$ = arr00$.pipe(
	mergeMap(data => from(data).pipe(delay(2000)))
)

//1: result00$.subscribe(console.log);
//2: result01$.subscribe(console.log);
//3: result02$.subscribe(console.log);
//4: result07a$.subscribe(console.log);
result06$.subscribe(console.log);
