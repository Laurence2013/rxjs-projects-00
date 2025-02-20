/*
	desc-00: What is RxJs withLatestFrom()? 
	desc-00a: Tag(s) rxjs-withlatestfrom()
	goal:
	line-code-added:
*/

const { interval, of } = require('rxjs');
const { map, withLatestFrom } = require('rxjs/operators');

const source00$ = interval(1000);
const source01$ = of('a','b','c','d');
const source02$ = of([1,2,3,4], [5,6,7,8]);
const result00$ = source00$.pipe(
	withLatestFrom(source01$, source02$)
);
const result01$ = source00$.pipe(
	withLatestFrom(source01$, source02$),
	map(([source01, source02, source03]) => ({source01, source02, source03}))
);
result01$.subscribe(console.log);
