/*
	desc-00: Give some RxJs code examples using withLatestFrom(), of() or interval() or from()
	desc-00a: Tag(s) rxjs-withlatestfrom()
	desc-01: 1. Basic withLatestFrom() with of()
	desc-02: Finish off by outputing in an array
	goal:
	line-code-added:
*/

const { interval, of, /*concat -> results05a$*/ } = require('rxjs');
const { delay, map, withLatestFrom, combineAll, concatAll, merge, mergeAll, concat } = require('rxjs/operators');

const source00$ = of('Good morning ');
const source00a$ = of('Good morning ', 'Good afternoon ');
const source01$ = of('This is not touched!', 'Laurence Mitchell');
const source02$ = of('This is not touched!', 'Mark Johnson');

const results00$ = source00$.pipe(
	withLatestFrom(source01$, source02$),
	map(([source00, source01, source02]) => ({source00, source01, source02}))
);
const results01$ = source00$.pipe(
	withLatestFrom(source01$, source02$),
	map(([source00, source]) => ({source00, source}))
);
const results02$ = source00a$.pipe(
	withLatestFrom(source01$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
const results03$ = source00a$.pipe(
	withLatestFrom(source01$, source02$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
const results03a$ = source00a$.pipe(
	withLatestFrom(source01$, source02$),
	map(([source00, source01, source02]) => `${source00}, ${source01}, ${source02}`)
);
const results04$ = source00a$.pipe(
	withLatestFrom(source01$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
const results04a$ = source00a$.pipe(
	withLatestFrom(source02$),
	map(([source00, source01]) => `${source00}, ${source01}`)
);
//1: results04$.subscribe(console.log);
//2: results04a$.subscribe(console.log);

const results05$ = of(results04$, results04a$).pipe(combineAll());
//const results05a$ = concat([results04$, results04a$]).pipe(concatAll());
const results05b$ = results04$.pipe(merge(results04a$));
const results05c$ = results04$.pipe(mergeAll(results04a$));
const results05d$ = of().pipe(concat(results04$, results04a$));
const results05e$ = of(results04$, results04a$).pipe(map(([res00, res01]) => ({res00, res01})));
const results05f$ = of(results04$, results04a$).pipe(delay(1000), concatAll());
results05f$.subscribe(console.log);
